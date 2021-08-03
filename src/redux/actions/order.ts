import { getCookie } from "../../utils/cookie";
import { AppDispatch, AppThunk } from "../reducers";
import { IConstructorState } from "../reducers/constructor";
import { resetOrder } from "./constructor";

export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_ERROR = 'PLACE_ORDER_ERROR';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';

export interface IPlaceOrderRequestAction {
    readonly type: typeof PLACE_ORDER_REQUEST;
}

export interface IPlaceOrderErrorAction {
    readonly type: typeof PLACE_ORDER_ERROR;
}

export interface IPlaceOrderSuccessAction {
    readonly type: typeof PLACE_ORDER_SUCCESS;
    readonly orderId: number;
}

export type TPlaceOrderActions =
    IPlaceOrderRequestAction |
    IPlaceOrderErrorAction |
    IPlaceOrderSuccessAction;

export const placeOrderRequest = (): IPlaceOrderRequestAction => ({ type: PLACE_ORDER_REQUEST });

export const placeOrderError = (): IPlaceOrderErrorAction => ({ type: PLACE_ORDER_ERROR });

export const placeOrderSuccess = (orderId: number): IPlaceOrderSuccessAction => ({ type: PLACE_ORDER_SUCCESS, orderId: orderId });

export const placeOrder: AppThunk = (currentItems: IConstructorState, setOrderModalState: (state: boolean) => void) => (dispatch: AppDispatch) =>
{
    const PLACE_ORDER_ENDPOINT = 'https://norma.nomoreparties.space/api/orders';

    const getFullIngredients = () => {
        const items = [];
        
        if (currentItems.items)
            items.push(...currentItems.items);

        if (currentItems.bun)
            items.push(currentItems.bun, currentItems.bun);

        return items;
    }

    dispatch(placeOrderRequest());
    
    let accessToken = getCookie('accessToken');
    if (!accessToken)
        accessToken = '';

    setOrderModalState(true);

    fetch(PLACE_ORDER_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify({ingredients: getFullIngredients()})
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Status ${response.status}`);
    })
    .then(responseObj => {
        const orderId: number = responseObj.order.number;
        dispatch(placeOrderSuccess(orderId));
        dispatch(resetOrder());
        setOrderModalState(true);
    })
    .catch(error => {
        dispatch(placeOrderError());
        console.error(`Order placing error: ${error}`)
    });
}