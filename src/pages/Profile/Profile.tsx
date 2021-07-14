import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Profile.module.css';
import './Profile.css';
import { PATCH_USER_REQUEST, PATCH_USER_SUCCESS, PATCH_USER_ERROR } from '../../services/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { IStore } from '../..';
import { useEffect, useState } from 'react';
import { useAuth } from '../../services/auth';
import { fetchWithRefresh } from '../../services/fetchWithRefresh';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';

const ProfilePage = () =>
{
    const USER_END_POINT = 'https://norma.nomoreparties.space/api/auth/user';
    
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

    const updateUserInfo = () => {
        dispatch({ type: PATCH_USER_REQUEST });
        const accessToken = getCookie('accessToken');
        const info = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': accessToken ? accessToken : ''
            },
            body: JSON.stringify({ email: email, name: name })};

        fetchWithRefresh(USER_END_POINT, info)
        .then(response => {
            if (response.success) {
              return response;
            }
            return Promise.reject(`Status ${response.status}`);
        })
        .then(responseObj => {
            dispatch({ type: PATCH_USER_SUCCESS, ...responseObj });
            setIsModified(false);

            console.log(responseObj);
        })
        .catch(error => {
            dispatch({ type: PATCH_USER_ERROR });
            console.error(`Update user info error: ${error}`)
        });
    }

    useEffect(() => {
        if (initUser && (initUser.name !== name || initUser.email !== email || password !== ''))
            setIsModified(true);
    }, [initUser, name, email, password, setIsModified]);

    const { getUser, signOut }: any = useAuth();

    useEffect(() => {
        if (initUser === null)
            getUser();
    }, [initUser, getUser]);

    const logout = async () => {
        await signOut();
    }

    return (
        <div className='page-cont'>
            <ProfileMenu logoutHandler={() => logout()} />
            <div className='column'>
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
                    <Button type="primary" size="medium" onClick={() => updateUserInfo()} >
                        Сохранить
                    </Button>
                </div>}
            </div>
        </div>
    )
}

export default ProfilePage;