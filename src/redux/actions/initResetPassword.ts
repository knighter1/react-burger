import { AppDispatch, AppThunk } from "../reducers";
import { History } from 'history';

export const INIT_RESET_PASSWORD_REQUEST = 'INIT_RESET_PASSWORD_REQUEST';
export const INIT_RESET_PASSWORD_SUCCESS = 'INIT_RESET_PASSWORD_SUCCESS';
export const INIT_RESET_PASSWORD_ERROR = 'INIT_RESET_PASSWORD_ERROR';

export interface IInitResetPasswordRequestAction {
    readonly type: typeof INIT_RESET_PASSWORD_REQUEST;
}

export interface IInitResetPasswordSuccessAction {
    readonly type: typeof INIT_RESET_PASSWORD_SUCCESS;
    readonly message: string;
}

export interface IInitResetPasswordErrorAction {
    readonly type: typeof INIT_RESET_PASSWORD_ERROR;
}

export type TInitResetPasswordActions =
    IInitResetPasswordRequestAction |
    IInitResetPasswordSuccessAction |
    IInitResetPasswordErrorAction;

export const initResetPasswordRequest = (): IInitResetPasswordRequestAction => ({ type: INIT_RESET_PASSWORD_REQUEST });

export const initResetPasswordSuccess = (message: string): IInitResetPasswordSuccessAction => ({ type: INIT_RESET_PASSWORD_SUCCESS, message: message });

export const initResetPasswordError = (): IInitResetPasswordErrorAction => ({ type: INIT_RESET_PASSWORD_ERROR });

export const initResetPassword: AppThunk = (email: string, history: History) => (dispatch: AppDispatch) =>
{
    const END_POINT: string = 'https://norma.nomoreparties.space/api/password-reset';
    
    dispatch(initResetPasswordRequest());

    fetch(END_POINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Status ${response.status}`);
    })
    .then(responseObj => {
        dispatch(initResetPasswordSuccess(responseObj.message));
        history.push('/reset-password', {from: history.location});
    })
    .catch(error => {
        dispatch(initResetPasswordError());
        console.error(`Reset password error: ${error}`)
    });
}