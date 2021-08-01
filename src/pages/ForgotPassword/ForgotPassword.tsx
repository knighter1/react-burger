import styles from './ForgotPassword.module.css'
import './ForgotPassword.css';
import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm';
import '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { initResetPassword } from '../../redux/actions/initResetPassword';
import { TStore } from '../../redux/reducers';

const ForgotPasswordPage = () =>
{
    const dispatch = useDispatch();

    const history = useHistory();

    const initResetPasswordHandler = (email: string) => {
        dispatch(initResetPassword(email, history));
    }

    const isAuth: boolean = useSelector((store: TStore) => store.access.isAuth);

    if (isAuth) {
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    }

    return (
        <div className={"page-cont"}>
            <div className={styles.center}>
                <ForgotPasswordForm handler={(email: string) => initResetPasswordHandler(email)} />
                <div className={styles.links}>
                    <div className={styles.linksRow}>
                        <span className={'text text_type_main-default text_color_inactive'}>Вспомнили пароль?</span>
                        <Link to='/login'>
                            <span className={`text text_type_main-default ${styles.blueLink}`}>
                                Войти
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage;