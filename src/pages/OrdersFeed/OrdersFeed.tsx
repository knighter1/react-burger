import styles from './OrdersFeed.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import OrdersList from '../../components/OrdersList/OrdersList';
import OrdersStat from '../../components/OrdersStat/OrdersStat';

const OrdersFeedPage = () =>
{
    return (
        <div className={styles.page}>
            <div>
                <OrdersList />
                <OrdersStat />
            </div>
        </div>
    )
}

export default OrdersFeedPage;