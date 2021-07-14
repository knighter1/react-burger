import { SET_INGREDIENT } from '../actions/ingredient';

export const ingredientReducer = (state = [], action) =>
{
    switch (action.type)
    {
        case SET_INGREDIENT:
            if (!action.ingredientData)
                window.history.replaceState(null, null, `/`)
            return action.ingredientData;

        default:
            return state;
    }
}