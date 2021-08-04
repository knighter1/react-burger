import styles from './OrdersStat.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import { IOrderData } from '../../types/IOrderData';
import { FC, useEffect, useState } from 'react';
import { useSelector } from '../../hooks';

export const OrdersStat: FC = () =>
{
    const MAX_ORDERS_COUNT: number = 16;

    const [completedOrders, setCompletedOrders] = useState<number[]>([]);
    const [prcessingOrders, setPrcessingOrders] = useState<number[]>([]);

    const feed = useSelector(store => store.feedWs.feed);

    useEffect(() => {
        
        if (!feed)
            return;

        const completed = feed.orders.filter((order: IOrderData) => order.status === 'done' ).map((order: IOrderData) => order.number);
        completed && setCompletedOrders(completed.slice(0, MAX_ORDERS_COUNT));
        
        const processing = feed.orders.filter((order: IOrderData) => order.status !== 'done').map((order: IOrderData) => order.number);
        processing && setPrcessingOrders(processing.slice(0, MAX_ORDERS_COUNT));
    }, [feed]);

    return (
        <section className={`${styles.section}  ml-10`}>
            <div className='text text_type_main-large pt-10 pb-5'>Статистика</div>
            <div className={styles.statOper}>
                <div className={styles.statOperCol}>
                    <div className='text text_type_main-medium'>Готовы:</div>
                    <div className={styles.statOrderList}>
                        
                        { completedOrders?.map((orderId: number, index: number) => (
                            <div key={index} className={`text text_type_digits-default mt-2 ${styles.completedOrder}`}>{orderId}</div>
                        )) }
                    </div>
                </div>
                <div className={styles.statOperCol}>
                    <div className='text text_type_main-medium'>В работе:</div>
                    <div className={styles.statOrderList}>
                        { prcessingOrders?.map((orderId: number, index: number) => (
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