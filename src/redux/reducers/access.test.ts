import { accessReducer } from './access';
import {
        signInRequest, signInSuccess, signInError, logoutRequest, logoutSuccess, logoutError } from '../actions/auth';
import { registerRequest, registerSuccess, registerError } from '../actions/register';
import {
    GET_USER_REQUEST, GET_USER_ERROR, GET_USER_SUCCESS,
    PATCH_USER_REQUEST, PATCH_USER_ERROR, PATCH_USER_SUCCESS } from '../actions/profile';
import { User } from '../../types/IUser';

describe('access reducer', () =>
{
    const user: User =
    {
        name: 'name',
        email: 'email'
    };

    const initState =
    {
        success: false,
        user: undefined,

        isError: false,
        isRequest: false,

        isAuth: false
    }

    it(`should handle SIGNIN_REQUEST`, () =>
    {
        expect(
            accessReducer(undefined, signInRequest())
        ).toEqual({ success: false, user: undefined, isError: false, isRequest: true, isAuth: false });
    });

    it(`should handle REGISTER_REQUEST`, () =>
    {
        expect(
            accessReducer(undefined, registerRequest())
        ).toEqual({ success: false, user: undefined, isError: false, isRequest: true, isAuth: false });
    });

    it(`should handle GET_USER_REQUEST`, () =>
    {
        expect(
            accessReducer({ ...initState, user, isAuth: true }, { type: GET_USER_REQUEST })
        ).toEqual({ success: false, user: user, isError: false, isRequest: true, isAuth: true });
    });

    it(`should handle LOGOUT_REQUEST`, () =>
    {
        const refreshToken = "6d831a732853d562290877";

        expect(
            accessReducer({ ...initState, user, isAuth: true }, logoutRequest(refreshToken))
        ).toEqual({ success: false, user: user, isError: false, isRequest: true, isAuth: true });
    });

    it(`should handle PATCH_USER_REQUEST`, () =>
    {
        expect(
            accessReducer({ ...initState, user, isAuth: true }, { type: PATCH_USER_REQUEST })
        ).toEqual({ success: false, user: user, isError: false, isRequest: true, isAuth: true });
    });

    it(`should handle REGISTER_ERROR`, () =>
    {
        expect(
            accessReducer(undefined, registerError())
        ).toEqual({ success: false, user: undefined, isError: true, isRequest: false, isAuth: false });
    });

    it(`should handle SIGNIN_ERROR`, () =>
    {
        expect(
            accessReducer(undefined, signInError())
        ).toEqual({ success: false, user: undefined, isError: true, isRequest: false, isAuth: false });
    });

    it(`should handle GET_USER_ERROR`, () =>
    {
        expect(
            accessReducer({ ...initState, user: user, isAuth: true }, { type: GET_USER_ERROR })
        ).toEqual({ success: false, user: user, isError: true, isRequest: false, isAuth: true });
    });

    it(`should handle LOGOUT_ERROR`, () =>
    {
        expect(
            accessReducer({ ...initState, user: user, isAuth: true }, logoutError())
        ).toEqual({ success: false, user: user, isError: true, isRequest: false, isAuth: true });
    });

    it(`should handle PATCH_USER_ERROR`, () =>
    {
        expect(
            accessReducer({ ...initState, user: user, isAuth: true }, { type: PATCH_USER_ERROR })
        ).toEqual({ success: false, user: user, isError: true, isRequest: false, isAuth: true });
    });

    it(`should handle REGISTER_SUCCESS`, () =>
    {
        const accessToken = "Bearer eyJhbGciOiJIUzI1";
        const refreshToken = "6d831a732853d562290877";

        expect(
            accessReducer(initState, registerSuccess(accessToken, refreshToken, user))
        ).toEqual({ success: true, user: user, isError: false, isRequest: false, isAuth: true });
    });

    it(`should handle SIGNIN_SUCCESS`, () =>
    {
        const accessToken = "Bearer eyJhbGciOiJIUzI1";
        const refreshToken = "6d831a732853d562290877";

        expect(
            accessReducer(initState, signInSuccess(accessToken, refreshToken, user))
        ).toEqual({ success: true, user: user, isError: false, isRequest: false, isAuth: true });
    });

    it(`should handle GET_USER_SUCCESS`, () =>
    {
        expect(
            accessReducer({ ...initState, isAuth: true }, { type: GET_USER_SUCCESS, user: user })
        ).toEqual({ success: true, user: user, isError: false, isRequest: false, isAuth: true });
    });

    it(`should handle PATCH_USER_SUCCESS`, () =>
    {
        expect(
            accessReducer({ ...initState, user: user, isAuth: true }, { type: PATCH_USER_SUCCESS, user: user })
        ).toEqual({ success: true, user: user, isError: false, isRequest: false, isAuth: true });
    });

    it(`should handle LOGOUT_SUCCESS`, () =>
    {
        expect(
            accessReducer({ ...initState, user: user, isAuth: true }, logoutSuccess())
        ).toEqual({ success: true, user: null, isError: false, isRequest: false, isAuth: false });
    });    
}) 