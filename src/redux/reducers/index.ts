import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { apiReducer, IIngredientsLibState } from './ingredientsLib';
import { constructorReducer, IConstructorState } from './constructor';
import { IOrderState, orderReducer } from './order';
import { ingredientReducer } from './ingredient';
import { IInitResetPasswordState, initResetPasswordReducer } from './initResetPassword';
import { IResetPasswordState, resetPasswordReducer } from './resetPassword';
import { accessReducer, IAccessState } from './access';
import { IOrderDetailsState, orderDetailsReducer } from './orderDetails';
import { feedWsReducer, ORDERS_FEED_ENDPOINT, wsActionsFeed } from './feedWsReducer';
import { IOrderFeedWebSocketState } from '../../types/IOrderData';
import thunk from 'redux-thunk';
import { socketMiddleware } from '../middlewares/wsMiddleware';
import { ORDERS_USER_ENDPOINT, userWsReducer, wsActionsUser } from './userWsReducer';
import { IngredientData } from '../../types/IIngredientData';

export const rootReducer = combineReducers({
    ingredientsLib: apiReducer,
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

export interface IStore {
    ingredientsLib: IIngredientsLibState,
    constructor: IConstructorState,
    ingredient: IngredientData | null,
    order: IOrderState,
    orderDetails: IOrderDetailsState,
    initResetPassword: IInitResetPasswordState,
    resetPassword: IResetPasswordState,
    access: IAccessState,
    feedWs: IOrderFeedWebSocketState,
    userWs: IOrderFeedWebSocketState
}

export const store = createStore(rootReducer, enhancer);