import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { ProductDto } from "./dto/create-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateProductDto } from "./dto/update-product.dto";


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}

    async findAll() {
        const products =  await this.productRepository.find();
        return {
            products: products,
            total: products.length

        }
    }

    async findOne(id: number): Promise<Product | null> {
        const product = this.productRepository.findOneBy({id});
        if (!product ) throw new Error('Product not found');
        return product;
    }

    async create(productDto: ProductDto ) {
        const product = await this.productRepository.create(productDto)
        return this.productRepository.save(product)
    }

    async update(id: number , updateProduct: UpdateProductDto) {
        const product = await this.productRepository.findOneBy({id})
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        Object.assign(product, updateProduct)
        return await this.productRepository.save(product)
    }

    async delete(id: number) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new Error('Product not found');
        }
        return await this.productRepository.remove(product)
    }
}