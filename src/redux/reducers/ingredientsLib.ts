import { GET_INGREDIENTS_LIB_REQUEST, GET_INGREDIENTS_LIB_SUCCESS, GET_INGREDIENTS_LIB_ERROR } from '../actions/ingredientsLib';
import { IngredientData } from '../../components/IngredientMenuItem/IngredientMenuItem';

export interface IApiState
{
    items: IngredientData[];
    itemsById: Map<string, IngredientData>;

    isError: boolean;
    isRequest: Boolean;
}

const initState: IApiState =
{
    items: [],
    itemsById: new Map(),

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

            let itemsById = new Map();

            action.data.forEach((element: IngredientData) => {
                itemsById.set(element._id, element);
            });

            return { items: action.data, itemsById: itemsById, isError: false, isRequest: false };

        default:
            return state;
    }
}