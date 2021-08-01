import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Profile.module.css';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, useEffect, useState } from 'react';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import { updateUserInfo } from '../../redux/actions/profile';
import { TStore } from '../../redux/reducers';
import { getUser } from '../../services/auth';

const ProfilePage = () =>
{
    const dispatch = useDispatch();
    const [isModified, setIsModified] = useState(false);

    const access = useSelector((store: TStore) => store.access);
    let initUser = access.user;

    const [name, setName] = useState(initUser ? initUser.name : '');
    const [email, setEmail] = useState(initUser ? initUser.email : '');
    const [password, setPassword] = useState('');

    const reset = () =>
    {
        if (!initUser || !isModified)
            return;
        
        setName(initUser.name);
        setEmail(initUser.email);
        setPassword('');
        setIsModified(false);
    }

    const updateUserInfoHandler = () => dispatch(updateUserInfo(email, name, password, onPathSuccess));

    const onPathSuccess = () => {
        setPassword('');
        setIsModified(false);
    }

    // изменение полей
    useEffect(() =>
    {
        if (initUser && (initUser.name !== name || initUser.email !== email || password !== ''))
        {
            setIsModified(true);
            return;
        }

        setIsModified(false);
    }, [initUser, name, email, password, setIsModified]);

    // запрос данных на сервер
    useEffect(() =>
    {
        if (initUser === null || initUser === undefined)
            getUser(dispatch);
    }, [initUser, dispatch]);

    // заполнение полей
    useEffect(() =>
    {
        if (!initUser)
            return;
            
        setName(initUser.name);
        setEmail(initUser.email);
    }, [initUser])

    const onSubmitHandler = (event: FormEvent) =>
    {
        event.preventDefault();
        updateUserInfoHandler();
    }

    return (
        <div className='page-cont'>
            <ProfileMenu />
            <form className='column' onSubmit={(event: FormEvent) => onSubmitHandler(event)}>
                <div className={styles.field}>
                    <Input onChange={(event) => setName(event.target.value)} value={name} name={'name'} size={'default'} placeholder={'Имя'} />
                </div>
                <div className={styles.field}>
                    <Input onChange={(event) => setEmail(event.target.value)} value={email} name={'login'} size={'default'} placeholder={'Логин'} />
                </div>
                <div className={styles.field}>
                    <PasswordInput onChange={(event) => setPassword(event.target.value)} value={password} name={'password'} />
                </div>
                { isModified && <div className={`${styles.field} ${styles.right}`}>
                    <span className={`text text_type_main-default text_color_inactive ${styles.cancel}`} onClick={() => reset()} >
                        Отмена
                    </span>
                    <Button type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>}
            </form>
        </div>
    )
}

export default ProfilePage;