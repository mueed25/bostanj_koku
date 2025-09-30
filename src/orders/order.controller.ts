import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/createOrderDto";
import { UpdateOrderDto } from "./dto/updateOrderDto";

@Controller('orders')
export class OrderController {
    constructor(
        private orderServices : OrderService
    ) {}

    @Get()
    findAll() {
        return this.orderServices.getAll()
    }

    @Post()
    create(@Body() CreateOrderDto: CreateOrderDto) {
        return this.orderServices.create(CreateOrderDto)
    }

    @Patch(':id')
    async update(@Body() updateOrderDto :UpdateOrderDto , @Param('id') id: number) {
        return await this.orderServices.update(updateOrderDto, id)
    }
}