import { GET_INGREDIENTS_LIB } from '../actions/api';

export const apiReducer = (state = [], action) =>
{
    switch (action.type)
    {
        case GET_INGREDIENTS_LIB:
            return action.data;

        default:
            return state
    }
}