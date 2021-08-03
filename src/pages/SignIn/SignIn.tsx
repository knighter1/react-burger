import { Link, Redirect } from 'react-router-dom';
import styles from './SignIn.module.css'
import './SignIn.css';
import { SignInForm } from '../../components/SignInForm/SignInForm';
import '@ya.praktikum/react-developer-burger-ui-components'
import { useLocation } from 'react-router-dom';
import { signIn } from '../../redux/actions/auth';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../hooks';

interface StateType {
    from: { pathname: string }
}

export const SignInPage: FC = () =>
{
    const { state } = useLocation<StateType>();
    const dispatch = useDispatch();

    const isAuth: boolean = useSelector(store => store.access.isAuth);

    if (isAuth) {
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
                <SignInForm handler={(email: string, password: string) => dispatch(signIn(email, password))} />
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