import { INIT_RESET_PASSWORD_REQUEST, INIT_RESET_PASSWORD_ERROR, INIT_RESET_PASSWORD_SUCCESS, TInitResetPasswordActions } from '../actions/initResetPassword';

export interface IInitResetPasswordState
{
    success: boolean;
    message: string;

    isError: boolean;
    isRequest: boolean;
}

export const initState: IInitResetPasswordState =
{
    success: false,
    message: '',

    isError: false,
    isRequest: false
}

export const initResetPasswordReducer = (state = initState, action: TInitResetPasswordActions): IInitResetPasswordState =>
{
    switch (action.type)
    {
        case INIT_RESET_PASSWORD_REQUEST:
            return { ...state, isError: false, isRequest: true };

        case INIT_RESET_PASSWORD_SUCCESS:
            return { success: true, message: action.message, isError: false, isRequest: false };

        case INIT_RESET_PASSWORD_ERROR:
            return { success: false, message: '', isError: true, isRequest: false };

        default:
            return state;
    }
}