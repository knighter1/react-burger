import styles from './OrdersList.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import OrderListItem from '../OrderListItem/OrderListItem';
import { useSelector } from 'react-redux';
import { IOrdersFeed } from '../../types/IOrderData';
import { IStore } from '../../redux/reducers';

export interface IOrdersListProps {
    caption?: string,
    type: 'small' | 'large';
}

const OrdersList = ( {caption, type}: IOrdersListProps ) =>
{
    const lib = useSelector((store: IStore) => store.ingredientsLib.items);

    const feed: IOrdersFeed | null = useSelector((store: IStore) => store.feedWs.feed);

    const sectionClassName = type === 'small' ? styles.smallSection : styles.largeSection;

    return (
        <section className={`${sectionClassName} ${styles.section}`}>
            {caption && <div className="text text_type_main-large pt-10 pb-5">{caption}</div>}
            {lib?.length > 0 && <div className={styles.itemsCont}>
                {feed?.orders.map(order => {
                    return <OrderListItem
                        key={order._id}
                        name={order.name}
                        number={order.number}
                        _ingredients={order.ingredients}
                        date={order.updatedAt ? order.updatedAt : order.createdAt} />
                })}
            </div>}
        </section>   
    )
}

export default OrdersList;