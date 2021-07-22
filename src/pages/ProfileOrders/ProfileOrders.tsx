import '@ya.praktikum/react-developer-burger-ui-components'
import OrdersList from '../../components/OrdersList/OrdersList';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import styles from './ProfileOrders.module.css';

const ProfileOrdersPage = () =>
{
    return (
        <div className='page-cont'>
            <ProfileMenu />
            <div className={styles.page}>
                <OrdersList type='large' />
            </div>
        </div>
    )
}

export default ProfileOrdersPage;