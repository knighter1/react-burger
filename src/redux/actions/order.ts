import { getCookie } from "../../utils/cookie";
import { IConstructorState } from "../reducers/constructor";
import { RESET_ORDER } from "./constructor";

export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_ERROR = 'PLACE_ORDER_ERROR';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';

export function placeOrder(currentItems: IConstructorState, setOrderModalState: Function)
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

    return function(dispatch: Function)
    {
        dispatch({ type: PLACE_ORDER_REQUEST });
        
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
            dispatch({ type: PLACE_ORDER_SUCCESS, orderId: responseObj.order.number });
            dispatch({ type: RESET_ORDER });
            setOrderModalState(true);
        })
        .catch(error => {
            dispatch({ type: PLACE_ORDER_ERROR });
            console.error(`Order placing error: ${error}`)
        });
    }
}