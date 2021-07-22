import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Profile.module.css';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../..';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../../services/auth';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import { updateUserInfo } from '../../services/actions/profile';
import { Switch } from 'react-router';
import { ProtectedRoute } from '../../components/ProtectedRoute/ProtectedRoute';
import ProfileOrdersPage from '../ProfileOrders/ProfileOrders';
import { BrowserRouter } from 'react-router-dom';

const ProfilePage = () =>
{
    const dispatch = useDispatch();
    const [isModified, setIsModified] = useState(false);

    let initUser = useSelector((store: IStore) => store.access.user);
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

    const updateUserInfoHandler = () => {
        dispatch(updateUserInfo(email, name, setIsModified));   
    }

    useEffect(() => {
        if (initUser && (initUser.name !== name || initUser.email !== email || password !== ''))
            setIsModified(true);
    }, [initUser, name, email, password, setIsModified]);

    const { getUser }: any = useAuth();

    useEffect(() => {
        if (initUser === null)
            getUser();
    }, [initUser, getUser]);

    const onSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        updateUserInfoHandler();
    }

    return (
        <BrowserRouter>
            <Switch>
                <ProtectedRoute path='/profile' exact={true}>
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
                </ProtectedRoute>
                <ProtectedRoute path='/profile/orders' exact={true}>
                    <ProfileOrdersPage />
                </ProtectedRoute>
            </Switch>
        </BrowserRouter>
        
        /**/
    )
}

export default ProfilePage;