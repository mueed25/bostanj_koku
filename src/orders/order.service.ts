import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import { OrderItem } from "./entities/order-item.entity";
import { CreateOrderDto } from "./dto/createOrderDto";
import { Product } from "src/products/entities/product.entity";
import { UpdateOrderDto } from "./dto/updateOrderDto";

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(Order) private orderRepository : Repository<Order>,
        @InjectRepository(OrderItem) private OrderItemRepository : Repository<OrderItem> 
    ) {}

    async getAll () {
        return this.orderRepository.find({
            relations: ['items', 'user']
        })
    }

    async create( createOrderDto : CreateOrderDto) {
        const order = this.orderRepository.create({
            user: { 
                id: createOrderDto.userId
            },
            status: 'pending',
            items: createOrderDto.items.map(item => ({
                product: {
                    id : item.productId
                },
                quantity: item.quantity,
                priceAtPurchase: item.priceAtPurchase
            }))
        })

        return this.orderRepository.save(order)
    }

    async update( updateOrderDto : UpdateOrderDto, id: number) {
        const order = await this.orderRepository.findOneBy({id})
        if(!order) {
             throw new NotFoundException(`Order with ID ${id} not found`);
        }
        Object.assign(order, updateOrderDto)
        return this.orderRepository.save(order)
    }
      
    async findOne( id : number) {
        const order = await this.orderRepository.findOne({
            where: { id: id},
            relations: ['items', 'user']
        })
        return order
    }

}