import { Link, Redirect, useHistory } from 'react-router-dom';
import styles from './Register.module.css'
import './Register.css';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux';
import { useAuth } from '../../services/auth';
import { register } from '../../services/actions/register';

const RegisterPage = () =>
{
    const dispatch = useDispatch();

    const history = useHistory();

    const registerHandler = (email: string, password: string, name: string) => {
        dispatch(register(email, password, name, history));   
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
                <RegisterForm handler={(email: string, password: string, name: string) => registerHandler(email, password, name)} />
                <div className={styles.links}>
                    <div className={styles.linksRow}>
                        <span className={'text text_type_main-default text_color_inactive'}>Уже зарегистрированы?</span>
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

export default RegisterPage;