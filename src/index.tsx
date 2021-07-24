import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './redux/reducers/index';
import { IngredientData } from './components/IngredientMenuItem/IngredientMenuItem';
import { IConstructorState } from './redux/reducers/constructor';
import { IIngredientsLibState } from './redux/reducers/ingredientsLib';
import { IOrderState } from './redux/reducers/order';
import { IInitResetPasswordState } from './redux/reducers/initResetPassword';
import { IResetPasswordState } from './redux/reducers/resetPassword';
import { IAccessState } from './redux/reducers/access';
import { IOrderDetailsState } from './redux/reducers/orderDetails';
import { IOrderFeedWebSocketState } from './types/IOrderData';
import { socketMiddleware } from './redux/middlewares/wsMiddleware';

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

const store = createStore(rootReducer, enhancer);

ReactDOM.render( 
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();