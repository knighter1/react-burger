import styles from './OrdersList.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import OrderListItem from '../OrderListItem/OrderListItem';
import { useSelector } from 'react-redux';
import { IStore } from '../..';

const OrdersList = () =>
{
    const lib = useSelector((store: IStore) => store.ingredientsLib.data);

    return (
        <section className={styles.section}>
            <div className="text text_type_main-large pt-10 pb-5">Лента заказов</div>

            {lib.length > 0 && <div className={styles.itemsCont}>
                <OrderListItem name='Death Star Starship Main бургер' orderId={124567} ingredients={[lib[0], lib[2]]} date={new Date()} />
                <OrderListItem name='Interstellar бургер' orderId={124567} ingredients={[lib[0], lib[3], lib[4], lib[6]]} date={new Date()} />
                <OrderListItem name='Black Hole Singularity острый бургер' orderId={124568} ingredients={[lib[1], lib[6], lib[8], lib[11], lib[10], lib[9]]} date={new Date()} />
                <OrderListItem name='Supernova Infinity бургер' orderId={124569} ingredients={[lib[1], lib[3], lib[4], lib[5], lib[6], lib[7], lib[5], lib[6], lib[7]]} date={new Date()} />
                <OrderListItem name='Death Star Starship Main бургер' orderId={124567} ingredients={[lib[0], lib[3], lib[4], lib[6]]} date={new Date()} />
                <OrderListItem name='Interstellar бургер' orderId={124568} ingredients={[lib[1], lib[6], lib[8], lib[11], lib[10], lib[9]]} date={new Date()} />
                <OrderListItem name='Black Hole Singularity острый бургер' orderId={124569} ingredients={[lib[1], lib[3], lib[4], lib[5], lib[6], lib[7], lib[5], lib[6], lib[7]]} date={new Date()} />
            </div>}

        </section>   
    )
}

export default OrdersList;