import { ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from './NotFound404.module.css';

export const NotFound404Page = (): ReactElement =>
{
    return (
        <div className={styles.page}>
            <div className='text_type_main-large'>
                404 - Страница не найдена
            </div>
            <div className={styles.linkCont}>
                <Link className={styles.blueLink} to='/'>
                    Нажмите для перехода на главную страницу
                </Link>
            </div>
        </div>
    )
}