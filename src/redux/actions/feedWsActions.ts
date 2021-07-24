import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE } from './wsActions';
  
export const feedWsConnectionSuccess = () =>
{
    return {
        type: WS_CONNECTION_SUCCESS
    };
};

export const feedWsConnectionError = () =>
{
    return {
        type: WS_CONNECTION_ERROR
    };
};

export const feedWsConnectionClosed = () =>
{
    return {
        type: WS_CONNECTION_CLOSED
    };
};

export const feedWsGetMessage = (message: string) =>
{
    return {
        type: WS_GET_MESSAGE,
        payload: message
    };
};