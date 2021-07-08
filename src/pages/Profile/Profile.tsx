import { PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
import styles from './Profile.module.css';
import './Profile.css';

const ProfilePage = () =>
{
    

    return (
        <div className='page-cont'>
            <div className={styles.column}>
                <div className={`text text_type_main-medium ${styles.caption}`}>Профиль</div>

                <Link to='/profile/orders'>
                    <div className={`text text_type_main-medium text_color_inactive ${styles.caption}`}>
                        История заказов
                    </div>
                </Link>

                <div className={`text text_type_main-medium text_color_inactive ${styles.caption}`}>Выход</div>

                <div className={`text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете изменить свои персональные данные</div>
            </div>
            <div className='column'>
                <div className={styles.field}>
                    <Input onChange={(event) => {}} value={''} name={'name'} size={'default'} placeholder={'Имя'} />
                </div>
                <div className={styles.field}>
                    <Input onChange={(event) => {}} value={''} name={'login'} size={'default'} placeholder={'Логин'} />
                </div>
                <div className={styles.field}>
                    <PasswordInput onChange={() => {}} value={''} name={'password'} />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;