import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "../../components/IngredientDetails/IngredientDetails";
import { setIngredient } from "../../redux/actions/ingredient";
import { TStore } from "../../redux/reducers";
import { IngredientData } from "../../types/IIngredientData";

const IngredientPage = () =>
{
    const { id }: any = useParams();

    const dispatch = useDispatch();

    const ingredientsLib: IngredientData[] = useSelector((store: TStore) => store.ingredientsLib.items);

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