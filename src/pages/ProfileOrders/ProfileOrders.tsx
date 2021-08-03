import '@ya.praktikum/react-developer-burger-ui-components'
import { ReactElement, useEffect } from 'react';
import { OrdersList } from '../../components/OrdersList/OrdersList';
import { ProfileMenu } from '../../components/ProfileMenu/ProfileMenu';
import { userWsConnectionStart } from '../../redux/actions/userWsActions';
import { useDispatch, useSelector } from '../../hooks';
import { IOrdersFeed } from '../../types/IOrderData';
import { getCookie } from '../../utils/cookie';
import styles from './ProfileOrders.module.css';

export const ProfileOrdersPage = (): ReactElement =>
{
    const dispatch = useDispatch();

    const feed: IOrdersFeed | null = useSelector(store => store.userWs.feed);

    useEffect(() =>
    {
        let accessToken: string | undefined = getCookie('accessToken')?.substr(7);
        if (!accessToken)
            accessToken = '';

        dispatch(userWsConnectionStart(accessToken));
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