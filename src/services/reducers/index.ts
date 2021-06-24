import { combineReducers } from 'redux';
import { apiReducer } from './api';
import { constructorReducer } from './constructor';
import { orderReducer } from './order';
import { ingredientReducer } from './ingredient';

export const rootReducer = combineReducers({
    ingredientsLib: apiReducer,
    constructor: constructorReducer,
    ingredient: ingredientReducer,
    order: orderReducer
});