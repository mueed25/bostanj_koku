import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment, PaymentStatus } from "./entities/payment.entity";
import { Repository } from "typeorm";
import { createPaymentDto } from "./dto/createPaymentDto";
import { OrderService } from "src/orders/order.service";

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
            Order : {
                id: createPaymentDto.orderId
            },
            amount: total,
            status: PaymentStatus.PENDING,
            transactionRerence: '',
        })
        await this.paymentRepository.save(payment)
        const { refrence, authorization_url } = await this.createPaystackPayment(payment: Payment)

        return total
    }

    async createPaystackPayment(payment) {
        
    }
}