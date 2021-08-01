import { ingredientsLibReducer } from './ingredientsLib';
import { getIngredientsLibRequest, getIngredientsLibSuccess, getIngredientsLibError } from '../actions/ingredientsLib';
import { ingredient1, ingredient2 } from './testsData';
import { IngredientData } from '../../types/IIngredientData';

describe('ingredients lib reducer', () =>
{
    it('should handle GET_INGREDIENTS_LIB_REQUEST', () =>
    {
        expect(
            ingredientsLibReducer(undefined,
            getIngredientsLibRequest()
        )
        ).toEqual({
            items: [], itemsById: null, isError: false, isRequest: true
        });
    });

    it('should handle GET_INGREDIENTS_LIB_SUCCESS', () =>
    {
        const expectedItemsById = new Map<string, IngredientData>();
        expectedItemsById.set('1', ingredient1);
        expectedItemsById.set('2', ingredient2);
        
        expect(
            ingredientsLibReducer(undefined,
                getIngredientsLibSuccess([ingredient1, ingredient2]))
        ).toEqual({
            items: [ingredient1, ingredient2], itemsById: expectedItemsById, isError: false, isRequest: false
        });
    });

    it('should handle GET_INGREDIENTS_LIB_ERROR', () =>
    {
        expect(
            ingredientsLibReducer(undefined,
            getIngredientsLibError()
        )
        ).toEqual({
            items: [], itemsById: null, isError: true, isRequest: false
        });
    });
}) 