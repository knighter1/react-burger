import { userWsReducer, initialState } from './userWsReducer';
import { USER_WS_CONNECTION_START, USER_WS_CONNECTION_CLOSED, USER_WS_CONNECTION_ERROR, USER_WS_CONNECTION_SUCCESS, USER_WS_GET_MESSAGE } from '../actions/userWsActions';

describe('orders feed websocket reducer', () =>
{
    it('should return the initial state', () =>
    {
        expect(userWsReducer(undefined, {})).toEqual({ wsConnected: false, error: null, feed: null });
    });

    it('should handle USER_WS_CONNECTION_START', () =>
    {
        expect(
            userWsReducer(initialState, { type: USER_WS_CONNECTION_START })
        ).toEqual(initialState);
    });

    it('should handle USER_WS_CONNECTION_SUCCESS', () =>
    {
        expect(
            userWsReducer(initialState, { type: USER_WS_CONNECTION_SUCCESS })
        ).toEqual({ wsConnected: true, error: null, feed: null });
    });

    it('should handle USER_WS_CONNECTION_CLOSED', () =>
    {
        expect(
            userWsReducer({ ...initialState, wsConnected: true }, { type: USER_WS_CONNECTION_CLOSED })
        ).toEqual({ wsConnected: false, error: null, feed: null });
    });

    it('should handle USER_WS_CONNECTION_ERROR', () =>
    {
        expect(
            userWsReducer({ ...initialState, wsConnected: true }, { type: USER_WS_CONNECTION_ERROR, payload: 'error' })
        ).toEqual({ wsConnected: false, error: 'error', feed: null });
    });

    it('should handle USER_WS_GET_MESSAGE', () =>
    {
        expect(
            userWsReducer({ ...initialState, wsConnected: true }, { type: USER_WS_GET_MESSAGE, payload: '{"success":true,"orders":[],"total":1255,"totalToday":36}' })
        ).toEqual({ wsConnected: true, error: null, feed: { success: true, orders: [], total: 1255, totalToday: 36 }});

        expect(
            userWsReducer({ ...initialState, wsConnected: true }, { type: USER_WS_GET_MESSAGE, payload: '{"message":"Invalid or missing token"}' })
        ).toEqual({ wsConnected: true, error: 'Invalid or missing token', feed: null });
    });
}) 