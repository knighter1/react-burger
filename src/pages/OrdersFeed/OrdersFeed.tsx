import styles from './OrdersFeed.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import OrdersList from '../../components/OrdersList/OrdersList';
import OrdersStat from '../../components/OrdersStat/OrdersStat';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { WS_CONNECTION_START } from '../../redux/actions/wsActions';

const OrdersFeedPage = () =>
{
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });
    }, [dispatch]);

    return (
        <div className={styles.page}>
            <OrdersList caption='Лента заказов' type='small' />
            <OrdersStat />
        </div>
    )
}

export default OrdersFeedPage;