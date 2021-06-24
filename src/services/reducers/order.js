import { SET_ORDER_ID } from '../actions/order';

export const orderReducer = (state = [], action) =>
{
    switch (action.type)
    {
        case SET_ORDER_ID:
            return action.orderId;

        default:
            return state;
    }
}