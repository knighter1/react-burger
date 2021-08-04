import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeaderItem from '../HeaderItem/HeaderItem';
import styles from './AppHeader.module.css';

const AppHeader: FC = () => {

    const location = useLocation();
    
    const isConstructor: boolean = location.pathname === '/';
    const isProfile: boolean = location.pathname === '/profile';
    const isFeed: boolean = location.pathname === '/feed';

    const constructorCont = (
        <HeaderItem
            Icon={BurgerIcon}
            caption='Конструктор'
            type={ isConstructor ? "primary" : "secondary"}
        />
    );

    const profileCont = (
        <HeaderItem
            Icon={ProfileIcon}
            caption='Личный кабинет'
            type={isProfile ? "primary" : "secondary"}
        />
    );

    const feedCont = (
        <HeaderItem
            Icon={ListIcon}
            caption='Лента заказов'
            type={isFeed ? "primary" : "secondary"}
        />
    )

    return (
        <header className={styles.row}>
            <nav className={`${styles.sideRow} ${styles.left}`}>
                {!isConstructor ? <Link to='/'>{constructorCont}</Link> : constructorCont}
                {!isFeed ? <Link to='/feed'>{feedCont}</Link> : feedCont}
            </nav>
            <Link to='/'>
                <Logo />
            </Link>
            <nav className={`${styles.sideRow} ${styles.right}`}>
                {!isProfile ? <Link to='/profile'>{profileCont}</Link> : profileCont}
            </nav>
        </header>
    );
}

export default AppHeader;