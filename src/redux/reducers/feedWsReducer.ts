import { IOrderFeedWebSocketState } from '../../types/IOrderData';
import {
    FEED_WS_CONNECTION_START, FEED_WS_CONNECTION_CLOSED, FEED_WS_CONNECTION_ERROR, FEED_WS_CONNECTION_SUCCESS, FEED_WS_GET_MESSAGE,
    TFeedWsActions, feedWsConnectionSuccess, feedWsConnectionError, feedWsConnectionClosed, feedWsGetMessage } from '../actions/feedWsActions';
import { IWsActions } from '../middlewares/wsMiddleware';

export const wsActionsFeed: IWsActions =
{
    wsInit: FEED_WS_CONNECTION_START,
    onOpen: () => feedWsConnectionSuccess(),
    onClose: (payload: string) => feedWsConnectionClosed(payload),
    onError: (payload: string) => feedWsConnectionError(payload),
    onMessage: (payload: string, dispatch?: Function) => feedWsGetMessage(payload)
};

export const initialState: IOrderFeedWebSocketState =
{
    wsConnected: false,
    error: null,
    feed: null
};

export const ORDERS_FEED_ENDPOINT: string = 'wss://norma.nomoreparties.space/orders/all';

export const feedWsReducer = (state: IOrderFeedWebSocketState = initialState, action: TFeedWsActions): IOrderFeedWebSocketState =>
{
    switch (action.type)
    {
        case FEED_WS_CONNECTION_SUCCESS:
            return { ...state, error: null, wsConnected: true };

        case FEED_WS_CONNECTION_ERROR:
            return { ...state, error: action.payload, wsConnected: false };

        case FEED_WS_CONNECTION_CLOSED:
            return { ...state, error: null, wsConnected: false };

        case FEED_WS_GET_MESSAGE:
            return { ...state, error: null, feed: JSON.parse(action.payload) };

        default:
            return state;
    }
}; 