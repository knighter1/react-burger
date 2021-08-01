import { IngredientData } from "../../types/IIngredientData";
import { IIngredientsLibState } from "../reducers/ingredientsLib";
import { IOrderDetailsData } from "../reducers/orderDetails";

export const SET_ORDER_DETAIL = 'SET_ORDER_DETAIL';

export const GET_ORDER_BY_ID_REQUEST = 'GET_ORDER_BY_ID_REQUEST';
export const GET_ORDER_BY_ID_SUCCESS = 'GET_ORDER_BY_ID_SUCCESS';
export const GET_ORDER_BY_ID_ERROR = 'GET_ORDER_BY_ID_ERROR';

export interface ISetOrderDetailAction {
    readonly type: typeof SET_ORDER_DETAIL;
    readonly orderData: IOrderDetailsData;
}

export interface IGetOrderByIdRequestAction {
    readonly type: typeof GET_ORDER_BY_ID_REQUEST;
}

export interface IGetOrderByIdSuccessAction {
    readonly type: typeof GET_ORDER_BY_ID_SUCCESS;
    readonly orderData: IOrderDetailsData | null;
}

export interface IGetOrderByIdErrorAction {
    readonly type: typeof GET_ORDER_BY_ID_ERROR;
}

export type TOrderDetailsActions =
    ISetOrderDetailAction |
    IGetOrderByIdRequestAction |
    IGetOrderByIdSuccessAction |
    IGetOrderByIdErrorAction;

export const setOrderDetail = (orderData: IOrderDetailsData): ISetOrderDetailAction => ({ type: SET_ORDER_DETAIL, orderData: orderData });

export const getOrderByIdRequest = (): IGetOrderByIdRequestAction => ({ type: GET_ORDER_BY_ID_REQUEST });

export const getOrderByIdSuccess = (orderData: IOrderDetailsData | null): IGetOrderByIdSuccessAction => ({ type: GET_ORDER_BY_ID_SUCCESS, orderData: orderData });

export const getOrderByIdError = (): IGetOrderByIdErrorAction => ({ type: GET_ORDER_BY_ID_ERROR });

export function getOrderById(id: number, lib: IIngredientsLibState)
{
    const END_POINT: string = `https://norma.nomoreparties.space/api/orders/${id}`;
    
    return function(dispatch: Function)
    {
        dispatch(getOrderByIdRequest());

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
            let orderData: IOrderDetailsData | null = null;
            let ingredientsIds: string[] = [];

            if (responseObj.orders?.length)
            {
                orderData = responseObj.orders[0];
                ingredientsIds = responseObj.orders[0].ingredients;

                if (orderData)
                    orderData.ingredients = ingredientsIds.filter(item => item !== null && item !== undefined).map(id => {
                        const item: IngredientData | undefined = lib.itemsById?.get(id);
                        return item;
                    }) as IngredientData[];
            }

            dispatch(getOrderByIdSuccess(orderData));
        })
        .catch(error =>
        {
            dispatch(getOrderByIdError());
            console.error(`Get order by id error: ${error}`)
        });
    }
}