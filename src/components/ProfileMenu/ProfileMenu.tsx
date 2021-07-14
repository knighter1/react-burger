import '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/auth';
import styles from './ProfileMenu.module.css';

const ProfileMenu = () =>
{
    const location = useLocation();

    const isProfile: boolean = location.pathname === '/profile';
    const isOrders: boolean = location.pathname === '/profile/orders';

    const profileCont = (
        <div className={`text text_type_main-medium ${ isProfile ? '' : 'text_color_inactive' } ${styles.caption}`}>
            Профиль
        </div>
    );

    const ordersCont = (
        <div className={`text text_type_main-medium ${ isOrders ? '' : 'text_color_inactive' } ${styles.caption}`}>
            История заказов
        </div>
    );

    const { signOut }: any = useAuth();

    const logout = async () => {
        await signOut();
    }

    return (
        <div className={styles.column}>
            {!isProfile ? <Link to='/profile'>{profileCont}</Link> : profileCont}
            {!isOrders ? <Link to='/profile/orders'>{ordersCont}</Link> : ordersCont}

            <div className={`text text_type_main-medium text_color_inactive ${styles.caption} ${styles.logout}`} onClick={() => logout()}>
                Выход
            </div>

            <div className={`text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете изменить свои персональные данные</div>
        </div>
    )
}

export default ProfileMenu;