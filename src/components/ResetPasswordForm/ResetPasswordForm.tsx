import { Logo, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { FormEvent, useState } from 'react';
import styles from './ResetPasswordForm.module.css'

interface IResetPasswordFormProps {
    handler: Function
}

const ResetPasswordForm = ({handler}: IResetPasswordFormProps) =>
{
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const onSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        handler(password, token);
    }

    return (
        <form onSubmit={(event: FormEvent) => onSubmitHandler(event)}>
            <Logo />
            <div className={`text text_type_main-medium ${styles.title} ${styles.formRow}`}>Восстановление пароля</div>
            <div className={styles.formRow}>
                <PasswordInput onChange={(event) => setPassword(event.target.value)} value={password} name={'password'} />
            </div>
            <div className={styles.formRow}>
                <Input onChange={(event) => setToken(event.target.value)} value={token} name={'code'} size={'default'} placeholder={'Введите код из письма'} />
            </div>
            <div className={styles.formRow}>
                <Button type="primary" size="medium">
                    Восстановить
                </Button>
            </div>
        </form>
    )
}

export default ResetPasswordForm;