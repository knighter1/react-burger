import { IngredientData } from "../../types/IIngredientData";

export const SET_INGREDIENT = 'SET_INGREDIENT';

export interface ISetIngredientAction {
    readonly type: typeof SET_INGREDIENT;
    readonly ingredientData: IngredientData | null;
}

export const setIngredient = (item: IngredientData | null): ISetIngredientAction => ({ type: SET_INGREDIENT, ingredientData: item });