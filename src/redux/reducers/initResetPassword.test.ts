import { initResetPasswordReducer, initState } from './initResetPassword';
import { INIT_RESET_PASSWORD_REQUEST, INIT_RESET_PASSWORD_ERROR, INIT_RESET_PASSWORD_SUCCESS } from '../actions/initResetPassword';

describe('init reset password reducer', () =>
{
    it('should return the initial state', () =>
    {
        expect(initResetPasswordReducer(undefined, {})).toEqual({ success: false, message: '', isError: false, isRequest: false });
    });

    it('should handle INIT_RESET_PASSWORD_REQUEST', () =>
    {
        expect(
            initResetPasswordReducer(initState, { type: INIT_RESET_PASSWORD_REQUEST })
        ).toEqual( { success: false, message: '', isError: false, isRequest: true } );
    });

    it('should handle INIT_RESET_PASSWORD_ERROR', () =>
    {
        expect(
            initResetPasswordReducer(initState, { type: INIT_RESET_PASSWORD_ERROR })
        ).toEqual( { success: false, message: '', isError: true, isRequest: false } );
    });

    it('should handle INIT_RESET_PASSWORD_SUCCESS', () =>
    {
        expect(
            initResetPasswordReducer(initState, { type: INIT_RESET_PASSWORD_SUCCESS, message: 'message', success: true })
        ).toEqual( { success: true, message: 'message', isError: false, isRequest: false } );
    });
}) 