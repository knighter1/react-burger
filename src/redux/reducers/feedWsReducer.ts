import { IOrderFeedWebSocketState } from '../../types/IOrderData';
import { FEED_WS_CONNECTION_START, FEED_WS_CONNECTION_CLOSED, FEED_WS_CONNECTION_ERROR, FEED_WS_CONNECTION_SUCCESS, FEED_WS_GET_MESSAGE } from '../actions/feedWsActions';

export const wsActionsFeed =
{
    wsInit: FEED_WS_CONNECTION_START,
    onOpen: FEED_WS_CONNECTION_SUCCESS,
    onClose: FEED_WS_CONNECTION_CLOSED,
    onError: FEED_WS_CONNECTION_ERROR,
    onMessage: FEED_WS_GET_MESSAGE
};

export const initialState: IOrderFeedWebSocketState =
{
    wsConnected: false,
    error: null,
    feed: null
};

export const ORDERS_FEED_ENDPOINT: string = 'wss://norma.nomoreparties.space/orders/all';

export const feedWsReducer = (state: IOrderFeedWebSocketState = initialState, action: any): IOrderFeedWebSocketState =>
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
            console.log(action.payload);
            return { ...state, error: null, feed: JSON.parse(action.payload) };

        default:
            return state;
    }
}; 