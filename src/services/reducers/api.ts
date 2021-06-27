import { GET_INGREDIENTS_LIB_REQUEST, GET_INGREDIENTS_LIB_SUCCESS, GET_INGREDIENTS_LIB_ERROR } from '../actions/api';
import { IngredientData } from '../../components/IngredientMenuItem/IngredientMenuItem';

export interface IApiState {
    data: IngredientData[];
    isError: boolean;
    isRequest: Boolean;
}

const initState: IApiState = {
    data: [],
    isError: false,
    isRequest: false
}

export const apiReducer = (state = initState, action: any) =>
{
    switch (action.type)
    {
        case GET_INGREDIENTS_LIB_REQUEST:
            return { data: [], isError: false, isRequest: true };

        case GET_INGREDIENTS_LIB_ERROR:
            return { data: [], isError: true, isRequest: false };

        case GET_INGREDIENTS_LIB_SUCCESS:
            return { data: action.data, isError: false, isRequest: false };

        default:
            return state;
    }
}