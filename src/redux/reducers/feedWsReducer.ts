import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE } from '../actions/wsActions';

export interface IOrderData
{
    _id: string;
    name: string;
    status: "done" | "pending" | "created";
    number: number;
    createdAt: Date;
    updatedAt: Date;
    ingredients: string[];
}

export interface IFeedData
{
    success: boolean;
    orders: IOrderData[];
    total: number;
    totalToday: number;
}

export interface IFeedWebSocketState
{
    wsConnected: boolean;
    error: string | null;
    feed: IFeedData | null;
}

const initialState: IFeedWebSocketState =
{
    wsConnected: false,
    error: null,
    feed: null
};

export const feedWsReducer = (state: IFeedWebSocketState = initialState, action: any): IFeedWebSocketState =>
{
    switch (action.type)
    {
        case WS_CONNECTION_SUCCESS:
            return { ...state, error: null, wsConnected: true };

        case WS_CONNECTION_ERROR:
            return { ...state, error: action.payload, wsConnected: false };

        case WS_CONNECTION_CLOSED:
            return { ...state, error: null, wsConnected: false };

        case WS_GET_MESSAGE:
            return { ...state, error: null, feed: JSON.parse(action.payload) };

        default:
            return state;
    }
}; 