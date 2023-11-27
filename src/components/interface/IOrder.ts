import OrderItem from "./IOrderItem";

export default interface Order {
    id?: number;
    orderItemDto: OrderItem[];
    total: number;
    status: number;
    paymentType?: number;
    numeroCartao?: number;
    nomeCartao?: string;
    restaurantId: number;
    userId: number;
    dateTime?: Date;
}