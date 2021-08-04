import styles from './OrdersList.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import OrderListItem from '../OrderListItem/OrderListItem';
import { IOrdersFeed } from '../../types/IOrderData';
import { useSelector } from '../../hooks';
import { FC } from 'react';

export interface IOrdersListProps {
    caption?: string;
    type: 'small' | 'large';
    feed: IOrdersFeed | null;
}

export const OrdersList: FC<IOrdersListProps> = ( { caption, type, feed }) =>
{
    const lib = useSelector(store => store.ingredientsLib.items);

    const sectionClassName = type === 'small' ? styles.smallSection : styles.largeSection;

    return (
        <section className={`${sectionClassName} ${styles.section}`}>
            {caption && <div className="text text_type_main-large pt-10 pb-5">{caption}</div>}
            {lib?.length > 0 && <div className={styles.itemsCont}>
                {feed?.orders?.map(order => {
                    return <OrderListItem
                        key={order._id}
                        name={order.name}
                        number={order.number}
                        status={order.status}
                        _ingredients={order.ingredients}
                        date={order.updatedAt ? order.updatedAt : order.createdAt} />
                })}
            </div>}
        </section>   
    )
}