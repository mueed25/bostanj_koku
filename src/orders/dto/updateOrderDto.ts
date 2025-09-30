
export class UpdateOrderDto {
        userId?:  number;
        items?: [{ productId: number; quantity: number ; priceAtPurchase:number}];
        status?: string;
}