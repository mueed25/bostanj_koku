import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum PaymentStatus {
    PENDING = 'pending',
    SUCCESS = 'success',
    FAILED = 'failed'
}

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    amount: number;

    @Column({
        type: "enum",
        enum : PaymentStatus,
        default: PaymentStatus.PENDING
    })
    status: PaymentStatus;

    @Column()
    transactionRerence: string;

    @OneToOne(() => Order, (order) => order.payment )
    Order: Order
}