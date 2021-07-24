import { IStore } from "../..";
import { WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE } from "../actions/wsActions";

export const socketMiddleware = (wsUrl: string): any =>
{
    return (store: IStore) =>
    {
        let socket: WebSocket | null = null;

        return (next: any) => (action: any) =>
        {
            const { dispatch }: any = store;
            const { type } = action;

            if (type === WS_CONNECTION_START) {
                socket = new WebSocket(wsUrl);
            }

            if (socket)
            {
                socket.onopen = event => {
                    dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: WS_CONNECTION_ERROR, payload: event });
                };

                socket.onmessage = event =>
                {
                    const { data } = event;
                    dispatch({ type: WS_GET_MESSAGE, payload: data });
                };

                socket.onclose = event => {
                    dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
                };
            }

            next(action);
        };
    };
}; 