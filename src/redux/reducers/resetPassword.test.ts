import { resetPasswordReducer, initState } from './resetPassword';
import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_ERROR, RESET_PASSWORD_SUCCESS } from '../actions/resetPassword';

describe('reset password reducer', () =>
{
    it('should return the initial state', () =>
    {
        expect(resetPasswordReducer(undefined, {})).toEqual({ success: false, message: '', isError: false, isRequest: false });
    });

    it('should handle RESET_PASSWORD_REQUEST', () =>
    {
        expect(
            resetPasswordReducer(initState, { type: RESET_PASSWORD_REQUEST })
        ).toEqual( { success: false, message: '', isError: false, isRequest: true } );
    });

    it('should handle RESET_PASSWORD_ERROR', () =>
    {
        expect(
            resetPasswordReducer(initState, { type: RESET_PASSWORD_ERROR })
        ).toEqual( { success: false, message: '', isError: true, isRequest: false } );
    });

    it('should handle RESET_PASSWORD_SUCCESS', () =>
    {
        expect(
            resetPasswordReducer(initState, { type: RESET_PASSWORD_SUCCESS, message: 'message', success: true })
        ).toEqual( { success: true, message: 'message', isError: false, isRequest: false } );
    });
}) 