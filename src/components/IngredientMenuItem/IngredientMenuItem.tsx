import { useState } from 'react';
import styles from './IngredientMenuItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../Modal/Modal';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { useDispatch } from 'react-redux';
import { ADD_ITEM } from '../../services/actions/constructor';

export interface IngredientData
{
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number    
}

interface IIngredientMenuItemProps
{
    data: IngredientData;
}

export const IngredientMenuItem = ({ data }: IIngredientMenuItemProps) =>
{
    const [count, setCount] = useState(0);
    const [modalState, setModalState] = useState(false);

    const dispatch = useDispatch();

    const onItemClick = () =>
    {
        setCount(count + 1);
        dispatch({ type: ADD_ITEM, item: data });
        setModalState(true);
    }

    const handler = () => onItemClick();

    return (
        <>
            <div className={`${styles.menuItem} mt-6 mb-8 ml-4 mr-2`}
                onClick={handler} >
                {count > 0 && <Counter count={count} size="default" />}

                <img className="ml-4 mr-4" src={data.image} alt={data.name} />
                <div className={`mt-1 mb-1" ${styles.priceBlock}`}>
                    <span className={`text text_type_digits-default pr-2 ${styles.price}`}>{data.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <span className="text_type_main-default">{data.name}</span>
            </div>
            {modalState && <Modal closeHandle={() => setModalState(false)}><IngredientDetails ingredientData={data} /></Modal>}
        </>
    )
}