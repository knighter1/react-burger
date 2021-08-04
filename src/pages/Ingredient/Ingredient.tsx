import { FC } from "react";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "../../components/IngredientDetails/IngredientDetails";
import { useDispatch, useSelector } from "../../hooks";
import { setIngredient } from "../../redux/actions/ingredient";
import { IngredientData } from "../../types/IIngredientData";

interface IngredientId {
    id: string
}

export const IngredientPage: FC = () =>
{
    const { id } = useParams<IngredientId>();

    const dispatch = useDispatch();

    const ingredientsLib = useSelector(store => store.ingredientsLib.items);

    const ingredient: IngredientData | undefined = ingredientsLib.find((item: IngredientData) => item._id === id);

    if (!ingredient)
        return null;

    dispatch(setIngredient(ingredient));

    return (
        <div>
            {ingredient && <IngredientDetails />}
        </div>
    )
}