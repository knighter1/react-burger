import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { apiReducer, IIngredientsLibState } from './ingredientsLib';
import { constructorReducer, IConstructorState } from './constructor';
import { IOrderState, orderReducer } from './order';
import { ingredientReducer } from './ingredient';
import { IInitResetPasswordState, initResetPasswordReducer } from './initResetPassword';
import { IResetPasswordState, resetPasswordReducer } from './resetPassword';
import { accessReducer, IAccessState } from './access';
import { IOrderDetailsState, orderDetailsReducer } from './orderDetails';
import { feedWsReducer } from './feedWsReducer';
import { IngredientData } from '../../components/IngredientMenuItem/IngredientMenuItem';
import { IOrderFeedWebSocketState } from '../../types/IOrderData';
import thunk from 'redux-thunk';
import { socketMiddleware } from '../middlewares/wsMiddleware';

export const rootReducer = combineReducers({
    ingredientsLib: apiReducer,
    constructor: constructorReducer,
    ingredient: ingredientReducer,
    order: orderReducer,
    initResetPassword: initResetPasswordReducer,
    resetPassword: resetPasswordReducer,
    access: accessReducer,
    orderDetails: orderDetailsReducer,
    feedWs: feedWsReducer
});

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const ORDERS_FEED_ENDPOINT: string = 'wss://norma.nomoreparties.space/orders/all';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(ORDERS_FEED_ENDPOINT)));

export interface IStore {
    ingredientsLib: IIngredientsLibState,
    constructor: IConstructorState,
    ingredient: IngredientData | null,
    order: IOrderState,
    orderDetails: IOrderDetailsState,
    initResetPassword: IInitResetPasswordState,
    resetPassword: IResetPasswordState,
    access: IAccessState,
    feedWs: IOrderFeedWebSocketState
}

export const store = createStore(rootReducer, enhancer);