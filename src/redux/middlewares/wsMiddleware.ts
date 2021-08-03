import { TStore } from "../reducers";

export interface WebSocketAction {
    readonly type: string;
    readonly payload?: string;
};

export interface IWsActions
{
    wsInit: string;
    onOpen: () => WebSocketAction,
    onClose: (payload: string) => WebSocketAction,
    onError: (payload: string) => WebSocketAction,
    onMessage: (payload: string, dispatch: Function) => WebSocketAction
}

interface ErrorEvent extends Event {
    message?: string;
}

export const socketMiddleware = (wsUrl: string, wsActions: IWsActions): any =>
{
    return (store: TStore) =>
    {
        let socket: WebSocket | null = null;

        return (next: Function) => (action: WebSocketAction) =>
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
                socket.onopen = () => {
                    dispatch(wsActions.onOpen());
                };

                socket.onerror = (event: ErrorEvent) => {
                    dispatch(wsActions.onError(event.message ? event.message : 'unknown error'));
                };

                socket.onmessage = (event: MessageEvent) =>
                {
                    const { data } = event;
                    dispatch(wsActions.onMessage(data, dispatch));
                };

                socket.onclose = (event: CloseEvent) => {
                    dispatch(wsActions.onClose(event.reason));
                };
            }

            next(action);
        };
    };
}; 