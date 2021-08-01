export const USER_WS_CONNECTION_START = 'USER_WS_CONNECTION_START';
export const USER_WS_CONNECTION_SUCCESS = 'USER_WS_CONNECTION_SUCCESS';
export const USER_WS_CONNECTION_ERROR = 'USER_WS_CONNECTION_ERROR';
export const USER_WS_CONNECTION_CLOSED = 'USER_WS_CONNECTION_CLOSED';
export const USER_WS_GET_MESSAGE = 'USER_WS_GET_MESSAGE';

export interface IUserWsConnectionStartAction {
    readonly type: typeof USER_WS_CONNECTION_START;
    readonly payload: string;
}

export interface IUserWsConnectionSuccessAction {
    readonly type: typeof USER_WS_CONNECTION_SUCCESS;
}

export interface IUserWsConnectionErrorAction {
    readonly type: typeof USER_WS_CONNECTION_ERROR;
    readonly payload: string;
}

export interface IUserWsConnectionClosedAction {
    readonly type: typeof USER_WS_CONNECTION_CLOSED;
}

export interface IUserWsGetMessageAction {
    readonly type: typeof USER_WS_GET_MESSAGE;
    readonly payload: string;
    readonly dispatch: Function;
}

export type TUserWsActions =
    IUserWsConnectionStartAction |
    IUserWsConnectionSuccessAction |
    IUserWsConnectionErrorAction |
    IUserWsConnectionClosedAction |
    IUserWsGetMessageAction;

export const userWsConnectionStart = (token: string): IUserWsConnectionStartAction => ({ type: USER_WS_CONNECTION_START, payload: token });

export const userWsConnectionSuccess = (): IUserWsConnectionSuccessAction => ({ type: USER_WS_CONNECTION_SUCCESS });

export const userWsConnectionError = (payload: string): IUserWsConnectionErrorAction => ({ type: USER_WS_CONNECTION_ERROR, payload: payload });

export const userWsConnectionClosed = (): IUserWsConnectionClosedAction => ({ type: USER_WS_CONNECTION_CLOSED });

export const userWsGetMessage = (message: string, dispatch: Function): IUserWsGetMessageAction => ({ type: USER_WS_GET_MESSAGE, payload: message, dispatch: dispatch });