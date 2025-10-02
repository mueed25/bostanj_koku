import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment, PaymentStatus } from "./entities/payment.entity";
import { Repository } from "typeorm";
import { createPaymentDto } from "./dto/createPaymentDto";
import { OrderService } from "src/orders/order.service";
import axios from "axios";

@Injectable()
export class PaymentService{
    constructor(
        @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
        private orderServices : OrderService
    ) {}

    async getAll () {
        return await this.paymentRepository.find()
    }

    async initializePayment(createPaymentDto : createPaymentDto) {

        const order = await this.orderServices.findOne(createPaymentDto.orderId)
        if(!order) {
            throw new UnauthorizedException('Error no error found ')
        }
        let total = order.items.reduce((accumulator, item) => {
        return accumulator + (item.quantity * item.priceAtPurchase)
        }, 0)
        const payment = this.paymentRepository.create({
            order : order,
            amount: total,
            status: PaymentStatus.PENDING,
            transactionReference: '',
        })
        await this.paymentRepository.save(payment)
        const { reference, authorization_url } = await this.createPaystackPayment(payment)
        payment.transactionReference = reference
        await this.paymentRepository.save(payment)
        return {
            reference,
            authorization_url
        }
    }

    async createPaystackPayment(payment) {
    try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: payment?.order.user.email,   
        amount: payment.amount * 100, 
      },
      {
        headers: {
          Authorization: `Bearer sk_test_54815936f00eeac4e1df623e95a2684839367f22`, // don’t hardcode keys
          'Content-Type': 'application/json',
        },
      }
    );

    // return Paystack’s actual response
    return {
      reference: response.data.data.reference,
      authorization_url: response.data.data.authorization_url,
    };

  } catch (error) {
    // catch API/network errors
    console.error('Paystack error:', error.response?.data || error.message);

    // Option 1: throw a clean error up to your controller
    throw new Error('Payment initialization failed. Please try again.');

    // Option 2: return a safe object instead
    // return { error: true, message: 'Payment initialization failed' };
  }
}

}