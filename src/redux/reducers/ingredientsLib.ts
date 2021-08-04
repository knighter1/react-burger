import { IngredientData } from '../../types/IIngredientData';
import { GET_INGREDIENTS_LIB_REQUEST, GET_INGREDIENTS_LIB_SUCCESS, GET_INGREDIENTS_LIB_ERROR, TGetIngredientsLibActions } from '../actions/ingredientsLib';

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

export const ingredientsLibReducer = (state: IIngredientsLibState = initState, action: TGetIngredientsLibActions): IIngredientsLibState =>
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