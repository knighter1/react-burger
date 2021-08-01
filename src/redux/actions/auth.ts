import { IUser } from "../../types/IUser";

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_ERROR = 'SIGNIN_ERROR';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export interface ISignInRequestAction {
    readonly type: typeof SIGNIN_REQUEST;
}

export interface ISignInSuccessAction {
    readonly type: typeof SIGNIN_SUCCESS;
    readonly accessToken: string;
    readonly refreshToken: string;
    user: IUser;
}

export interface ISignInErrorAction {
    readonly type: typeof SIGNIN_ERROR;
}

export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutErrorAction {
    readonly type: typeof LOGOUT_ERROR;
}

export type TAuthActions = 
    | ISignInRequestAction
    | ISignInSuccessAction
    | ISignInErrorAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutErrorAction;