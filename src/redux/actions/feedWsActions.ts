import { WebSocketAction } from "../middlewares/wsMiddleware";

export const FEED_WS_CONNECTION_START = 'FEED_WS_CONNECTION_START';
export const FEED_WS_CONNECTION_SUCCESS = 'FEED_WS_CONNECTION_SUCCESS';
export const FEED_WS_CONNECTION_ERROR = 'FEED_WS_CONNECTION_ERROR';
export const FEED_WS_CONNECTION_CLOSED = 'FEED_WS_CONNECTION_CLOSED';
export const FEED_WS_GET_MESSAGE = 'FEED_WS_GET_MESSAGE';

export interface IFeedWsConnectionStartAction extends WebSocketAction {
    readonly type: typeof FEED_WS_CONNECTION_START;
}

export interface IFeedWsConnectionSuccessAction extends WebSocketAction {
    readonly type: typeof FEED_WS_CONNECTION_SUCCESS;
}

export interface IFeedWsConnectionErrorAction extends WebSocketAction {
    readonly type: typeof FEED_WS_CONNECTION_ERROR;
    readonly payload: string;
}

export interface IFeedWsConnectionClosedAction extends WebSocketAction {
    readonly type: typeof FEED_WS_CONNECTION_CLOSED;
    readonly payload: string;
}

export interface IFeedWsGetMessageAction extends WebSocketAction {
    readonly type: typeof FEED_WS_GET_MESSAGE;
    readonly payload: string;
}

export type TFeedWsActions =
    IFeedWsConnectionStartAction |
    IFeedWsConnectionSuccessAction |
    IFeedWsConnectionErrorAction |
    IFeedWsConnectionClosedAction |
    IFeedWsGetMessageAction;

export const feedWsConnectionStart = (): IFeedWsConnectionStartAction => ({ type: FEED_WS_CONNECTION_START });

export const feedWsConnectionSuccess = (): IFeedWsConnectionSuccessAction => ({ type: FEED_WS_CONNECTION_SUCCESS });

export const feedWsConnectionError = (payload: string): IFeedWsConnectionErrorAction => ({ type: FEED_WS_CONNECTION_ERROR, payload: payload });

export const feedWsConnectionClosed = (payload: string): IFeedWsConnectionClosedAction => ({ type: FEED_WS_CONNECTION_CLOSED, payload: payload });

export const feedWsGetMessage = (message: string): IFeedWsGetMessageAction => ({ type: FEED_WS_GET_MESSAGE, payload: message });