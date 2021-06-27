import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers/index';
import { IngredientData } from './components/IngredientMenuItem/IngredientMenuItem';
import { IConstructorState } from './services/reducers/constructor';
import { IApiState } from './services/reducers/api';
import { IOrderState } from './services/reducers/order';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

export interface IStore {
    ingredientsLib: IApiState,
    constructor: IConstructorState,
    ingredient: IngredientData | null,
    order: IOrderState
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