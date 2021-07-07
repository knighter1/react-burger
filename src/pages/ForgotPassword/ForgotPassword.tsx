import styles from './ForgotPassword.module.css'
import './ForgotPassword.css';
import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm';
import '@ya.praktikum/react-developer-burger-ui-components'

const ForgotPassword = () =>
{
    return (
        <div className={"page-cont"}>
            <div>
                <ForgotPasswordForm />
                <div className={styles.links}>
                    <div className={styles.linksRow}>
                        <span className={'text text_type_main-default text_color_inactive'}>Вспомнили пароль?</span>
                        <span className={`text text_type_main-default ${styles.blueLink}`}>Войти</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;