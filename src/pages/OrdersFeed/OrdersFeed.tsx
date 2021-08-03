import styles from './OrdersFeed.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import { OrdersList } from '../../components/OrdersList/OrdersList';
import { OrdersStat } from '../../components/OrdersStat/OrdersStat';
import { ReactElement, useEffect } from 'react';
import { feedWsConnectionStart } from '../../redux/actions/feedWsActions';
import { IOrdersFeed } from '../../types/IOrderData';
import { useDispatch, useSelector } from '../../redux/reducers';

export const OrdersFeedPage = (): ReactElement =>
{
    const dispatch = useDispatch();

    const feed: IOrdersFeed | null = useSelector(store => store.feedWs.feed);

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