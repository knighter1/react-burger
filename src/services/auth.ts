import { loginRequest, getUserRequest, logout } from './api';
import {
    signInRequest, signInSuccess, signInError, logoutRequest, logoutSuccess, logoutError } from '../redux/actions/auth';
import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR } from '../redux/actions/profile';
import { getCookie } from '../utils/cookie';

export const signIn = (email: string, password: string, dispatch: Function) =>
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
        dispatch(signInSuccess(responseObj.accessToken, responseObj.refreshtoken, responseObj.user));
    })
    .catch(error => {
        dispatch(signInError());
        console.error(`Signin error: ${error}`)
    });
}

export const signOut = (dispatch: Function, history: any) =>
{
    let refreshToken: string | undefined = getCookie('refreshToken');
    if (!refreshToken)
        refreshToken = '';
    dispatch(logoutRequest(refreshToken));

    logout()
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Status ${response.status}`);
    })
    .then(responseObj => {
        dispatch(logoutSuccess());
        history.replace('/login');
    })
    .catch(error => {
        dispatch(logoutError());
        console.error(`Logout error: ${error}`)
    });
};

export const getUser = (dispatch: Function) =>
{
    dispatch({ type: GET_USER_REQUEST });

    getUserRequest()
    .then(response => {
        if (response.success) {
            return response;
        }
        return Promise.reject(`Status ${response.status}`);
    })
    .then(responseObj => {
        dispatch({ type: GET_USER_SUCCESS, ...responseObj });
    })
    .catch(error => {
        dispatch({ type: GET_USER_ERROR });
        console.error('Get user info error:', error)
    });
}