import { useContext, createContext } from 'react';
import { loginRequest, logoutRequest, getUserRequest } from './api';
import { useDispatch, useSelector } from 'react-redux';
import {
    SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_ERROR,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR } from './actions/auth';
import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR } from './actions/profile';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>;
}

export function useAuth()
{
    return useContext(AuthContext);
}

export function useProvideAuth()
{
    let user = useSelector((store) => store.access.user);

    const dispatch = useDispatch();

    const history = useHistory();

    const signIn = (email, password) =>
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

    const signOut = () =>
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

    const getUser = () =>
    {
        if (user)
            return;

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

            user = responseObj.user;
        })
        .catch(error => {
            dispatch({ type: GET_USER_ERROR });
            console.error('Get user info error:', error)
        });
    }

    if (user === undefined)
        getUser();

    return {
        user,
        getUser,
        signIn,
        signOut
    };
}
