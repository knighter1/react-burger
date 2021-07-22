import { IngredientData } from '../../components/IngredientMenuItem/IngredientMenuItem';
import { SET_ORDER_DETAIL } from '../actions/order';

export interface IOrderDetailsState {
    orderId: string;
    ingredients: IngredientData[];
    name: string;
    date: Date | null;
    status: 'in_progress' | 'completed' | null;
}

const initState: IOrderDetailsState = {
    orderId: "",
    ingredients: [],
    name: "",
    date: null,
    status: null
}

export const orderDetailsReducer = (state = initState, action: any) =>
{
    switch (action.type)
    {
        case SET_ORDER_DETAIL:
            return { ...action.orderData };

        default:
            return state;
    }
}