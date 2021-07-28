import { IStore } from "../reducers";

export interface IWsActions
{
    wsInit: string;
    onOpen: string,
    onClose: string,
    onError: string,
    onMessage: string
}

export const socketMiddleware = (wsUrl: string, wsActions: IWsActions): any =>
{
    return (store: IStore) =>
    {
        let socket: WebSocket | null = null;

        return (next: any) => (action: any) =>
        {
            const { dispatch }: any = store;
            const { type, payload } = action;

            if (type === wsActions.wsInit) {
                let url = wsUrl;
                if (payload)
                    url += '?token=' + payload;

                socket = new WebSocket(url);
            }

            if (socket)
            {
                socket.onopen = event => {
                    dispatch({ type: wsActions.onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: wsActions.onError, payload: event });
                };

                socket.onmessage = event =>
                {
                    const { data } = event;
                    dispatch({ type: wsActions.onMessage, payload: data, dispatch: dispatch });
                };

                socket.onclose = event => {
                    dispatch({ type: wsActions.onClose, payload: event });
                };
            }

            next(action);
        };
    };
}; 