import { Link, useHistory } from 'react-router-dom';
import styles from './SignIn.module.css'
import './SignIn.css';
import SignInForm from '../../components/SignInForm/SignInForm';
import '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux';
import { SIGNIN_REQUEST, SIGNIN_ERROR, SIGNIN_SUCCESS } from '../../services/actions/auth';

const SignInPage = () =>
{
    const END_POINT: string = 'https://norma.nomoreparties.space/api/auth/login';

    const dispatch = useDispatch();

    const history = useHistory();

    const signIn = (email: string, password: string) => {

        dispatch({ type: SIGNIN_REQUEST });
        fetch(END_POINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(`Status ${response.status}`);
        })
        .then(responseObj => {
            dispatch({ type: SIGNIN_SUCCESS, ...responseObj });
            history.replace('/');
            console.log(responseObj);
        })
        .catch(error => {
            dispatch({ type: SIGNIN_ERROR });
            console.error(`Signin error: ${error}`)
        });
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