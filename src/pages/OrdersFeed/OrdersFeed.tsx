import styles from './OrdersFeed.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import { OrdersList } from '../../components/OrdersList/OrdersList';
import { OrdersStat } from '../../components/OrdersStat/OrdersStat';
import { FC, useEffect } from 'react';
import { feedWsConnectionStart } from '../../redux/actions/feedWsActions';
import { useDispatch, useSelector } from '../../hooks';

export const OrdersFeedPage: FC = () =>
{
    const dispatch = useDispatch();

    const feed = useSelector(store => store.feedWs.feed);

    useEffect(() => {
        dispatch(feedWsConnectionStart());
    }, [dispatch]);

    return (
        <div className={styles.page}>
            <OrdersList caption='Лента заказов' type='small' feed={feed} />
            <OrdersStat />
        </div>
    )
}