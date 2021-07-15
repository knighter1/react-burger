import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import styles from './OrderListItem.module.css'
import { orderCostReducer } from '../../services/reducers/constructor';
import { formatOrderDate } from '../../services/reducers/utils';
import { useDispatch } from 'react-redux';
import { SET_ORDER_DETAIL } from '../../services/actions/order';
import { useHistory } from 'react-router';

interface IOrderListItemProps {
    name: string
    orderId: number,
    ingredients: IngredientData[];
    date: Date;
}

const OrderListItem = ({name, orderId, ingredients, date }: IOrderListItemProps) =>
{
    const cost: number = orderCostReducer(ingredients.slice(1, ingredients.length), ingredients[0]);

    const ingredientsCont = () => {

        const ingredientsCount = ingredients.length;
        const MAX_COUNT: number = 6;
        const overCount: number = Math.max(0, ingredientsCount - MAX_COUNT);

        return (
            <div className={styles.ingredintsRow}>
                {ingredients.slice(0, MAX_COUNT).map((item: IngredientData, index: number) => {
                    const style = {
                        backgroundImage: `url(${item.image_mobile})`,
                        zIndex: ingredientsCount - index
                    };
                    return <div
                        key={index}
                        style={style}
                        className={`${styles.ingredientImage} text text_type_digits-default`}>
                            {index + 1 === MAX_COUNT && overCount ? <span className={styles.overCount}>+{overCount}</span> : ""}
                    </div>;
                })}
            </div>
        );
    }

    const dispatch = useDispatch();

    const history = useHistory();

    const orderSelect = () => {
        dispatch({ type: SET_ORDER_DETAIL, ingredientData: {name, orderId, ingredients, date } });
        history.push(`/feed/${orderId}`);
    }
    
    return (
        <div className={styles.cont} onClick={() => orderSelect()}>
            <div className={styles.top}>
                <span className='text text_type_digits-default'>{`#${orderId}`}</span>
                <span className='text text_type_main-default text_color_inactive'>{formatOrderDate(date)}</span>
            </div>
            <div className={`${styles.name} text text_type_main-medium`}>
                {name}
            </div>
            <div className={styles.bottom}>
                <div>{ingredientsCont()}</div>
                <div className={styles.priceCont}>
                    <span className={`${styles.cost} text text_type_digits-default`}>{cost}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default OrderListItem;