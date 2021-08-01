import { IngredientData } from "../../types/IIngredientData";

export const GET_INGREDIENTS_LIB_REQUEST = 'GET_INGREDIENTS_LIB_REQUEST';
export const GET_INGREDIENTS_LIB_SUCCESS = 'GET_INGREDIENTS_LIB_SUCCESS';
export const GET_INGREDIENTS_LIB_ERROR = 'GET_INGREDIENTS_LIB_ERROR';

export interface IGetIngredientsLibRequestAction {
    readonly type: typeof GET_INGREDIENTS_LIB_REQUEST;
}

export interface IGetIngredientsLibSuccessAction {
    readonly type: typeof GET_INGREDIENTS_LIB_SUCCESS;
    readonly data: IngredientData[];
}

export interface IGetIngredientsLibErrorAction {
    readonly type: typeof GET_INGREDIENTS_LIB_ERROR;
}

export type TGetIngredientsLibActions =
    IGetIngredientsLibRequestAction |
    IGetIngredientsLibSuccessAction |
    IGetIngredientsLibErrorAction;

export const getIngredientsLibRequest = (): IGetIngredientsLibRequestAction => ({ type: GET_INGREDIENTS_LIB_REQUEST });

export const getIngredientsLibSuccess = (data: IngredientData[]): IGetIngredientsLibSuccessAction => ({ type: GET_INGREDIENTS_LIB_SUCCESS, data: data });

export const getIngredientsLibError = (): IGetIngredientsLibErrorAction => ({ type: GET_INGREDIENTS_LIB_ERROR });

export function getIngredientsLib()
{
    const INGREDIENTS_ENDPOINT = 'https://norma.nomoreparties.space/api/ingredients';

    return function(dispatch: Function)
    {
        dispatch(getIngredientsLibRequest());

        fetch(INGREDIENTS_ENDPOINT)
        .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(`Status ${response.status}`);
        })
        .then(responseObj => {
            dispatch(getIngredientsLibSuccess(responseObj.data));
        })
        .catch(error => 
        {
            console.error(`Ingredients data receiving error: ${error}`);
            dispatch(getIngredientsLibError());
        });
    }
}