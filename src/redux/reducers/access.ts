import { SIGNIN_REQUEST, SIGNIN_ERROR, SIGNIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/auth';
import { REGISTER_REQUEST, REGISTER_ERROR, REGISTER_SUCCESS } from '../actions/register';
import { GET_USER_SUCCESS, PATCH_USER_SUCCESS } from '../actions/profile';
import { setCookie } from '../../utils/cookie';
import { User } from '../../types/IUser';

export interface IAccessState
{
    success: boolean;
    user: User;

    isError: boolean;
    isRequest: boolean;
}

const initState: IAccessState =
{
    success: false,
    user: undefined,

    isError: false,
    isRequest: false
}

export const accessReducer = (state: IAccessState = initState, action: any): IAccessState =>
{
    switch (action.type)
    {
        case REGISTER_REQUEST:
        case SIGNIN_REQUEST:
            return { ...initState, isError: false, isRequest: true };

        case REGISTER_SUCCESS:
        case SIGNIN_SUCCESS:
        {
            setCookie('accessToken', action.accessToken);
            setCookie('refreshToken', action.refreshToken);

            return { ...action, isError: false, isRequest: false };
        }

        case REGISTER_ERROR:
        case SIGNIN_ERROR:
            return { ...state, isError: true, isRequest: false };

        case LOGOUT_SUCCESS:
            setCookie('accessToken', '');
            setCookie('refreshToken', '');

            return { ...action, isError: false, isRequest: false, user: null };

        case GET_USER_SUCCESS:
        case PATCH_USER_SUCCESS:
            return { ...state, user: action.user };

        default:
            return state;
    }
}