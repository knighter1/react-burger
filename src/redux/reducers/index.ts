import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { ingredientsLibReducer } from './ingredientsLib';
import { constructorReducer } from './constructor';
import { orderReducer } from './order';
import { ingredientReducer } from './ingredient';
import { initResetPasswordReducer } from './initResetPassword';
import { resetPasswordReducer } from './resetPassword';
import { accessReducer } from './access';
import { orderDetailsReducer } from './orderDetails';
import { feedWsReducer, ORDERS_FEED_ENDPOINT, wsActionsFeed } from './feedWsReducer';
import thunk from 'redux-thunk';
import { socketMiddleware } from '../middlewares/wsMiddleware';
import { ORDERS_USER_ENDPOINT, userWsReducer, wsActionsUser } from './userWsReducer';

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