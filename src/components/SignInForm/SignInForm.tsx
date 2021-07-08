import { Logo, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react';
import styles from './SignInForm.module.css'

interface ISignInFormProps {
    handler: Function;
}

const SignInForm = ({ handler }: ISignInFormProps) =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <Logo />
            <div className={`text text_type_main-medium ${styles.title} ${styles.formRow}`}>Вход</div>
            <div className={styles.formRow}>
                <EmailInput onChange={(event) => setEmail(event.target.value)} value={email} name={'email'} size={'default'} />
            </div>
            <div className={styles.formRow}>
                <PasswordInput onChange={(event) => setPassword(event.target.value)} value={password} name={'password'} />
            </div>
            <div className={styles.formRow}>
                <Button type="primary" size="medium" onClick={() => handler(email, password)}>
                    Войти
                </Button>
            </div>
        </div>
    )
}

export default SignInForm;