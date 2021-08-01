import { Action, ActionCreator, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { ingredientsLibReducer } from './ingredientsLib';
import { constructorReducer } from './constructor';
import { orderReducer } from './order';
import { ingredientReducer } from './ingredient';
import { initResetPasswordReducer } from './initResetPassword';
import { resetPasswordReducer } from './resetPassword';
import { accessReducer } from './access';
import { orderDetailsReducer } from './orderDetails';
import { feedWsReducer, ORDERS_FEED_ENDPOINT, wsActionsFeed } from './feedWsReducer';
import thunk, { ThunkAction } from 'redux-thunk';
import { socketMiddleware } from '../middlewares/wsMiddleware';
import { ORDERS_USER_ENDPOINT, userWsReducer, wsActionsUser } from './userWsReducer';
import { TAuthActions } from '../actions/auth';
import { TConstructorActions } from '../actions/constructor';
import { ISetIngredientAction } from '../actions/ingredient';
import { TGetIngredientsLibActions } from '../actions/ingredientsLib';
import { TInitResetPasswordActions } from '../actions/initResetPassword';
import { TPlaceOrderActions } from '../actions/order';
import { TOrderDetailsActions } from '../actions/orderDetails';
import { TProfileActions } from '../actions/profile';
import { TRegisterActions } from '../actions/register';
import { TResetPasswordActions } from '../actions/resetPassword';
import { TFeedWsActions } from '../actions/feedWsActions';
import { TUserWsActions } from '../actions/userWsActions';
import { Dispatch } from 'react';

export const rootReducer = combineReducers({
    ingredientsLib: ingredientsLibReducer,
    constructor: constructorReducer,
    ingredient: ingredientReducer,
    order: orderReducer,
    initResetPassword: initResetPasswordReducer,
    resetPassword: resetPasswordReducer,
    access: accessReducer,
    orderDetails: orderDetailsReducer,
    feedWs: feedWsReducer,
    userWs: userWsReducer,
});

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const wsFeed = socketMiddleware(ORDERS_FEED_ENDPOINT, wsActionsFeed);
const wsUser = socketMiddleware(ORDERS_USER_ENDPOINT, wsActionsUser);

const middleWares = applyMiddleware(thunk, wsFeed, wsUser);
const enhancer = composeEnhancers(middleWares);

export const store = createStore(rootReducer, enhancer);

export type TStore = ReturnType<typeof store.getState>;

type TApplicationActions = 
    TAuthActions |
    TConstructorActions |
    ISetIngredientAction |
    TGetIngredientsLibActions |
    TInitResetPasswordActions |
    TPlaceOrderActions |
    TOrderDetailsActions |
    TProfileActions |
    TRegisterActions |
    TResetPasswordActions |
    TFeedWsActions |
    TUserWsActions;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, TStore, TApplicationActions>
>;

export type AppDispatch = Dispatch<TApplicationActions>; 