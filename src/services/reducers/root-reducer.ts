import { combineReducers } from 'redux';
import { apiReducer } from './api';

export const rootReducer = combineReducers({
    ingredientsLib: apiReducer
}) 