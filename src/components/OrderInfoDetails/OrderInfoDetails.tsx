import styles from './OrderInfoDetails.module.css';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import { useSelector } from 'react-redux';
import { IStore } from '../..';
import { IOrderDetailsState } from '../../redux/reducers/orderDetails';
import { formatOrderDate } from '../../redux/reducers/utils';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { orderCostReducer } from '../../redux/reducers/constructor';

export const OrderInfoDetails = (): JSX.Element => {

    const orderData: IOrderDetailsState = useSelector((store: IStore) => store.orderDetails) as IOrderDetailsState;

    const inProgressStatus = orderData.status === 'in_progress';
    const statusClassName = !inProgressStatus ? styles.completed : '';

    const cost: number = orderCostReducer(orderData.ingredients.slice(1, orderData.ingredients.length), orderData.ingredients[0]);

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
        <div className={`${styles.page} modal-сontent`}>
            <div className={`text text_type_digits-default mb-5 ${styles.center}`}>
                #{orderData.orderId}
            </div>
            <div className={`text text_type_main-medium mb-2`}>
                {orderData.name}
            </div>
            <div className={`text text_type_main-default mb-6 ${statusClassName}`}>
                {inProgressStatus ? 'В работе' : 'Выполнен'}
            </div>
            <div className={`text text_type_main-medium mt-6`}>
                Состав:
            </div>
            <div className={`mt-5 mb-3 ${styles.list}`}>
                {orderData.ingredients.map((item, index) => getItemCont(item, index))}
            </div>
            <div className={`mt-10 ${styles.bottom}`}>
                <div className={`text text_type_main-default text_color_inactive`}>
                    {formatOrderDate(orderData.date)}
                </div>
                <div className={styles.priceCont}>
                    <span className={`${styles.cost} text text_type_digits-default`}>{cost}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
}