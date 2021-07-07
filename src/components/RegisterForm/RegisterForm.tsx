import { Logo, EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './RegisterForm.module.css'

const RegisterForm = () =>
{
    return (
        <div>
            <Logo />
            <div className={`text text_type_main-medium ${styles.title} ${styles.formRow}`}>Регистрация</div>
            <div className={styles.formRow}>
                <Input onChange={() => {}} value={''} name={'name'} size={'default'} placeholder={'Имя'} />
            </div>
            <div className={styles.formRow}>
                <EmailInput onChange={() => {}} value={''} name={'email'} size={'default'} />
            </div>
            <div className={styles.formRow}>
                <PasswordInput onChange={() => {}} value={''} name={'password'} />
            </div>
            <div className={styles.formRow}>
                <Button type="primary" size="medium">
                    Зарегистрироваться
                </Button>
            </div>
        </div>
    )
}

export default RegisterForm;