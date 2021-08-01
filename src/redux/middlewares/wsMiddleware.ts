import { IStore } from "../reducers";

export interface IWsActions
{
    wsInit: string;
    onOpen: Function,
    onClose: Function,
    onError: Function,
    onMessage: Function
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
                    dispatch(wsActions.onOpen());
                };

                socket.onerror = event => {
                    dispatch(wsActions.onError(event));
                };

                socket.onmessage = event =>
                {
                    const { data } = event;
                    dispatch(wsActions.onMessage(data, dispatch));
                };

                socket.onclose = event => {
                    dispatch(wsActions.onClose(event));
                };
            }

            next(action);
        };
    };
}; 