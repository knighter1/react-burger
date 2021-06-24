import styles from './IngredientsList.module.css';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import IngredientsListItem from '../IngredientsListItem/IngredientsListItem';

interface IIngredientsListProps
{
    items: IngredientData[];
}

const IngredientsList = ({ items }: IIngredientsListProps) =>
{
    return (
        <div className={`${styles.list} pl-4 pr-2`}>
            {
                items.map((item, index) => {
                    return <IngredientsListItem key={item._id + index.toString()} data={item} />
                })
            }
        </div>
    )
}

export default IngredientsList;