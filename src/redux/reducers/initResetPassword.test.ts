import { initResetPasswordReducer, initState } from './initResetPassword';
import { initResetPasswordRequest, initResetPasswordSuccess, initResetPasswordError } from '../actions/initResetPassword';

describe('init reset password reducer', () =>
{
     it('should handle INIT_RESET_PASSWORD_REQUEST', () =>
    {
        expect(
            initResetPasswordReducer(initState, initResetPasswordRequest())
        ).toEqual( { success: false, message: '', isError: false, isRequest: true } );
    });

    it('should handle INIT_RESET_PASSWORD_ERROR', () =>
    {
        expect(
            initResetPasswordReducer(initState, initResetPasswordError())
        ).toEqual( { success: false, message: '', isError: true, isRequest: false } );
    });

    it('should handle INIT_RESET_PASSWORD_SUCCESS', () =>
    {
        expect(
            initResetPasswordReducer(initState, initResetPasswordSuccess('message'))
        ).toEqual( { success: true, message: 'message', isError: false, isRequest: false } );
    });
}) 