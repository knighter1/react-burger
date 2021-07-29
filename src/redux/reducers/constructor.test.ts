import { constructorReducer } from './constructor';
import { ADD_ITEM, REMOVE_ITEM, REORDER_ITEM, RESET_ORDER } from '../actions/constructor';
import { ingredient1, ingredient2, ingredient3, ingredient4 } from './testsData';

describe('constructor reducer', () =>
{
    it('should return the initial state', () =>
    {
        expect(constructorReducer(undefined, {})).toEqual({ items: [], bun: null, cost: 0 });
    });

    it('should handle ADD_ITEM', () =>
    {
        expect(
            constructorReducer({ items: [], bun: null, cost: 0 },
            {
                type: ADD_ITEM,
                item: ingredient1
            })
        ).toEqual({ items: [], bun: ingredient1, cost: 200 });

        expect(
            constructorReducer({ items: [], bun: null, cost: 0 },
            {
                type: ADD_ITEM,
                item: ingredient2
            })
        ).toEqual({ items: [ingredient2], bun: null, cost: 225 });

        expect(
            constructorReducer({ items: [ingredient2], bun: null, cost: 225 },
            {
                type: ADD_ITEM,
                item: ingredient2
            })
        ).toEqual({ items: [ingredient2, ingredient2], bun: null, cost: 450 });

        expect(
            constructorReducer({ items: [ingredient2], bun: null, cost: 225 },
            {
                type: ADD_ITEM,
                item: ingredient1
            })
        ).toEqual({ items: [ingredient2], bun: ingredient1, cost: 425 });

        expect(
            constructorReducer({ items: [ingredient2], bun: ingredient1, cost: 425 },
            {
                type: ADD_ITEM,
                item: ingredient3
            })
        ).toEqual({ items: [ingredient2], bun: ingredient3, cost: 491 });
    });

    it('should handle REMOVE_ITEM', () =>
    {
        expect(
            constructorReducer({ items: [], bun: null, cost: 0 },
            {
                type: REMOVE_ITEM,
                index: 0
            })
        ).toEqual({ items: [], bun: null, cost: 0 });

        expect(
            constructorReducer({ items: [ingredient2], bun: null, cost: 225 },
            {
                type: REMOVE_ITEM,
                index: 0
            })
        ).toEqual({ items: [], bun: null, cost: 0 });

        expect(
            constructorReducer({ items: [ingredient2, ingredient4, ingredient2], bun: ingredient1, cost: 225 },
            {
                type: REMOVE_ITEM,
                index: 2
            })
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
            constructorReducer({ items: [ingredient2, ingredient4, ingredient2, ingredient2], bun: ingredient1, cost: 1306 },
            {
                type: REORDER_ITEM,
                prevIndex: 1,
                newIndex: 3
            })
        ).toEqual({ items: [ingredient2, ingredient2, ingredient2, ingredient4], bun: ingredient1, cost: 1306 });
    });

    it('should handle REORDER_ITEM', () =>
    {
        expect(
            constructorReducer({ items: [ingredient2, ingredient4], bun: ingredient1, cost: 1306 },
            {
                type: REORDER_ITEM,
                prevIndex: 1,
                newIndex: 0
            })
        ).toEqual({ items: [ingredient4, ingredient2], bun: ingredient1, cost: 1306 });
    });
}) 