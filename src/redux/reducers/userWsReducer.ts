import { refreshToken } from '../../services/fetchWithRefresh';
import { IOrderFeedWebSocketState } from '../../types/IOrderData';
import { setCookie } from '../../utils/cookie';
import { USER_WS_CONNECTION_START, USER_WS_CONNECTION_CLOSED, USER_WS_CONNECTION_ERROR, USER_WS_CONNECTION_SUCCESS, USER_WS_GET_MESSAGE } from '../actions/userWsActions';

export const wsActionsUser = {
    wsInit: USER_WS_CONNECTION_START,
    onOpen: USER_WS_CONNECTION_SUCCESS,
    onClose: USER_WS_CONNECTION_CLOSED,
    onError: USER_WS_CONNECTION_ERROR,
    onMessage: USER_WS_GET_MESSAGE
};

const initialState: IOrderFeedWebSocketState =
{
    wsConnected: false,
    error: null,
    feed: null
};

export const ORDERS_USER_ENDPOINT: string = 'wss://norma.nomoreparties.space/orders';

export const userWsReducer = (state: IOrderFeedWebSocketState = initialState, action: any): IOrderFeedWebSocketState =>
{
   switch (action.type)
    {
        case USER_WS_CONNECTION_SUCCESS:
            return { ...state, error: null, wsConnected: true };

        case USER_WS_CONNECTION_ERROR:
            return { ...state, error: action.payload, wsConnected: false };

        case USER_WS_CONNECTION_CLOSED:
            return { ...state, error: null, wsConnected: false };

        case USER_WS_GET_MESSAGE:
        {
            const response = JSON.parse(action.payload);

            if (response.message === "Invalid or missing token")
            {
                refreshToken()
                .then(res =>
                    {
                    setCookie('accessToken', res.accessToken);
                    action.dispatch({ type: USER_WS_CONNECTION_START, payload: res.accessToken.substr(7) });
                })
                .catch(err => console.error('WS: Refresh token error: ', err))
            }

            return { ...state, error: null, feed: JSON.parse(action.payload) };
        }

        default:
            return state;
    }
}; 