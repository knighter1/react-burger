import { feedWsReducer, initialState } from './feedWsReducer';
import { feedWsConnectionSuccess, feedWsConnectionError, feedWsConnectionClosed, feedWsGetMessage, feedWsConnectionStart } from '../actions/feedWsActions';

describe('orders feed websocket reducer', () =>
{
    it('should handle FEED_WS_CONNECTION_START', () =>
    {
        expect(
            feedWsReducer(initialState, feedWsConnectionStart())
        ).toEqual(initialState);
    });

    it('should handle FEED_WS_CONNECTION_SUCCESS', () =>
    {
        expect(
            feedWsReducer(initialState, feedWsConnectionSuccess())
        ).toEqual({ wsConnected: true, error: null, feed: null });
    });

    it('should handle FEED_WS_CONNECTION_CLOSED', () =>
    {
        expect(
            feedWsReducer({ ...initialState, wsConnected: true }, feedWsConnectionClosed())
        ).toEqual({ wsConnected: false, error: null, feed: null });
    });

    it('should handle FEED_WS_CONNECTION_ERROR', () =>
    {
        expect(
            feedWsReducer({ ...initialState, wsConnected: true }, feedWsConnectionError('error'))
        ).toEqual({ wsConnected: false, error: 'error', feed: null });
    });

    it('should handle FEED_WS_CONNECTION_MESSAGE', () =>
    {
        expect(
            feedWsReducer({ ...initialState, wsConnected: true }, feedWsGetMessage('{"success":true,"orders":[],"total":1255,"totalToday":36}'))
        ).toEqual({ wsConnected: true, error: null, feed: { success: true, orders: [], total: 1255, totalToday: 36 }});
    });
}) 