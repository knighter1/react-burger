import { useState } from 'react';
import styles from './IngredientMenuItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../Modal/Modal';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { useDispatch, useSelector } from 'react-redux';
import { SET_INGREDIENT } from '../../services/actions/ingredient';
import { useDrag } from 'react-dnd';
import { IStore } from '../..';

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
    const [modalState, setModalState] = useState(false);

    const dispatch = useDispatch();

    const onItemClick = () =>
    {
        dispatch({ type: SET_INGREDIENT, ingredientData: data });
        setModalState(true);
    }

    const [{isDrag}, dragRef] = useDrag({
        type: "ingredients",
        item: data,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const handler = () => onItemClick();

    const className = `${styles.menuItem} mt-6 mb-8 ml-4 mr-2 ${isDrag ? styles.isDrag : ''}`;

    const count = useSelector((store: IStore) => {
        
        const items: IngredientData[] = store.constructor.items
        let countResult: number = items ? items.filter(item => item._id === data._id).length : 0;

        if (data === store.constructor.bun)
            countResult = 2;

        return countResult;
    });

    return (
        <>
            <div className={className}
                onClick={handler}
                ref={dragRef} >
                {count > 0 && <Counter count={count} size="default" />}

                <img className="ml-4 mr-4" src={data.image} alt={data.name} />
                <div className={`mt-1 mb-1" ${styles.priceBlock}`}>
                    <span className={`text text_type_digits-default pr-2 ${styles.price}`}>{data.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <span className="text_type_main-default">{data.name}</span>
            </div>
            {modalState && <Modal closeHandle={() => setModalState(false)}><IngredientDetails /></Modal>}
        </>
    )
}