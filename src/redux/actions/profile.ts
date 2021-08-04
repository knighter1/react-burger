import { getCookie } from "../../utils/cookie";
import { fetchWithRefresh } from "../../services/fetchWithRefresh";
import { IUser } from "../../types/IUser";
import { AppDispatch, AppThunk } from "../reducers";

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

export const getUserRequest = (): IGetUserRequestAction => ({ type: GET_USER_REQUEST });

export const getUserSuccess = (user: IUser): IGetUserSuccessAction => ({ type: GET_USER_SUCCESS, user: user });

export const getUserError = (): IGetUserErrorAction => ({ type: GET_USER_ERROR });

export const patchUserRequest = (): IPatchUserRequestAction => ({ type: PATCH_USER_REQUEST });

export const patchUserSuccess = (user: IUser): IPatchUserSuccessAction => ({ type: PATCH_USER_SUCCESS, user: user });

export const patchUserError = (): IPatchUserErrorAction => ({ type: PATCH_USER_ERROR });

const USER_END_POINT = 'https://norma.nomoreparties.space/api/auth/user';

export const updateUserInfo: AppThunk = (email: string, name: string, password: string, onPatchSuccess: () => void) => (dispatch: AppDispatch) =>
{
    dispatch(patchUserRequest());

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
        dispatch(patchUserSuccess(responseObj.user));
        onPatchSuccess();
    })
    .catch(error => {
        dispatch(patchUserError());
        console.error(`Update user info error: ${error}`)
    });
}

const fetchGetUser = async () =>
{
    let accessToken = getCookie('accessToken');
    if (!accessToken)
        accessToken = '';

    return await fetchWithRefresh(USER_END_POINT,
    {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    })
}

export const getUser: AppThunk = () => (dispatch: AppDispatch) =>
{
    dispatch(getUserRequest());

    fetchGetUser()
    .then(response => {
        if (response.success) {
            return response;
        }
        return Promise.reject(`Status ${response.status}`);
    })
    .then(responseObj => {
        dispatch(getUserSuccess(responseObj.user));
    })
    .catch(error => {
        dispatch(getUserError());
        console.error('Get user info error:', error)
    });
}