import { Link, useHistory } from 'react-router-dom';
import styles from './Register.module.css'
import './Register.css';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux';
import { REGISTER_REQUEST, REGISTER_ERROR, REGISTER_SUCCESS } from '../../services/actions/auth';
import { setCookie } from '../../utils/cookie';

const RegisterPage = () =>
{
    const END_POINT: string = 'https://norma.nomoreparties.space/api/auth/register';

    const dispatch = useDispatch();

    const history = useHistory();

    const register = (email: string, password: string, name: string) => {

        dispatch({ type: REGISTER_REQUEST });
        fetch(END_POINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password, name: name })
        })
        .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(`Status ${response.status}`);
        })
        .then(responseObj => {
            dispatch({ type: REGISTER_SUCCESS, ...responseObj });
            history.replace('/');
            setCookie('refreshToken', responseObj.refreshToken);
            console.log(responseObj);
        })
        .catch(error => {
            dispatch({ type: REGISTER_ERROR });
            console.error(`Register error: ${error}`)
        });
    }

    return (
        <div className={"page-cont"}>
            <div>
                <RegisterForm handler={(email: string, password: string, name: string) => register(email, password, name)} />
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