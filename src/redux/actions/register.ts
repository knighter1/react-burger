import { setCookie } from "../../utils/cookie";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export function register(email: string, password: string, name: string, history: any)
{
    const END_POINT: string = 'https://norma.nomoreparties.space/api/auth/register';
    
    return function(dispatch: Function)
    {
        dispatch({ type: REGISTER_REQUEST });
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
            dispatch({ type: REGISTER_SUCCESS, ...responseObj });
            history.replace('/');
            setCookie('refreshToken', responseObj.refreshToken);
            console.log(responseObj);
        })
        .catch(error => {
            dispatch({ type: REGISTER_ERROR });
            console.error(`Register error: ${error}`)
        });
    }
}