import { ingredientReducer } from './ingredient';
import { SET_INGREDIENT } from '../actions/ingredient';
import { ingredient1, ingredient2 } from './testsData';

describe('ingredient reducer', () =>
{
    it('should return the initial state', () =>
    {
        expect(ingredientReducer(undefined, {})).toEqual(null);
    });

    it('should handle SET_INGREDIENT', () =>
    {
        expect(
            ingredientReducer(null,
            {
                type: SET_INGREDIENT,
                ingredientData: ingredient1
            })
        ).toEqual(ingredient1);

        expect(
            ingredientReducer(ingredient1,
            {
                type: SET_INGREDIENT,
                ingredientData: ingredient2
            })
        ).toEqual(ingredient2);
    });
}) 