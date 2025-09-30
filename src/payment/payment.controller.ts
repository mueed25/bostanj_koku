import { Body, Controller, Get, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { createPaymentDto } from "./dto/createPaymentDto";
import { create } from "domain";

@Controller('payment')
export class PaymentController{
    constructor(
        private paymentService: PaymentService
    ) {}

    @Get()
    async getAll() {
        return await this.paymentService.getAll()
    }

    @Post()
    async initializePayment(@Body() createPaymentDto : createPaymentDto) {
        return await this.paymentService.initializePayment(createPaymentDto)
    }
}