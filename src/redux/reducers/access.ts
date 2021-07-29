import { SIGNIN_REQUEST, SIGNIN_ERROR, SIGNIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT_REQUEST, LOGOUT_ERROR } from '../actions/auth';
import { REGISTER_REQUEST, REGISTER_ERROR, REGISTER_SUCCESS } from '../actions/register';
import { GET_USER_ERROR, GET_USER_REQUEST, GET_USER_SUCCESS, PATCH_USER_ERROR, PATCH_USER_REQUEST, PATCH_USER_SUCCESS } from '../actions/profile';
import { getCookie, setCookie } from '../../utils/cookie';
import { User } from '../../types/IUser';

export interface IAccessState
{
    success: boolean;
    user: User;

    isError: boolean;
    isRequest: boolean;

    isAuth: boolean;
}

const initState: IAccessState =
{
    success: false,
    user: undefined,

    isError: false,
    isRequest: false,

    isAuth: getCookie('refreshToken') !== undefined && getCookie('refreshToken') !== ""
}

export const accessReducer = (state: IAccessState = initState, action: any): IAccessState =>
{
    switch (action.type)
    {
        case REGISTER_REQUEST:
        case SIGNIN_REQUEST:
            return { ...state, isError: false, isRequest: true, isAuth: false };

        case LOGOUT_REQUEST:
        case PATCH_USER_REQUEST:
        case GET_USER_REQUEST:
            return { ...state, isError: false, isRequest: true, isAuth: true };

        case REGISTER_ERROR:
        case SIGNIN_ERROR:
            return { ...state, isError: true, isRequest: false, isAuth: false };

        case LOGOUT_ERROR:
        case PATCH_USER_ERROR:
        case GET_USER_ERROR:
            return { ...state, isError: true, isRequest: false, isAuth: true };

        case REGISTER_SUCCESS:
        case SIGNIN_SUCCESS:
        {
            setCookie('accessToken', action.accessToken);
            setCookie('refreshToken', action.refreshToken);
            return { success: true, user: action.user, isError: false, isRequest: false, isAuth: true };
        }

        case GET_USER_SUCCESS:
        case PATCH_USER_SUCCESS:
            return { ...state, success: true, user: action.user };

        case LOGOUT_SUCCESS:
        {
            setCookie('accessToken', '');
            setCookie('refreshToken', '');
            return { ...state, success: true, isError: false, isRequest: false, user: null, isAuth: false };
        }

        default:
            return state;
    }
}