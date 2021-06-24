import { GET_ITEMS, ADD_ITEM, REMOVE_ITEM, REORDER_ITEM } from '../actions/constructor';
import { IngredientData } from '../../components/IngredientMenuItem/IngredientMenuItem';

export interface IConstructorState {
    items: IngredientData[];
}

const constructorInitState: IConstructorState = {
    items: []
};

export const constructorReducer = (state: IConstructorState = constructorInitState, action: any) =>
{
    switch (action.type)
    {
        case GET_ITEMS:
            return state;

        case ADD_ITEM:
        {
            let items = state.items ? [...state.items] : [];

            const item: IngredientData = action.item;
            if (item.type === 'bun')
                items = items.filter(item => item.type !== 'bun');

            return {...state, items: [...items, action.item] };
        }

        case REMOVE_ITEM:
        {
            const items = state.items.filter(item => item !== action.item);
            return {...state, items: items };
        }

        case REORDER_ITEM:
            return state;

        default:
            return state;
    }
}