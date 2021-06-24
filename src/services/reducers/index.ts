import { combineReducers } from 'redux';
import { apiReducer } from './api';
import { constructorReducer } from './constructor';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
    ingredientsLib: apiReducer,
    constructor: constructorReducer,
    order: orderReducer
});