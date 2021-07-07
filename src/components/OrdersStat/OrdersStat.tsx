import styles from './OrdersStat.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';

const OrdersStat = () =>
{
    return (
        <section className={`${styles.section}  ml-10`}>
            <div className="text text_type_main-large pt-10 pb-5">Статистика</div>
        </section>   
    )
}

export default OrdersStat;