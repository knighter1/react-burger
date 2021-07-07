import styles from './OrdersList.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';

const OrdersList = () =>
{
    return (
        <section className={styles.section}>
            <div className="text text_type_main-large pt-10 pb-5">Лента заказов</div>
        </section>   
    )
}

export default OrdersList;