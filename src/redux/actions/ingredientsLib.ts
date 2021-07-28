export const GET_INGREDIENTS_LIB_REQUEST = 'GET_INGREDIENTS_LIB_REQUEST';
export const GET_INGREDIENTS_LIB_SUCCESS = 'GET_INGREDIENTS_LIB_SUCCESS';
export const GET_INGREDIENTS_LIB_ERROR = 'GET_INGREDIENTS_LIB_ERROR';

export function getIngredientsLib()
{
    const INGREDIENTS_ENDPOINT = 'https://norma.nomoreparties.space/api/ingredients';

    return function(dispatch: Function)
    {
        dispatch({ type: GET_INGREDIENTS_LIB_REQUEST });

        fetch(INGREDIENTS_ENDPOINT)
        .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(`Status ${response.status}`);
        })
        .then(responseObj => {
            dispatch({ type: GET_INGREDIENTS_LIB_SUCCESS, data: responseObj.data });
        })
        .catch(error => 
        {
            console.error(`Ingredients data receiving error: ${error}`);
            dispatch({ type: GET_INGREDIENTS_LIB_ERROR });
        });
    }
}