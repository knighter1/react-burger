import { REGISTER_REQUEST, REGISTER_ERROR, REGISTER_SUCCESS } from '../actions/auth';
import { ISignInState } from './signin';

export type IRegisterState = ISignInState

const initState: IRegisterState = {
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

export const registerReducer = (state = initState, action: any): IRegisterState =>
{
    switch (action.type)
    {
        case REGISTER_REQUEST:
            return { ...initState, isError: false, isRequest: true };

        case REGISTER_SUCCESS:
            return { ...action, isError: false, isRequest: false };

        case REGISTER_ERROR:
            return { ...state, isError: true, isRequest: false };

        default:
            return state;
    }
}