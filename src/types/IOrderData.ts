export type OrderStatus = 'done' | 'pending' | 'created' | 'canceled';

export interface IOrderData
{
    _id: string;
    name: string;
    status: OrderStatus;
    number: number;
    createdAt: Date;
    updatedAt: Date;
    ingredients: string[];
}

export interface IOrdersFeed
{
    success: boolean;
    orders: IOrderData[];
    total: number;
    totalToday: number;
}

export interface IOrderFeedWebSocketState
{
    wsConnected: boolean;
    error: string | null;
    feed: IOrdersFeed | null;
}