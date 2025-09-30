import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller('products')
export class ProductController {
    constructor(
        private productService: ProductService
    ){}

    @Get()
    async getProducts() {
        return await this.productService.findAll()
    }

    @Post()
    async create(@Body() productDto : ProductDto) {
        return await this.productService.create(productDto)
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.productService.findOne(id)
    }

    @Patch(':id') 
    async updateOne(@Param('id') id: number, @Body() updateProduct: UpdateProductDto) {
        return await this.productService.update(id, updateProduct)
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.productService.delete(id)
    }
}