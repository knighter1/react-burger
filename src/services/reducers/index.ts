import { combineReducers } from 'redux';
import { apiReducer } from './ingredientsLib';
import { constructorReducer } from './constructor';
import { orderReducer } from './order';
import { ingredientReducer } from './ingredient';
import { initResetPasswordReducer } from './initResetPassword';
import { resetPasswordReducer } from './resetPassword';
import { accessReducer } from './access';
import { orderDetailsReducer } from './orderDetails';

export const rootReducer = combineReducers({
    ingredientsLib: apiReducer,
    constructor: constructorReducer,
    ingredient: ingredientReducer,
    order: orderReducer,
    initResetPassword: initResetPasswordReducer,
    resetPassword: resetPasswordReducer,
    access: accessReducer,
    orderDetails: orderDetailsReducer
});