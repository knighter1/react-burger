import { userWsReducer, initialState } from './userWsReducer';
import { USER_WS_GET_MESSAGE, userWsConnectionError, userWsConnectionSuccess, userWsConnectionClosed, userWsConnectionStart } from '../actions/userWsActions';

describe('orders feed websocket reducer', () =>
{
    it('should handle USER_WS_CONNECTION_START', () =>
    {
        expect(
            userWsReducer(initialState, userWsConnectionStart(''))
        ).toEqual(initialState);
    });

    it('should handle USER_WS_CONNECTION_SUCCESS', () =>
    {
        expect(
            userWsReducer(initialState, userWsConnectionSuccess())
        ).toEqual({ wsConnected: true, error: null, feed: null });
    });

    it('should handle USER_WS_CONNECTION_CLOSED', () =>
    {
        expect(
            userWsReducer({ ...initialState, wsConnected: true }, userWsConnectionClosed())
        ).toEqual({ wsConnected: false, error: null, feed: null });
    });

    it('should handle USER_WS_CONNECTION_ERROR', () =>
    {
        expect(
            userWsReducer({ ...initialState, wsConnected: true }, userWsConnectionError('error'))
        ).toEqual({ wsConnected: false, error: 'error', feed: null });
    });

    it('should handle USER_WS_GET_MESSAGE', () =>
    {
        expect(
            userWsReducer({ ...initialState, wsConnected: true }, { type: USER_WS_GET_MESSAGE, payload: '{"success":true,"orders":[],"total":1255,"totalToday":36}', dispatch: () => {} })
        ).toEqual({ wsConnected: true, error: null, feed: { success: true, orders: [], total: 1255, totalToday: 36 }});

        expect(
            userWsReducer({ ...initialState, wsConnected: true }, { type: USER_WS_GET_MESSAGE, payload: '{"message":"Invalid or missing token"}', dispatch: () => {} })
        ).toEqual({ wsConnected: true, error: 'Invalid or missing token', feed: null });
    });
}) 