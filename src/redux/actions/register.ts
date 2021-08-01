import { IUser } from "../../types/IUser";
import { setCookie } from "../../utils/cookie";
import { AppDispatch, AppThunk } from "../reducers";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction
{
    readonly type: typeof REGISTER_SUCCESS;
    readonly accessToken: string;
    readonly refreshToken: string;
    user: IUser;
}

export interface IRegisterErrorAction {
    readonly type: typeof REGISTER_ERROR;
}

export type TRegisterActions = 
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterErrorAction;

export const registerRequest = (): IRegisterRequestAction => ({ type: REGISTER_REQUEST });

export const registerSuccess = (accessToken: string, refreshToken: string, user: IUser): IRegisterSuccessAction => ({
    type: REGISTER_SUCCESS,
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: user
});

export const registerError = (): IRegisterErrorAction => ({ type: REGISTER_ERROR });

export const register: AppThunk = (email: string, password: string, name: string, history: any) => (dispatch: AppDispatch) =>
{
    const END_POINT: string = 'https://norma.nomoreparties.space/api/auth/register';
    
    dispatch(registerRequest());

    fetch(END_POINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password, name: name })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Status ${response.status}`);
    })
    .then(responseObj => {
        dispatch(registerSuccess(responseObj.accessToken, responseObj.refreshToken, responseObj.user));
        history.replace('/');
        setCookie('refreshToken', responseObj.refreshToken);
    })
    .catch(error => {
        dispatch(registerError());
        console.error(`Register error: ${error}`)
    });
}