import { Logo, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react';
import styles from './ForgotPasswordForm.module.css'

interface IForgotPasswordFormProps {
    handler: Function
}

const ForgotPasswordForm = ({handler}: IForgotPasswordFormProps) =>
{
    const [email, setEmail] = useState('');

    return (
        <div>
            <Logo />
            <div className={`text text_type_main-medium ${styles.title} ${styles.formRow}`}>Восстановление пароля</div>
            <div className={styles.formRow}>
                <EmailInput onChange={(event) => setEmail(event.target.value)} value={email} name={'email'} size={'default'} />
            </div>
            <div className={styles.formRow}>
                <Button type="primary" size="medium" onClick={() => handler(email)}>
                    Восстановить
                </Button>
            </div>
        </div>
    )
}

export default ForgotPasswordForm;