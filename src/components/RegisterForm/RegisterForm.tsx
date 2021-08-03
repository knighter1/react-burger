import { Logo, EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { FormEvent, useState } from 'react';
import styles from './RegisterForm.module.css'

interface IRegisterFormProps {
    handler: (email: string, password: string, name: string) => void;
}

const RegisterForm = ( { handler }: IRegisterFormProps) =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        handler(email, password, name);
    }

    return (
        <form onSubmit={(event: FormEvent) => onSubmitHandler(event)}>
            <Logo />
            <div className={`text text_type_main-medium ${styles.title} ${styles.formRow}`}>Регистрация</div>
            <div className={styles.formRow}>
                <Input onChange={(event) => setName(event.target.value)} value={name} name={'name'} size={'default'} placeholder={'Имя'} />
            </div>
            <div className={styles.formRow}>
                <EmailInput onChange={(event) => setEmail(event.target.value)} value={email} name={'email'} size={'default'} />
            </div>
            <div className={styles.formRow}>
                <PasswordInput onChange={(event) => setPassword(event.target.value)} value={password} name={'password'} />
            </div>
            <div className={styles.formRow}>
                <Button type="primary" size="medium">
                    Зарегистрироваться
                </Button>
            </div>    
        </form>
    )
}

export default RegisterForm;