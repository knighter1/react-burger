import { combineReducers } from 'redux';
import { apiReducer } from './api';
import { constructorReducer } from './constructor';

export const rootReducer = combineReducers({
    ingredientsLib: apiReducer,
    constructor: constructorReducer
}) 