export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
    readonly message: string;
}

export interface IResetPasswordErrorAction {
    readonly type: typeof RESET_PASSWORD_ERROR;
}

export type TResetPasswordActions =
    IResetPasswordRequestAction |
    IResetPasswordSuccessAction |
    IResetPasswordErrorAction;

export const resetPasswordRequest = (): IResetPasswordRequestAction => ({ type: RESET_PASSWORD_REQUEST });

export const resetPasswordSuccess = (message: string): IResetPasswordSuccessAction => ({ type: RESET_PASSWORD_SUCCESS, message: message });

export const resetPasswordError = (): IResetPasswordErrorAction => ({ type: RESET_PASSWORD_ERROR });

export function resetPassword(password: string, token: string, history: any)
{
    const END_POINT = 'https://norma.nomoreparties.space/api/password-reset/reset';
    
    return function(dispatch: Function)
    {
        dispatch(resetPasswordRequest());
        
        fetch(END_POINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password, token: token })
        })
        .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(`Status ${response.status}`);
        })
        .then(responseObj => {
            dispatch(resetPasswordSuccess(responseObj.message));
            history.replace('/login');
        })
        .catch(error => {
            dispatch(resetPasswordError());
            console.error(`Reset password error: ${error}`)
        });
    }
}