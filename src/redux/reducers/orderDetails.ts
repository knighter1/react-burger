import { IngredientData } from '../../components/IngredientMenuItem/IngredientMenuItem';
import { SET_ORDER_DETAIL } from '../actions/orderDetails';

export interface IOrderDetailsState {
    number: number;
    ingredients: IngredientData[];
    name: string;
    date: Date | null;
    status: 'in_progress' | 'completed' | null;
}

const initState: IOrderDetailsState = {
    number: 0,
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