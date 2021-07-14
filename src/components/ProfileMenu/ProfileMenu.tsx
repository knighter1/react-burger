import '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
import styles from './ProfileMenu.module.css';

interface IProfileMenuProps {
    logoutHandler: Function;
}

const ProfileMenu = ( { logoutHandler }: IProfileMenuProps ) =>
{
    return (
        <div className={styles.column}>
            <div className={`text text_type_main-medium ${styles.caption}`}>Профиль</div>

            <Link to='/profile/orders'>
                <div className={`text text_type_main-medium text_color_inactive ${styles.caption}`}>
                    История заказов
                </div>
            </Link>

            <div className={`text text_type_main-medium text_color_inactive ${styles.caption} ${styles.logout}`} onClick={() => logoutHandler()}>
                Выход
            </div>

            <div className={`text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете изменить свои персональные данные</div>
        </div>
    )
}

export default ProfileMenu;