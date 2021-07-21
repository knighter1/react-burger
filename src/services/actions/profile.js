import { getCookie } from "../../utils/cookie";
import { fetchWithRefresh } from "../fetchWithRefresh";

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
export const PATCH_USER_ERROR = 'PATCH_USER_ERROR';

export function updateUserInfo(email, name, setIsModified)
{
    const USER_END_POINT = 'https://norma.nomoreparties.space/api/auth/user';
    
    return function(dispatch)
    {
        dispatch({ type: PATCH_USER_REQUEST });
        const accessToken = getCookie('accessToken');
        const info = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': accessToken ? accessToken : ''
            },
            body: JSON.stringify({ email: email, name: name })};

        fetchWithRefresh(USER_END_POINT, info)
        .then(response => {
            if (response.success) {
              return response;
            }
            return Promise.reject(`Status ${response.status}`);
        })
        .then(responseObj => {
            dispatch({ type: PATCH_USER_SUCCESS, ...responseObj });
            setIsModified(false);

            console.log(responseObj);
        })
        .catch(error => {
            dispatch({ type: PATCH_USER_ERROR });
            console.error(`Update user info error: ${error}`)
        });
    }
}