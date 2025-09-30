import { Module } from "@nestjs/common";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { OrderModule } from "src/orders/order.module";

@Module({
    imports: [TypeOrmModule.forFeature([Payment]), OrderModule],
    controllers: [PaymentController],
    providers: [PaymentService],
    exports:[]
})
export class PaymentModule {}