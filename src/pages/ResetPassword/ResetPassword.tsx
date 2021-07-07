import styles from './ResetPassword.module.css'
import './ResetPassword.css';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';
import '@ya.praktikum/react-developer-burger-ui-components'

const ResetPasswordPage = () =>
{
    return (
        <div className={"page-cont"}>
            <div>
                <ResetPasswordForm />
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

export default ResetPasswordPage;