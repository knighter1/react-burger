import styles from './IngredientMenuItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { setIngredient } from '../../redux/actions/ingredient';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { IngredientData } from '../../types/IIngredientData';
import { useDispatch, useSelector } from '../../hooks';
import { FC } from 'react';

interface IIngredientMenuItemProps
{
    data: IngredientData
}

export const IngredientMenuItem: FC<IIngredientMenuItemProps> = ({ data }) =>
{
    const dispatch = useDispatch();

    const onItemClick = () =>
    {
        dispatch(setIngredient(data));
    }

    const [{isDrag}, dragRef] = useDrag({
        type: "ingredients",
        item: data,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const className = `${styles.menuItem} mt-6 mb-8 ml-4 mr-2 ${isDrag ? styles.isDrag : ''}`;

    const count = useSelector(store => {
        
        const items: IngredientData[] = store.constructor.items
        let countResult: number = items ? items.filter(item => item._id === data._id).length : 0;

        if (data === store.constructor.bun)
            countResult = 2;

        return countResult;
    });

    const location = useLocation();

    return (
        <Link to={{
            pathname: `/ingredients/${data._id}`,
            state: {background: location}
        }}>
            <div className={className}
                onClick={onItemClick}
                ref={dragRef} >
                {count > 0 && <Counter count={count} size="default" />}

                <img className="ml-4 mr-4" src={data.image} alt={data.name} />
                <div className={`mt-1 mb-1" ${styles.priceBlock}`}>
                    <span className={`text text_type_digits-default pr-2 ${styles.price}`}>{data.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <span className={`text_type_main-default ${styles.name}`}>{data.name}</span>
            </div>
        </Link>
    )
}