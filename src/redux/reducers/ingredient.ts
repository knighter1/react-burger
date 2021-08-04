import { IngredientData } from '../../types/IIngredientData';
import { ISetIngredientAction, SET_INGREDIENT } from '../actions/ingredient';

type IngredientDataState = IngredientData | null;

export const ingredientReducer = (state: IngredientDataState = null, action: ISetIngredientAction): IngredientDataState =>
{
    switch (action.type)
    {
        case SET_INGREDIENT:
            return action.ingredientData;

        default:
            return state;
    }
}