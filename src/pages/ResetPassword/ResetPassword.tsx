import styles from './ResetPassword.module.css'
import './ResetPassword.css';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';
import '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/auth';
import { resetPassword } from '../../redux/actions/resetPassword';

interface stateType {
    from: { pathname: string }
}

const ResetPasswordPage = () =>
{
    const dispatch = useDispatch();

    const history = useHistory();

    const resetPasswordHandler = (password: string, token: string) => {
        dispatch(resetPassword(password, token, history));
    }

    const { isAuth }: any = useAuth();
    const { state } = useLocation<stateType>();

    if (isAuth || state === undefined || (state && state.from.pathname !== '/forgot-password')) {
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
                <ResetPasswordForm handler={(password: string, token: string) => resetPasswordHandler(password, token)} />
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

export default ResetPasswordPage;