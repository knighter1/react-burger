import { constructorReducer } from './constructor';
import { constructorAddItem, constructorRemoveItem, constructorReorderItem, RESET_ORDER } from '../actions/constructor';
import { ingredient1, ingredient2, ingredient3, ingredient4 } from './testsData';

describe('constructor reducer', () =>
{
    it('should handle ADD_ITEM', () =>
    {
        expect(
            constructorReducer(
                { items: [], bun: null, cost: 0 },
                constructorAddItem(ingredient1))
        ).toEqual({ items: [], bun: ingredient1, cost: 200 });

        expect(
            constructorReducer(
                { items: [], bun: null, cost: 0 },
                constructorAddItem(ingredient2))
        ).toEqual({ items: [ingredient2], bun: null, cost: 225 });

        expect(
            constructorReducer(
                { items: [ingredient2], bun: null, cost: 225 },
                constructorAddItem(ingredient2))
        ).toEqual({ items: [ingredient2, ingredient2], bun: null, cost: 450 });

        expect(
            constructorReducer(
                { items: [ingredient2], bun: null, cost: 225 },
                constructorAddItem(ingredient1))
        ).toEqual({ items: [ingredient2], bun: ingredient1, cost: 425 });

        expect(
            constructorReducer(
                { items: [ingredient2], bun: ingredient1, cost: 425 },
                constructorAddItem(ingredient3))
        ).toEqual({ items: [ingredient2], bun: ingredient3, cost: 491 });
    });

    it('should handle REMOVE_ITEM', () =>
    {
        expect(
            constructorReducer(
                { items: [], bun: null, cost: 0 },
                constructorRemoveItem(0))
        ).toEqual({ items: [], bun: null, cost: 0 });

        expect(
            constructorReducer(
                { items: [ingredient2], bun: null, cost: 225 },
                constructorRemoveItem(0))
        ).toEqual({ items: [], bun: null, cost: 0 });

        expect(
            constructorReducer(
                { items: [ingredient2, ingredient4, ingredient2], bun: ingredient1, cost: 225 },
                constructorRemoveItem(2))
        ).toEqual({ items: [ingredient2, ingredient4], bun: ingredient1, cost: 856 });
    });

    it('should handle RESET_ORDER', () =>
    {
        expect(
            constructorReducer({ items: [ingredient2, ingredient4], bun: ingredient1, cost: 856 },
            {
                type: RESET_ORDER
            })
        ).toEqual({ items: [], bun: null, cost: 0 });
    });

    it('should handle REORDER_ITEM', () =>
    {
        expect(
            constructorReducer(
                { items: [ingredient2, ingredient4, ingredient2, ingredient2], bun: ingredient1, cost: 1306 },
                constructorReorderItem(1, 3))
        ).toEqual({ items: [ingredient2, ingredient2, ingredient2, ingredient4], bun: ingredient1, cost: 1306 });

        expect(
            constructorReducer(
                { items: [ingredient2, ingredient4], bun: ingredient1, cost: 1306 },
                constructorReorderItem(1, 0))
        ).toEqual({ items: [ingredient4, ingredient2], bun: ingredient1, cost: 1306 });
    });
}) 