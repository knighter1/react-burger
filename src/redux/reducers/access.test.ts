import { accessReducer } from './access';
import {
        SIGNIN_REQUEST, SIGNIN_ERROR, SIGNIN_SUCCESS,
        LOGOUT_REQUEST, LOGOUT_ERROR, LOGOUT_SUCCESS } from '../actions/auth';
import { REGISTER_REQUEST, REGISTER_ERROR, REGISTER_SUCCESS } from '../actions/register';
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

    it('should return the initial state', () =>
    {
        expect(accessReducer(undefined, {})).toEqual(initState);
    });

    const request = (action: string) =>
    {
        it(`should handle ${action}`, () =>
        {
            expect(
                accessReducer(undefined, { type: action })
            ).toEqual({ success: false, user: undefined, isError: false, isRequest: true, isAuth: false });
        });
    }

    request(REGISTER_REQUEST);
    request(SIGNIN_REQUEST);

    const request2 = (action: string) =>
    {
        it(`should handle ${action}`, () =>
        {
            expect(
                accessReducer({ ...initState, user, isAuth: true }, { type: action })
            ).toEqual({ success: false, user: user, isError: false, isRequest: true, isAuth: true });
        });
    }

    request2(GET_USER_REQUEST);
    request2(LOGOUT_REQUEST);
    request2(PATCH_USER_REQUEST);

    const error = (action: string) =>
    {
        it(`should handle ${action}`, () =>
        {
            expect(
                accessReducer(undefined, { type: action })
            ).toEqual({ success: false, user: undefined, isError: true, isRequest: false, isAuth: false });
        });
    }

    error(REGISTER_ERROR);
    error(SIGNIN_ERROR);

    const error2 = (action: string) =>
    {
        it(`should handle ${action}`, () =>
        {
            expect(
                accessReducer({ ...initState, user: user, isAuth: true }, { type: action })
            ).toEqual({ success: false, user: user, isError: true, isRequest: false, isAuth: true });
        });
    }

    error2(GET_USER_ERROR);
    error2(LOGOUT_ERROR);
    error2(PATCH_USER_ERROR);

    const success = (action: string) =>
    {
        it(`should handle ${action}`, () =>
        {
            const accessToken = "Bearer eyJhbGciOiJIUzI1";
            const refreshToken = "6d831a732853d562290877";

            expect(
                accessReducer(initState, { type: action, user: user, success: true, accessToken: accessToken, refreshToken: refreshToken })
            ).toEqual({ success: true, user: user, isError: false, isRequest: false, isAuth: true });
        });
    }

    success(REGISTER_SUCCESS);
    success(SIGNIN_SUCCESS);

    it(`should handle GET_USER_SUCCESS`, () =>
    {
        expect(
            accessReducer({ ...initState, isAuth: true }, { type: GET_USER_SUCCESS, user: user, success: true })
        ).toEqual({ success: true, user: user, isError: false, isRequest: false, isAuth: true });
    });

    it(`should handle PATCH_USER_SUCCESS`, () =>
    {
        expect(
            accessReducer({ ...initState, user: user, isAuth: true }, { type: PATCH_USER_SUCCESS, user: user, success: true })
        ).toEqual({ success: true, user: user, isError: false, isRequest: false, isAuth: true });
    });

    it(`should handle LOGOUT_SUCCESS`, () =>
    {
        expect(
            accessReducer({ ...initState, user: user, isAuth: true }, { type: LOGOUT_SUCCESS, user: user, success: true })
        ).toEqual({ success: true, user: null, isError: false, isRequest: false, isAuth: false });
    });    
}) 