export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export function resetPassword(password: string, token: string, history: any)
{
    const END_POINT = 'https://norma.nomoreparties.space/api/password-reset/reset';
    
    return function(dispatch: Function)
    {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        
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
            dispatch({ type: RESET_PASSWORD_SUCCESS, message: responseObj.message, success: responseObj.success });
            history.replace('/login');
        })
        .catch(error => {
            dispatch({ type: RESET_PASSWORD_ERROR });
            console.error(`Reset password error: ${error}`)
        });
    }
}