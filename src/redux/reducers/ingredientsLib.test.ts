import { ingredientsLibReducer } from './ingredientsLib';
import { GET_INGREDIENTS_LIB_REQUEST, GET_INGREDIENTS_LIB_SUCCESS, GET_INGREDIENTS_LIB_ERROR } from '../actions/ingredientsLib';
import { ingredient1, ingredient2 } from './testsData';
import { IngredientData } from '../../types/IIngredientData';

describe('ingredients lib reducer', () =>
{
    it('should return the initial state', () =>
    {
        expect(ingredientsLibReducer(undefined, {})).toEqual({
            items: [],
            itemsById: new Map(),

            isError: false,
            isRequest: false
        });
    });

    it('should handle GET_INGREDIENTS_LIB_REQUEST', () =>
    {
        expect(
            ingredientsLibReducer(undefined,
            { type: GET_INGREDIENTS_LIB_REQUEST }
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
            {
                type: GET_INGREDIENTS_LIB_SUCCESS,
                data: [ingredient1, ingredient2]
            })
        ).toEqual({
            items: [ingredient1, ingredient2], itemsById: expectedItemsById, isError: false, isRequest: false
        });
    });

    it('should handle GET_INGREDIENTS_LIB_ERROR', () =>
    {
        expect(
            ingredientsLibReducer(undefined,
            { type: GET_INGREDIENTS_LIB_ERROR }
        )
        ).toEqual({
            items: [], itemsById: null, isError: true, isRequest: false
        });
    });
}) 