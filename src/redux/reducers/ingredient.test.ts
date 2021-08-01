import { ingredientReducer } from './ingredient';
import { setIngredient } from '../actions/ingredient';
import { ingredient1, ingredient2 } from './testsData';

describe('ingredient reducer', () =>
{
    it('should handle SET_INGREDIENT', () =>
    {
        expect(
            ingredientReducer(null, setIngredient(ingredient1))
        ).toEqual(ingredient1);

        expect(
            ingredientReducer(ingredient1, setIngredient(ingredient2))
        ).toEqual(ingredient2);
    });
}) 