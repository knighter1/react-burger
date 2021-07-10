import styles from './OrdersStat.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';

const OrdersStat = () =>
{
    const completedOrders: string[] = ['034533', '034532', '034531', '034530', '034529'];
    const prcessingOrders: string[] = ['034536', '034535', '034534'];

    return (
        <section className={`${styles.section}  ml-10`}>
            <div className='text text_type_main-large pt-10 pb-5'>Статистика</div>
            <div className={styles.statOper}>
                <div className={styles.statOperCol}>
                    <span className='text text_type_main-medium'>Готовы:</span>
                    { completedOrders.map((orderId: string) => (
                        <div className={`text text_type_digits-default mt-2 ${styles.completedOrder}`}>{orderId}</div>
                    )) }
                </div>
                <div className={styles.statOperCol}>
                    <span className='text text_type_main-medium'>В работе:</span>
                    { prcessingOrders.map((orderId: string) => (
                        <div className={`text text_type_digits-default mt-2`}>{orderId}</div>
                    )) }
                </div>
            </div>
            <div className={styles.statCont}>
                <span className='text text_type_main-medium'>
                    Выполнено за все время:
                </span>
                <div className={`text text_type_digits-large ${styles.digitsLarge}`}>28752</div>
            </div>
            <div className={styles.statCont}>
                <span className='text text_type_main-medium'>
                    Выполнено за сегодня:
                </span>
                <div className={`text text_type_digits-large ${styles.digitsLarge}`}>138</div>
            </div>
        </section>   
    )
}

export default OrdersStat;