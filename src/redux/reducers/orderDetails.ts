import { IngredientData } from '../../types/IIngredientData';
import { OrderStatus } from '../../types/IOrderData';
import { GET_ORDER_BY_ID_ERROR, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, SET_ORDER_DETAIL, TOrderDetailsActions } from '../actions/orderDetails';

export interface IOrderDetailsData {
    number: number;
    ingredients: IngredientData[];
    name: string;
    date: Date;
    status: OrderStatus;
}

export interface IOrderDetailsState
{
    success: boolean;
    orderData: IOrderDetailsData | null;

    isRequest: boolean;
    isError: boolean;
}

const initState: IOrderDetailsState =
{
    success: false,
    orderData: null,
    isRequest: false,
    isError: false
}

export const orderDetailsReducer = (state = initState, action: TOrderDetailsActions): IOrderDetailsState =>
{
    switch (action.type)
    {
        case GET_ORDER_BY_ID_REQUEST:
            return { ...initState, isRequest: true };

        case GET_ORDER_BY_ID_SUCCESS:
        case SET_ORDER_DETAIL:
            return { ...initState, success: true, orderData: action.orderData };

        case GET_ORDER_BY_ID_ERROR:
            return { ...initState, isRequest: false, isError: true };
            
        default:
            return state;
    }
}