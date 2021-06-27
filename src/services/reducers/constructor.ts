import { ADD_ITEM, REMOVE_ITEM, REORDER_ITEM } from '../actions/constructor';
import { IngredientData } from '../../components/IngredientMenuItem/IngredientMenuItem';

export interface IConstructorState {
    items: IngredientData[];
    bun: IngredientData | null;
    cost: number;
}

const constructorInitState: IConstructorState = {
    items: [],
    bun: null,
    cost: 0
};

const orderCostReducer = (items: IngredientData[], bun: IngredientData | null): number =>
{
    let costValue: number = items.reduce((acc: number, item: IngredientData) => {
        return acc + item.price;
    }, 0);

    if (bun)
        costValue += 2 * bun.price;

    return costValue;
}

export const constructorReducer = (state: IConstructorState = constructorInitState, action: any) =>
{
    switch (action.type)
    {
        case ADD_ITEM:
        {
            const items = state.items ? [...state.items] : [];
            const item: IngredientData = action.item;

            if (item.type === 'bun')
                return {items: [...items], bun: item, cost: orderCostReducer(items, item) };
            
            return {...state, items: [...items, action.item], cost: orderCostReducer([...items, action.item], state.bun) };
        }

        case REMOVE_ITEM:
        {
            const items = [...state.items];
            items.splice(action.index, 1);
            return {...state, items: items, cost: orderCostReducer(items, state.bun) };
        }

        case REORDER_ITEM:
        {
            const items = [...state.items];
            const data = action.item;
            
            items.splice(action.prevIndex, 1);
            items.splice(action.newIndex, 0, data);

            return {...state, items: items };
        }

        default:
            return state;
    }
}