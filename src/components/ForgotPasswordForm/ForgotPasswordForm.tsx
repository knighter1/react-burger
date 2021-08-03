import { Logo, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { FormEvent, useState } from 'react';
import styles from './ForgotPasswordForm.module.css'

interface IForgotPasswordFormProps {
    handler: (email: string) => void
}

const ForgotPasswordForm = ({handler}: IForgotPasswordFormProps) =>
{
    const [email, setEmail] = useState('');

    const onSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        handler(email);
    }

    return (
        <form onSubmit={(event: FormEvent) => onSubmitHandler(event)}>
            <Logo />
            <div className={`text text_type_main-medium ${styles.title} ${styles.formRow}`}>Восстановление пароля</div>
            <div className={styles.formRow}>
                <EmailInput onChange={(event) => setEmail(event.target.value)} value={email} name={'email'} size={'default'} />
            </div>
            <div className={styles.formRow}>
                <Button type="primary" size="medium">
                    Восстановить
                </Button>
            </div>
        </form>
    )
}

export default ForgotPasswordForm;