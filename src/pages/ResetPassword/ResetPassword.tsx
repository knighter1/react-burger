import styles from './ResetPassword.module.css'
import './ResetPassword.css';
import { ResetPasswordForm } from '../../components/ResetPasswordForm/ResetPasswordForm';
import '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/resetPassword';
import { useDispatch, useSelector } from '../../hooks';
import { FC } from 'react';

interface stateType {
    from: { pathname: string }
}

export const ResetPasswordPage: FC = () =>
{
    const dispatch = useDispatch();

    const history = useHistory();

    const resetPasswordHandler = (password: string, token: string) => {
        dispatch(resetPassword(password, token, history));
    }

    const isAuth: boolean = useSelector(store => store.access.isAuth);

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