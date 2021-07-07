import { Logo, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ResetPasswordForm.module.css'

const ResetPasswordForm = () =>
{
    return (
        <div>
            <Logo />
            <div className={`text text_type_main-medium ${styles.title} ${styles.formRow}`}>Восстановление пароля</div>
            <div className={styles.formRow}>
                <PasswordInput onChange={() => {}} value={''} name={'password'} />
            </div>
            <div className={styles.formRow}>
                <Input onChange={() => {}} value={''} name={'code'} size={'default'} placeholder={'Введите код из письма'} />
            </div>
            <div className={styles.formRow}>
                <Button type="primary" size="medium">
                    Восстановить
                </Button>
            </div>
        </div>
    )
}

export default ResetPasswordForm;