import styles from './OrderDetails.module.css';
import orderDoneImg from '../../images/order_done.png';

interface IOrderDetailsProps
{
    orderId: string;
}

export const OrderDetails = ({ orderId }: IOrderDetailsProps): JSX.Element =>
{
    return (
        <div className={`${styles.orderDetail} modal-сontent`}>
            <div className={`${styles.orderId} text text_type_digits-large pt-30`}>
                <span>{orderId}</span>
            </div>
            <div className="text text_type_main-medium mt-8">идентификатор заказа</div>
            <img className="mt-15" src={orderDoneImg} alt="Заказ размещен" />
            <div className="text text_type_main-default mt-15">Ваш заказ начали готовить</div>
            <div className="text text_type_main-default text_color_inactive mt-2 mb-30">Дождитесь готовности на орбитальной станции</div>
        </div>
    );
}