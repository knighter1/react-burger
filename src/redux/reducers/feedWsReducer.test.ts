import { feedWsReducer, initialState } from './feedWsReducer';
import { FEED_WS_CONNECTION_START, FEED_WS_CONNECTION_CLOSED, FEED_WS_CONNECTION_ERROR, FEED_WS_CONNECTION_SUCCESS, FEED_WS_GET_MESSAGE } from '../actions/feedWsActions';

describe('orders feed websocket reducer', () =>
{
    it('should return the initial state', () =>
    {
        expect(feedWsReducer(undefined, {})).toEqual({ wsConnected: false, error: null, feed: null });
    });

    it('should handle FEED_WS_CONNECTION_START', () =>
    {
        expect(
            feedWsReducer(initialState, { type: FEED_WS_CONNECTION_START })
        ).toEqual(initialState);
    });

    it('should handle FEED_WS_CONNECTION_SUCCESS', () =>
    {
        expect(
            feedWsReducer(initialState, { type: FEED_WS_CONNECTION_SUCCESS })
        ).toEqual({ wsConnected: true, error: null, feed: null });
    });

    it('should handle FEED_WS_CONNECTION_CLOSED', () =>
    {
        expect(
            feedWsReducer({ ...initialState, wsConnected: true }, { type: FEED_WS_CONNECTION_CLOSED })
        ).toEqual({ wsConnected: false, error: null, feed: null });
    });

    it('should handle FEED_WS_CONNECTION_ERROR', () =>
    {
        expect(
            feedWsReducer({ ...initialState, wsConnected: true }, { type: FEED_WS_CONNECTION_ERROR, payload: 'error' })
        ).toEqual({ wsConnected: false, error: 'error', feed: null });
    });

    it('should handle FEED_WS_CONNECTION_ERROR', () =>
    {
        expect(
            feedWsReducer({ ...initialState, wsConnected: true }, { type: FEED_WS_GET_MESSAGE, payload: '{"success":true,"orders":[],"total":1255,"totalToday":36}' })
        ).toEqual({ wsConnected: true, error: null, feed: { success: true, orders: [], total: 1255, totalToday: 36 }});
    });
}) 