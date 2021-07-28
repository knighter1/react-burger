import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_ERROR, RESET_PASSWORD_SUCCESS } from '../actions/resetPassword';

export interface IResetPasswordState
{
    success: boolean;
    message: string;

    isError: boolean;
    isRequest: boolean;
}

const initState: IResetPasswordState = {
    success: false,
    message: '',

    isError: false,
    isRequest: false
}

export const resetPasswordReducer = (state = initState, action: any): IResetPasswordState =>
{
    switch (action.type)
    {
        case RESET_PASSWORD_REQUEST:
            return { ...state, isError: false, isRequest: true };

        case RESET_PASSWORD_SUCCESS:
            return { success: action.success, message: action.message, isError: false, isRequest: false };

        case RESET_PASSWORD_ERROR:
            return { success: false, message: '', isError: true, isRequest: false };

        default:
            return state;
    }
}