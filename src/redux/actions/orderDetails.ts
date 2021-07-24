import { IngredientData } from "../../components/IngredientMenuItem/IngredientMenuItem";
import { IIngredientsLibState } from "../reducers/ingredientsLib";
import { IOrderDetailsState } from "../reducers/orderDetails";

export const SET_ORDER_DETAIL = 'SET_ORDER_DETAIL';

export const GET_ORDER_BY_ID_REQUEST = 'GET_ORDER_BY_ID_REQUEST';
export const GET_ORDER_BY_ID_SUCCESS = 'GET_ORDER_BY_ID_SUCCESS';
export const GET_ORDER_BY_ID_ERROR = 'GET_ORDER_BY_ID_ERROR';

export function getOrderById(id: number, lib: IIngredientsLibState)
{
    const END_POINT: string = `https://norma.nomoreparties.space/api/orders/${id}`;
    
    return function(dispatch: Function)
    {
        dispatch({ type: GET_ORDER_BY_ID_REQUEST });

        fetch(END_POINT,
        {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(response =>
        {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Status ${response.status}`);
        })
        .then(responseObj =>
        {
            let orderData: IOrderDetailsState | null = null;
            let ingredientsIds: string[] = [];

            if (responseObj.orders?.length)
            {
                orderData = responseObj.orders[0];
                ingredientsIds = responseObj.orders[0].ingredients;

                if (orderData)
                    orderData.ingredients = ingredientsIds.map(id => {
                        const item: IngredientData | undefined = lib.itemsById?.get(id);
                        return item;
                    }) as IngredientData[];
            }

            dispatch({ type: SET_ORDER_DETAIL, orderData: orderData });
        })
        .catch(error =>
        {
            dispatch({ type: GET_ORDER_BY_ID_ERROR });
            console.error(`Get order by id error: ${error}`)
        });
    }
}