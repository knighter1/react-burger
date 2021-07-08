import { SIGNIN_REQUEST, SIGNIN_ERROR, SIGNIN_SUCCESS } from '../actions/auth';

export interface ISignInState
{
    success: boolean;
    accessToken: string;
    refreshToken: string;

    user: {
        email: string;
        name: string;
    };

    isError: boolean;
    isRequest: boolean;
}

const initState: ISignInState = {
    success: false,
    accessToken: '',
    refreshToken: '',

    user: {
        email: '',
        name: ''
    },

    isError: false,
    isRequest: false
}

export const signInReducer = (state = initState, action: any): ISignInState =>
{
    switch (action.type)
    {
        case SIGNIN_REQUEST:
            return { ...initState, isError: false, isRequest: true };

        case SIGNIN_SUCCESS:
            return { ...action, isError: false, isRequest: false };

        case SIGNIN_ERROR:
            return { ...state, isError: true, isRequest: false };

        default:
            return state;
    }
}