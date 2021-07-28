import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "../../components/IngredientDetails/IngredientDetails";
import { IngredientData } from "../../components/IngredientMenuItem/IngredientMenuItem";
import { SET_INGREDIENT } from "../../redux/actions/ingredient";
import { IStore } from "../../redux/reducers";

const IngredientPage = () =>
{
    const { id }: any = useParams();

    const dispatch = useDispatch();

    const ingredientsLib: IngredientData[] = useSelector((store: IStore) => store.ingredientsLib.items);

    const ingredient: IngredientData | undefined = ingredientsLib.find((item: IngredientData) => item._id === id);

    if (!ingredient)
        return null;

    dispatch({ type: SET_INGREDIENT, ingredientData: ingredient });

    return (
        <div>
            {ingredient && <IngredientDetails />}
        </div>
    )
}

export default IngredientPage;