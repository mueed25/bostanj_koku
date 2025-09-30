import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique : true})
    email: string;

    @Column()
    password: string

    @Column({ default: true})
    isActive: boolean

    @OneToMany(() => Order , (order) => order.user)
    orders: Order[];
}