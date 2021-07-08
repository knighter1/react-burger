import styles from './ResetPassword.module.css'
import './ResetPassword.css';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';
import '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_ERROR, RESET_PASSWORD_SUCCESS } from '../../services/actions/auth';

const ResetPasswordPage = () =>
{
    const END_POINT: string = 'https://norma.nomoreparties.space/api/password-reset/reset';

    const dispatch = useDispatch();

    const resetPassword = (password: string, token: string) => {

        dispatch({ type: RESET_PASSWORD_REQUEST });
        fetch(END_POINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password, token: token })
        })
        .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(`Status ${response.status}`);
        })
        .then(responseObj => {
            dispatch({ type: RESET_PASSWORD_SUCCESS, message: responseObj.message, success: responseObj.success });
            console.log(responseObj);
        })
        .catch(error => {
            dispatch({ type: RESET_PASSWORD_ERROR });
            console.error(`Reset password error: ${error}`)
        });
    }

    return (
        <div className={"page-cont"}>
            <div>
                <ResetPasswordForm handler={(password: string, token: string) => resetPassword(password, token)} />
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