import { Logo, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { FormEvent, ReactElement, useState } from 'react';
import styles from './SignInForm.module.css'

interface ISignInFormProps {
    handler: (email: string, password: string) => void;
}

export const SignInForm = ({ handler }: ISignInFormProps): ReactElement =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        handler(email, password);
    }

    return (
        <form onSubmit={(event: FormEvent) => onSubmitHandler(event)}>
            <Logo />
            <div className={`text text_type_main-medium ${styles.title} ${styles.formRow}`}>Вход</div>
            <div className={styles.formRow}>
                <EmailInput onChange={(event) => setEmail(event.target.value)} value={email} name={'email'} size={'default'} />
            </div>
            <div className={styles.formRow}>
                <PasswordInput onChange={(event) => setPassword(event.target.value)} value={password} name={'password'} />
            </div>
            <div className={styles.formRow}>
                <Button type="primary" size="medium">
                    Войти
                </Button>
            </div>
        </form>
    )
}