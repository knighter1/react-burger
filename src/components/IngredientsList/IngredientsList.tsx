import styles from './IngredientsList.module.css';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import IngredientsListItem from '../IngredientsListItem/IngredientsListItem';

interface IIngredientsListProps
{
    items: IngredientData[];
    onRemoveItemHandle: (id: string) => void;
}

const IngredientsList = ({ items, onRemoveItemHandle }: IIngredientsListProps) =>
{
    return (
        <div className={`${styles.list} pl-4 pr-2`}>
            {
                items.map((item) => {
                    return <IngredientsListItem key={item._id} data={item} />
                })
            }
        </div>
    )
}

export default IngredientsList;