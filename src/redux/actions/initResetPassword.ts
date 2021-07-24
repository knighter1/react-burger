export const INIT_RESET_PASSWORD_REQUEST = 'INIT_RESET_PASSWORD_REQUEST';
export const INIT_RESET_PASSWORD_SUCCESS = 'INIT_RESET_PASSWORD_SUCCESS';
export const INIT_RESET_PASSWORD_ERROR = 'INIT_RESET_PASSWORD_ERROR';

export function initResetPassword(email: string, history: any)
{
    const END_POINT: string = 'https://norma.nomoreparties.space/api/password-reset';
    
    return function(dispatch: Function)
    {
        dispatch({ type: INIT_RESET_PASSWORD_REQUEST });

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
            dispatch({ type: INIT_RESET_PASSWORD_SUCCESS, message: responseObj.message, success: responseObj.success });
            history.push('/reset-password', {from: history.location});
        })
        .catch(error => {
            dispatch({ type: INIT_RESET_PASSWORD_ERROR });
            console.error(`Reset password error: ${error}`)
        });
    }
}