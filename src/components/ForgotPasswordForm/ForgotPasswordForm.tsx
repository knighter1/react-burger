import { Logo, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ForgotPasswordForm.module.css'

const ForgotPasswordForm = () =>
{
    return (
        <div>
            <Logo />
            <div className={`text text_type_main-medium ${styles.title} ${styles.formRow}`}>Восстановление пароля</div>
            <div className={styles.formRow}>
                <EmailInput onChange={() => {}} value={''} name={'email'} size={'default'} />
            </div>
            <div className={styles.formRow}>
                <Button type="primary" size="medium">
                    Восстановить
                </Button>
            </div>
        </div>
    )
}

export default ForgotPasswordForm;