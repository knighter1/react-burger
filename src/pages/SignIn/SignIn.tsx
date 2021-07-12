import { Link, Redirect } from 'react-router-dom';
import styles from './SignIn.module.css'
import './SignIn.css';
import SignInForm from '../../components/SignInForm/SignInForm';
import '@ya.praktikum/react-developer-burger-ui-components'
import { useAuth } from '../../services/auth';
import { useLocation } from 'react-router-dom';

interface stateType {
    from: { pathname: string }
}

const SignInPage = () =>
{
    const { state } = useLocation<stateType>();

    const { signIn, user }: any = useAuth();

    if (user) {
        return (
            <Redirect
                to={{
                    pathname: state ? state.from.pathname : '/'
                }}
            />
        );
    }

    return (
        <div className={"signin-cont"}>
            <div>
                <SignInForm handler={(email: string, password: string) => signIn(email, password)} />
                <div className={styles.links}>
                    <div className={styles.linksRow}>
                        <span className={'text text_type_main-default text_color_inactive'}>Вы - новый пользователь?</span>
                        <Link to='/register'>
                            <span className={`text text_type_main-default ${styles.blueLink}`}>
                                Зарегистрироваться
                            </span>
                        </Link>
                    </div>
                    <div className={styles.linksRow}>
                        <span className={'text text_type_main-default text_color_inactive'}>Забыли пароль?</span>
                        <Link to='/forgot-password'>
                            <span className={`text text_type_main-default ${styles.blueLink}`}>
                                Восстановить пароль
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInPage;