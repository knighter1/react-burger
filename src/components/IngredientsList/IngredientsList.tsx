import { useState } from 'react';
import styles from './IngredientsList.module.css';
import IngredientsListItem from '../IngredientsListItem/IngredientsListItem';
import { Modal } from '../Modal/Modal';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { IngredientData } from '../../types/IIngredientData';

interface IIngredientsListProps
{
    items: IngredientData[];
    onClickHandler: (data: IngredientData) => void;
}

const IngredientsList = ({ items, onClickHandler }: IIngredientsListProps) =>
{
    const [modalState, setModalState] = useState(false);

    return (
        <div className={`${styles.list} pl-4 pr-2`}>
            {
                items.map((item, index) => {
                    return <IngredientsListItem key={item._id + index.toString()} data={item} index={index} onClickHandler={onClickHandler} />
                })
            }
            {modalState && <Modal closeHandle={() => setModalState(false)}><IngredientDetails /></Modal>}
        </div>
    )
}

export default IngredientsList;