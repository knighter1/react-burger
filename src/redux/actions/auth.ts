import { IUser } from "../../types/IUser";
import { getCookie } from "../../utils/cookie";
import { AppDispatch, AppThunk } from "../reducers";
import { History } from 'history';

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

export const signInRequest = (): ISignInRequestAction => ({ type: SIGNIN_REQUEST });

export const signInSuccess = (accessToken: string, refreshToken: string, user: IUser): ISignInSuccessAction => ({
    type: SIGNIN_SUCCESS,
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: user
});

export const signInError = (): ISignInErrorAction => ({ type: SIGNIN_ERROR });

export const logoutRequest = (): ILogoutRequestAction => ({ type: LOGOUT_REQUEST });

export const logoutSuccess = (): ILogoutSuccessAction => ({ type: LOGOUT_SUCCESS });

export const logoutError = (): ILogoutErrorAction => ({ type: LOGOUT_ERROR });

const loginRequest = async (email: string, password: string) =>
{
    return await fetch('https://norma.nomoreparties.space/api/auth/login', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ email: email, password: password })
    });
};

export const signIn: AppThunk = (email: string, password: string) => (dispatch: AppDispatch) =>
{
    dispatch(signInRequest());

    loginRequest(email, password)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Status ${response.status}`);
    })
    .then(responseObj => {
        dispatch(signInSuccess(responseObj.accessToken, responseObj.refreshToken, responseObj.user));
    })
    .catch(error => {
        dispatch(signInError());
        console.error(`Signin error: ${error}`)
    });
}

const logout = async () =>
{
    const refreshToken = getCookie('refreshToken');

    return await fetch('https://norma.nomoreparties.space/api/auth/logout', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ token: refreshToken })
    });
};

export const signOut: AppThunk = (history: History) => (dispatch: AppDispatch) =>
{
    let refreshToken: string | undefined = getCookie('refreshToken');
    if (!refreshToken)
        refreshToken = '';
    dispatch(logoutRequest());

    logout()
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Status ${response.status}`);
    })
    .then(() => {
        dispatch(logoutSuccess());
        history.replace('/login');
    })
    .catch(error => {
        dispatch(logoutError());
        console.error(`Logout error: ${error}`)
    });
};