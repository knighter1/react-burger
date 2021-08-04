import { resetPasswordReducer, initState } from './resetPassword';
import { resetPasswordRequest, resetPasswordSuccess, resetPasswordError } from '../actions/resetPassword';

describe('reset password reducer', () =>
{
    it('should handle RESET_PASSWORD_REQUEST', () =>
    {
        expect(
            resetPasswordReducer(initState, resetPasswordRequest())
        ).toEqual( { success: false, message: '', isError: false, isRequest: true } );
    });

    it('should handle RESET_PASSWORD_ERROR', () =>
    {
        expect(
            resetPasswordReducer(initState, resetPasswordError())
        ).toEqual( { success: false, message: '', isError: true, isRequest: false } );
    });

    it('should handle RESET_PASSWORD_SUCCESS', () =>
    {
        expect(
            resetPasswordReducer(initState, resetPasswordSuccess('message'))
        ).toEqual( { success: true, message: 'message', isError: false, isRequest: false } );
    });
}) 