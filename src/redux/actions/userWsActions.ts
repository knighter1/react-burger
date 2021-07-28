export const USER_WS_CONNECTION_START = 'USER_WS_CONNECTION_START';
export const USER_WS_CONNECTION_SUCCESS = 'USER_WS_CONNECTION_SUCCESS';
export const USER_WS_CONNECTION_ERROR = 'USER_WS_CONNECTION_ERROR';
export const USER_WS_CONNECTION_CLOSED = 'USER_WS_CONNECTION_CLOSED';
export const USER_WS_GET_MESSAGE = 'USER_WS_GET_MESSAGE';
  
export const userWsConnectionSuccess = () =>
{
    return {
        type: USER_WS_CONNECTION_SUCCESS
    };
};

export const userWsConnectionError = () =>
{
    return {
        type: USER_WS_CONNECTION_ERROR
    };
};

export const userWsConnectionClosed = () =>
{
    return {
        type: USER_WS_CONNECTION_CLOSED
    };
};

export const userWsGetMessage = (message: string) =>
{
    return {
        type: USER_WS_GET_MESSAGE,
        payload: message
    };
};