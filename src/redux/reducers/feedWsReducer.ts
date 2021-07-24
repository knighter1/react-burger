import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE } from '../actions/wsActions';
import { IOrderFeedWebSocketState } from '../../types/IOrderData';

const initialState: IOrderFeedWebSocketState =
{
    wsConnected: false,
    error: null,
    feed: null
};

export const feedWsReducer = (state: IOrderFeedWebSocketState = initialState, action: any): IOrderFeedWebSocketState =>
{
    switch (action.type)
    {
        case WS_CONNECTION_SUCCESS:
            return { ...state, error: null, wsConnected: true };

        case WS_CONNECTION_ERROR:
            return { ...state, error: action.payload, wsConnected: false };

        case WS_CONNECTION_CLOSED:
            return { ...state, error: null, wsConnected: false };

        case WS_GET_MESSAGE:
            return { ...state, error: null, feed: JSON.parse(action.payload) };

        default:
            return state;
    }
}; 