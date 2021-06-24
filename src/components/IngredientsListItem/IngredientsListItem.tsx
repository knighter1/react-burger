import { useState } from 'react';
import styles from './IngredientsListItem.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import { Modal } from '../Modal/Modal';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { REMOVE_ITEM } from '../../services/actions/constructor';
import { useDispatch } from 'react-redux';

interface IConstructorElement {
    type?: 'top' | 'bottom';
    isLocked?: boolean;
    text: string;
    thumbnail: string;
    price: number;
    handleClose?: () => void;
};

interface IIngredientsListItemProps
{
    data: IngredientData;
    type?: "top" | "bottom";
}

const IngredientsListItem = ({ data, type }: IIngredientsListItemProps) =>
{
    const [modalState, setModalState] = useState(false);

    const dispatch = useDispatch();

    const getElementProps = (item: IngredientData) =>
    {
        const elementProps: IConstructorElement = {
            text: item.name,
            price: item.price,
            thumbnail: item.image_mobile,
            type: type,
            isLocked: type ? true : false,
            handleClose: () => dispatch({ type: REMOVE_ITEM, item: item })
        };

        return elementProps;
    }

    const elementProps = getElementProps(data);

    const buttonPaddingStyle = elementProps.isLocked ? "pr-8 pl-6" : "pr-2";
    let elementPaddingStyle = elementProps.isLocked ? "pr-4" : "";
    elementPaddingStyle += !elementProps.isLocked ? "mb-2 mt-2" : "";
    
    return (
        <>
            <div className={styles.item}>
                <div className={buttonPaddingStyle}>
                    {!elementProps.isLocked && <DragIcon type="primary" />}
                </div>
                <div className={`${elementPaddingStyle} ${styles.element}`}>
                    <ConstructorElement {...elementProps} />
                </div>
            </div>
            {modalState && <Modal closeHandle={() => setModalState(false)}><IngredientDetails /></Modal>}
        </>
    );
}

export default IngredientsListItem;