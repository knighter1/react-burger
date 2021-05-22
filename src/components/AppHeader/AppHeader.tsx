import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderItem from '../HeaderItem/HeaderItem';
import styles from './AppHeader.module.css';

class AppHeader extends React.Component
{
    render()
    {
        return (
            <header className={styles.row}>
                <nav className={`${styles.sideRow} ${styles.left}`}>
                    <HeaderItem Icon={BurgerIcon} caption='Конструктор' type="primary" />
                    <HeaderItem Icon={ListIcon} caption='Лента заказов' type="secondary" />
                </nav>
                <Logo />
                <nav className={`${styles.sideRow} ${styles.right}`}>
                    <HeaderItem Icon={ProfileIcon} caption='Личный кабинет' type="secondary" />
                </nav>
            </header>
        )
    }
}

export default AppHeader;