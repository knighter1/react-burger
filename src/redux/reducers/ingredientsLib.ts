import { GET_INGREDIENTS_LIB_REQUEST, GET_INGREDIENTS_LIB_SUCCESS, GET_INGREDIENTS_LIB_ERROR } from '../actions/ingredientsLib';
import { IngredientData } from '../../components/IngredientMenuItem/IngredientMenuItem';

export interface IIngredientsLibState
{
    items: IngredientData[];
    itemsById: Map<string, IngredientData> | null;

    isError: boolean;
    isRequest: Boolean;
}

const initState: IIngredientsLibState =
{
    items: [],
    itemsById: new Map(),

    isError: false,
    isRequest: false
}

export const apiReducer = (state: IIngredientsLibState = initState, action: any): IIngredientsLibState =>
{
    switch (action.type)
    {
        case GET_INGREDIENTS_LIB_REQUEST:
            return { items: [], itemsById: null, isError: false, isRequest: true };

        case GET_INGREDIENTS_LIB_ERROR:
            return { items: [], itemsById: null, isError: true, isRequest: false };

        case GET_INGREDIENTS_LIB_SUCCESS:

            let itemsById = new Map();

            action.data.forEach((element: IngredientData) => {
                itemsById.set(element._id, element);
            });

            return { items: action.data, itemsById: itemsById, isError: false, isRequest: false };

        default:
            return state;
    }
}