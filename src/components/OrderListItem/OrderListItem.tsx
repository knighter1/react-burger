import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './OrderListItem.module.css'
import { orderCostReducer } from '../../redux/reducers/constructor';
import { formatOrderDate } from '../../redux/reducers/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderDetail } from '../../redux/actions/orderDetails';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TStore } from '../../redux/reducers';
import { OrderStatus } from '../../types/IOrderData';
import { IngredientData } from '../../types/IIngredientData';

interface IOrderListItemProps {
    name: string
    number: number,
    _ingredients: string[];
    date: Date;
    status: OrderStatus;
}

const OrderListItem = ({name, number, _ingredients, date, status }: IOrderListItemProps) =>
{
    const MAX_NAME_LENGTH: number = 65;
    
    const [cost, setCost] = useState(0);
    const [ingredients, setIngredients]: any = useState([]);

    const lib = useSelector((store: TStore) => store.ingredientsLib.itemsById);

    useEffect(() => {
        const orderIngredients: IngredientData[] = _ingredients.filter(item => item !== null && item !== undefined).map(id => lib?.get(id)) as IngredientData[];
        setIngredients(orderIngredients);
        setCost(orderCostReducer(orderIngredients.slice(1, orderIngredients.length), orderIngredients[0]));
    }, [lib, _ingredients]);

    const ingredientsCont = () => {

        const ingredientsCount = ingredients.length;
        const MAX_COUNT: number = 6;
        const overCount: number = Math.max(0, ingredientsCount - MAX_COUNT);

        return (
            <div className={styles.ingredintsRow}>
                {ingredients.slice(0, MAX_COUNT).map((item: IngredientData, index: number) => {
                    const style = {
                        backgroundImage: `url(${item.image_mobile})`,
                        zIndex: ingredientsCount - index
                    };
                    return <div
                        key={index}
                        style={style}
                        className={`${styles.ingredientImage} text text_type_digits-default`}>
                            {index + 1 === MAX_COUNT && overCount ? <span className={styles.overCount}>+{overCount}</span> : ""}
                    </div>;
                })}
            </div>
        );
    }

    const dispatch = useDispatch();

    const location = useLocation();

    const orderSelect = () => {
        dispatch(setOrderDetail({name, number, ingredients, date, status }));
    }

    if (!ingredients || !ingredients.length)
        return null;
    
    let statusName, statusClassName;

    switch (status)
    {
        case 'done': statusName = 'Выполнен'; statusClassName = styles.statusDone ; break;
        case 'pending': statusName = 'В работе'; statusClassName = styles.statusPending ; break;
        case 'created': statusName = 'Принят'; statusClassName = styles.statusCreated ; break;
        case 'canceled': statusName = 'Отменен'; statusClassName = styles.statusCancled ; break;
    }

    return (

        <Link className={styles.cont} onClick={() => orderSelect()} to={{
            pathname: `${location.pathname}/${number}`,
            state: {background: location}
        }}>
            <div className={styles.top}>
                <span className='text text_type_digits-default'>{`#${number}`}</span>
                <span className='text text_type_main-default text_color_inactive'>{formatOrderDate(date)}</span>
            </div>
            <div className={`${statusClassName} text text_type_default-default`}>
                {statusName}
            </div>
            <div className={`${styles.name} text text_type_main-medium`}>
                {name.substr(0, MAX_NAME_LENGTH)}
            </div>
            <div className={styles.bottom}>
                <div>{ingredientsCont()}</div>
                <div className={styles.priceCont}>
                    <span className={`${styles.cost} text text_type_digits-default`}>{cost}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    )
}

export default OrderListItem;