import styles from './OrderDetails.module.css';
import orderDoneImg from '../../images/order_done.png';
import { useSelector } from '../../hooks';
import { ReactElement } from 'react';

export const OrderDetails = (): ReactElement =>
{
    const orderId: number = useSelector(store => store.order.orderId);

    let content;
    if (orderId)
        content = (
            <>
                <div className={`${styles.orderId} text text_type_digits-large pt-30`}>
                    <span>{orderId}</span>
                </div>
                <div className="text text_type_main-medium mt-8">идентификатор заказа</div>
                <img className="mt-15" src={orderDoneImg} alt="Заказ размещен" />
                <div className="text text_type_main-default mt-15">Ваш заказ начали готовить</div>
                <div className="text text_type_main-default text_color_inactive mt-2 mb-30">Дождитесь готовности на орбитальной станции</div>
            </>);
    else
        content = (
            <>
                <div className={`text text_type_main-large ${styles.forming}`}>Формирование заказа</div>
                <div className={`text text_type_main-medium ${styles.forming}`}>Ожидайте...</div>
            </>
        )

    return (
        <div className={`${styles.orderDetail} modal-сontent`}>
            {content}
        </div>
    );
}