import { getCookie } from "../../utils/cookie";
import { fetchWithRefresh } from "../../services/fetchWithRefresh";
import { USER_END_POINT } from '../../services/api';
import { IUser } from "../../types/IUser";

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
export const PATCH_USER_ERROR = 'PATCH_USER_ERROR';

export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    user: IUser;
}

export interface IGetUserErrorAction {
    readonly type: typeof GET_USER_ERROR;
}

export interface IPatchUserRequestAction {
    readonly type: typeof PATCH_USER_REQUEST;
}

export interface IPatchUserSuccessAction {
    readonly type: typeof PATCH_USER_SUCCESS;
    user: IUser;
}

export interface IPatchUserErrorAction {
    readonly type: typeof PATCH_USER_ERROR;
}

export type TProfileActions = 
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserErrorAction
    | IPatchUserRequestAction
    | IPatchUserSuccessAction
    | IPatchUserErrorAction;

export function updateUserInfo(email: string, name: string, password: string, onPathSuccess: Function)
{
    return function(dispatch: Function)
    {
        dispatch({ type: PATCH_USER_REQUEST });
        const accessToken = getCookie('accessToken');
        const info = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': accessToken ? accessToken : ''
            },
            body: JSON.stringify({ email: email, name: name, password: password })};

        fetchWithRefresh(USER_END_POINT, info)
        .then(response => {
            if (response.success) {
              return response;
            }
            return Promise.reject(`Status ${response.status}`);
        })
        .then(responseObj => {
            dispatch({ type: PATCH_USER_SUCCESS, ...responseObj });
            onPathSuccess();
        })
        .catch(error => {
            dispatch({ type: PATCH_USER_ERROR });
            console.error(`Update user info error: ${error}`)
        });
    }
}