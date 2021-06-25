import { useState } from 'react';
import styles from './IngredientsListItem.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import { Modal } from '../Modal/Modal';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';

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
    onRemoveItemHandle?: (id: string) => void
}

const IngredientsListItem = ({ data, type, onRemoveItemHandle }: IIngredientsListItemProps) =>
{
    const [modalState, setModalState] = useState(false);

    const getElementProps = (item: IngredientData) =>
    {
        const elementProps: IConstructorElement = {
            text: item.name,
            price: item.price,
            thumbnail: item.image_mobile,
            type: type,
            isLocked: type ? true : false,
            handleClose: onRemoveItemHandle ? onRemoveItemHandle.bind(this, item._id) : undefined
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
                <div className={`${elementPaddingStyle} ${styles.element}`} onClick={() => setModalState(true)}>
                    <ConstructorElement {...elementProps} />
                </div>
            </div>
            {modalState && <Modal closeHandle={() => setModalState(false)}><IngredientDetails ingredientData={data} /></Modal>}
        </>
    );
}

export default IngredientsListItem;