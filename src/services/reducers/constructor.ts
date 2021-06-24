import { ADD_ITEM, REMOVE_ITEM, REORDER_ITEM } from '../actions/constructor';
import { IngredientData } from '../../components/IngredientMenuItem/IngredientMenuItem';

export interface IConstructorState {
    items: IngredientData[];
    bun: IngredientData | null;
}

const constructorInitState: IConstructorState = {
    items: [],
    bun: null
};

export const constructorReducer = (state: IConstructorState = constructorInitState, action: any) =>
{
    switch (action.type)
    {
        case ADD_ITEM:
        {
            const items = state.items ? [...state.items] : [];
            const item: IngredientData = action.item;

            if (item.type === 'bun')
                return {items: [...items], bun: item };
            
            return {...state, items: [...items, action.item] };
        }

        case REMOVE_ITEM:
        {
            const items = [...state.items];
            items.splice(action.index, 1);
            return {...state, items: items };
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