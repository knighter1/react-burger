import { PLACE_ORDER_REQUEST, PLACE_ORDER_ERROR, PLACE_ORDER_SUCCESS, TPlaceOrderActions } from '../actions/order';

export interface IOrderState
{
    orderId: number;

    isError: boolean;
    isRequest: boolean;
}

const initState: IOrderState = {
    orderId: 0,

    isError: false,
    isRequest: false
}

export const orderReducer = (state = initState, action: TPlaceOrderActions) =>
{
    switch (action.type)
    {
        case PLACE_ORDER_REQUEST:
            return { orderId: 0, isError: false, isRequest: true };

        case PLACE_ORDER_SUCCESS:
            return { orderId: action.orderId, isError: false, isRequest: false };

        case PLACE_ORDER_ERROR:
            return { orderId: 0, isError: true, isRequest: false };

        default:
            return state;
    }
}