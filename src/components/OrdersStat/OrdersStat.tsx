import styles from './OrdersStat.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { IOrdersFeed, IOrderData } from '../../types/IOrderData';
import { useEffect, useState } from 'react';
import { IStore } from '../../redux/reducers';

const OrdersStat = () =>
{
    const MAX_ORDERS_COUNT: number = 16;

    const [completedOrders, setCompletedOrders]: any = useState([]);
    const [prcessingOrders, setPrcessingOrders]: any = useState([]);

    const feed: IOrdersFeed | null = useSelector((store: IStore) => store.feedWs.feed);

    useEffect(() => {
        const completed = feed?.orders.map((order: IOrderData) => order.status === 'done' ? order.number : null );
        setCompletedOrders(completed?.slice(0, MAX_ORDERS_COUNT));
        
        const processing = feed?.orders.map((order: IOrderData) => order.status !== 'done' ? order.number : null );
        setPrcessingOrders(processing?.slice(0, MAX_ORDERS_COUNT));
    }, [feed?.orders]);

    return (
        <section className={`${styles.section}  ml-10`}>
            <div className='text text_type_main-large pt-10 pb-5'>Статистика</div>
            <div className={styles.statOper}>
                <div className={styles.statOperCol}>
                    <div className='text text_type_main-medium'>Готовы:</div>
                    <div className={styles.statOrderList}>
                        
                        { completedOrders?.map((orderId: string, index: number) => (
                            <div key={index} className={`text text_type_digits-default mt-2 ${styles.completedOrder}`}>{orderId}</div>
                        )) }
                    </div>
                </div>
                <div className={styles.statOperCol}>
                    <div className='text text_type_main-medium'>В работе:</div>
                    <div className={styles.statOrderList}>
                        { prcessingOrders?.map((orderId: string, index: number) => (
                            <div key={index} className={`text text_type_digits-default mt-2`}>{orderId}</div>
                        )) }
                    </div>
                </div>
            </div>
            <div className={styles.statCont}>
                <span className='text text_type_main-medium'>
                    Выполнено за все время:
                </span>
                <div className={`text text_type_digits-large ${styles.digitsLarge}`}>{feed?.total}</div>
            </div>
            <div className={styles.statCont}>
                <span className='text text_type_main-medium'>
                    Выполнено за сегодня:
                </span>
                <div className={`text text_type_digits-large ${styles.digitsLarge}`}>{feed?.totalToday}</div>
            </div>
        </section>   
    )
}

export default OrdersStat;