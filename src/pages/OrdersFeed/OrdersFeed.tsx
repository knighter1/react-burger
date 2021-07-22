import styles from './OrdersFeed.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import OrdersList from '../../components/OrdersList/OrdersList';
import OrdersStat from '../../components/OrdersStat/OrdersStat';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import OrderDetailPage from '../OrderDetail/OrderDetail';

const OrdersFeedPage = () =>
{
    return (
        <Router>
            <Switch>
                <Route path="/feed/:id">
                     <OrderDetailPage />
                </Route>
                <Route>
                    <div className={styles.page}>
                        <OrdersList caption='Лента заказов' type='small' />
                        <OrdersStat />
                    </div>
                </Route>
            </Switch>
        </Router>
    )
}

export default OrdersFeedPage;