import '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { IngredientData } from '../../components/IngredientMenuItem/IngredientMenuItem';
import { orderCostReducer } from '../../services/reducers/constructor';
import { formatOrderDate } from '../../services/reducers/utils';
import styles from './OrderDetail.module.css';
import { IStore } from '../..';
import { useHistory } from 'react-router';

const OrderDetailPage = () =>
{
    const { orderId, name, ingredients, date, status } = useSelector((store: IStore) => store.orderDetails);

    const history = useHistory();

    if (!orderId)
        history.replace('/feed');

    const inProgressStatus = status === 'in_progress';
    const statusClassName = !inProgressStatus ? styles.completed : '';

    const cost: number = orderCostReducer(ingredients.slice(1, ingredients.length), ingredients[0]);

    const getItemCont = (item: IngredientData, index: number) => {
        
        const style = {
            backgroundImage: `url(${item.image_mobile})`
        };
        
        return (
            <div key={index} className={styles.itemCont}>
                <div className={styles.leftItemCont}>
                    <div style={style} className={styles.ingredientImage}>
                    </div>
                    <div className={`text text_type_main-default ml-4 pt-8 ${styles.nameCont}`}>
                        <span className={styles.name}>{item.name}</span>
                    </div>
                </div>
                <div className={styles.rightItemCont}>
                    <div className={styles.itemPrice}>{item.price}</div>
                    <div ><CurrencyIcon type='primary' /></div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={`text text_type_digits-default mb-5 ${styles.center}`}>
                #{orderId}
            </div>
            <div className={`text text_type_main-medium mb-2`}>
                {name}
            </div>
            <div className={`text text_type_main-default mb-6 ${statusClassName}`}>
                {inProgressStatus ? 'В работе' : 'Выполнен'}
            </div>
            <div className={`text text_type_main-medium mt-6`}>
                Состав:
            </div>
            <div className={`mt-5 mb-3 ${styles.list}`}>
                {ingredients.map((item, index) => getItemCont(item, index))}
            </div>
            <div className={`mt-10 ${styles.bottom}`}>
                <div className={`text text_type_main-default text_color_inactive`}>
                    {formatOrderDate(date)}
                </div>
                <div className={styles.priceCont}>
                    <span className={`${styles.cost} text text_type_digits-default`}>{cost}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default OrderDetailPage;