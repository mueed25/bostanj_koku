
export class CreateOrderDto {
        userId:  number;
        items: [{ productId: number; quantity: number ; priceAtPurchase:number}];
        status: string;
}