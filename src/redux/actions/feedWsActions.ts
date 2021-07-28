export const FEED_WS_CONNECTION_START = 'FEED_WS_CONNECTION_START';
export const FEED_WS_CONNECTION_SUCCESS = 'FEED_WS_CONNECTION_SUCCESS';
export const FEED_WS_CONNECTION_ERROR = 'FEED_WS_CONNECTION_ERROR';
export const FEED_WS_CONNECTION_CLOSED = 'FEED_WS_CONNECTION_CLOSED';
export const FEED_WS_GET_MESSAGE = 'FEED_WS_GET_MESSAGE';
  
export const feedWsConnectionSuccess = () =>
{
    return {
        type: FEED_WS_CONNECTION_SUCCESS
    };
};

export const feedWsConnectionError = () =>
{
    return {
        type: FEED_WS_CONNECTION_ERROR
    };
};

export const feedWsConnectionClosed = () =>
{
    return {
        type: FEED_WS_CONNECTION_CLOSED
    };
};

export const feedWsGetMessage = (message: string) =>
{
    return {
        type: FEED_WS_GET_MESSAGE,
        payload: message
    };
};