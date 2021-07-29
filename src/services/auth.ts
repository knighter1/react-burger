import { loginRequest, logoutRequest, getUserRequest } from './api';
import {
    SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_ERROR,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR } from '../redux/actions/auth';
import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR } from '../redux/actions/profile';

export const signIn = (email: string, password: string, dispatch: Function) =>
{
    dispatch({ type: SIGNIN_REQUEST });

    loginRequest(email, password)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Status ${response.status}`);
    })
    .then(responseObj => {
        dispatch({ type: SIGNIN_SUCCESS, ...responseObj });
    })
    .catch(error => {
        dispatch({ type: SIGNIN_ERROR });
        console.error(`Signin error: ${error}`)
    });
}

export const signOut = (dispatch: Function, history: any) =>
{
    dispatch({ type: LOGOUT_REQUEST });

    logoutRequest()
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Status ${response.status}`);
    })
    .then(responseObj => {
        dispatch({ type: LOGOUT_SUCCESS, ...responseObj });
        history.replace('/login');
    })
    .catch(error => {
        dispatch({ type: LOGOUT_ERROR });
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