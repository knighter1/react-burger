import { Logo, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './SignInForm.module.css'

const SignInForm = () =>
{
    return (
        <div>
            <Logo />
            <div className={`text text_type_main-medium ${styles.title} ${styles.formRow}`}>Вход</div>
            <div className={styles.formRow}>
                <EmailInput onChange={() => {}} value={''} name={'email'} size={'default'} />
            </div>
            <div className={styles.formRow}>
                <PasswordInput onChange={() => {}} value={''} name={'password'} />
            </div>
            <div className={styles.formRow}>
                <Button type="primary" size="medium">
                    Войти
                </Button>
            </div>
        </div>
    )
}

export default SignInForm;