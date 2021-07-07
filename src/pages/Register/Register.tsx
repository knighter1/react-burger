import styles from './Register.module.css'
import './Register.css';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import '@ya.praktikum/react-developer-burger-ui-components'

const RegisterPage = () =>
{
    return (
        <div className={"page-cont"}>
            <div>
                <RegisterForm />
                <div className={styles.links}>
                    <div className={styles.linksRow}>
                        <span className={'text text_type_main-default text_color_inactive'}>Уже зарегистрированы?</span>
                        <span className={`text text_type_main-default ${styles.blueLink}`}>Войти</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;