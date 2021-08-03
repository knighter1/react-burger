import { useParams } from "react-router-dom";
import { IngredientDetails } from "../../components/IngredientDetails/IngredientDetails";
import { setIngredient } from "../../redux/actions/ingredient";
import { useDispatch, useSelector } from "../../redux/reducers";
import { IngredientData } from "../../types/IIngredientData";

interface IngredientId {
    id: string
}

const IngredientPage = () =>
{
    const { id } = useParams<IngredientId>();

    const dispatch = useDispatch();

    const ingredientsLib: IngredientData[] = useSelector(store => store.ingredientsLib.items);

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

export default IngredientPage;