import '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrdersList from '../../components/OrdersList/OrdersList';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import { USER_WS_CONNECTION_START } from '../../redux/actions/userWsActions';
import { IStore } from '../../redux/reducers';
import { IOrdersFeed } from '../../types/IOrderData';
import { getCookie } from '../../utils/cookie';
import styles from './ProfileOrders.module.css';

const ProfileOrdersPage = () =>
{
    const dispatch = useDispatch();

    const feed: IOrdersFeed | null = useSelector((store: IStore) => store.userWs.feed);

    useEffect(() => {
        const accessToken = getCookie('accessToken')?.substr(7);
        dispatch({ type: USER_WS_CONNECTION_START, payload: accessToken });
    }, [dispatch]);

    return (
        <div className='page-cont'>
            <ProfileMenu />
            <div className={styles.page}>
                <OrdersList type='large' feed={feed} />
            </div>
        </div>
    )
}

export default ProfileOrdersPage;