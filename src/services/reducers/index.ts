import { combineReducers } from 'redux';
import { apiReducer } from './api';
import { constructorReducer } from './constructor';
import { orderReducer } from './order';
import { ingredientReducer } from './ingredient';
import { initResetPasswordReducer } from './initResetPassword';
import { resetPasswordReducer } from './resetPassword';
import { signInReducer } from './signin';
import { registerReducer } from './register';

export const rootReducer = combineReducers({
    ingredientsLib: apiReducer,
    constructor: constructorReducer,
    ingredient: ingredientReducer,
    order: orderReducer,
    initResetPassword: initResetPasswordReducer,
    resetPassword: resetPasswordReducer,
    signIn: signInReducer,
    register: registerReducer,
});