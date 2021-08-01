import { IngredientData } from "../../types/IIngredientData";

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const REORDER_ITEM = 'REORDER_ITEM';
export const RESET_ORDER = 'RESET_ORDER';

export interface IAddItemAction {
    readonly type: typeof ADD_ITEM;
    readonly item: IngredientData;
}

export interface IRemoveItemAction {
    readonly type: typeof REMOVE_ITEM;
    readonly index: number;
}

export interface IReorderItemAction {
    readonly type: typeof REORDER_ITEM;
    readonly prevIndex: number;
    readonly newIndex: number;
}

export interface IResetOrderAction {
    readonly type: typeof RESET_ORDER;
}

export type TConstructorActions = 
    | IAddItemAction
    | IRemoveItemAction
    | IReorderItemAction
    | IResetOrderAction;

export const constructorAddItem = (item: IngredientData): TConstructorActions => ({ type: ADD_ITEM, item: item });

export const constructorRemoveItem = (index: number): TConstructorActions => ({ type: REMOVE_ITEM, index: index });

export const constructorReorderItem = (prevIndex: number, newIndex: number): TConstructorActions => ({ type: REORDER_ITEM, prevIndex: prevIndex, newIndex: newIndex });

export const resetOrder = (): IResetOrderAction => ({ type: RESET_ORDER });