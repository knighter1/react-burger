import styles from './ForgotPassword.module.css'
import './ForgotPassword.css';
import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm';
import '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { INIT_RESET_PASSWORD_REQUEST, INIT_RESET_PASSWORD_ERROR, INIT_RESET_PASSWORD_SUCCESS } from '../../services/actions/auth';
import { useAuth } from '../../services/auth';

const ForgotPasswordPage = () =>
{
    const END_POINT: string = 'https://norma.nomoreparties.space/api/password-reset';

    const dispatch = useDispatch();

    const history = useHistory();

    const initResetPassword = (email: string) => {

        dispatch({ type: INIT_RESET_PASSWORD_REQUEST });
        fetch(END_POINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(`Status ${response.status}`);
        })
        .then(responseObj => {
            dispatch({ type: INIT_RESET_PASSWORD_SUCCESS, message: responseObj.message, success: responseObj.success });
            history.push('/reset-password', {from: history.location});
        })
        .catch(error => {
            dispatch({ type: INIT_RESET_PASSWORD_ERROR });
            console.error(`Reset password error: ${error}`)
        });
    }

    const { user }: any = useAuth();

    if (user) {
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
                <ForgotPasswordForm handler={(email: string) => initResetPassword(email)} />
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