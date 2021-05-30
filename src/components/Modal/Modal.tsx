import { OrderDetails } from '../OrderDetails/OrderDetails';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import styles from './Modal.module.css'

export enum Modals
{
    None = "none",
    PlaceOrder = "place-order",
    IngredientDetails = "ingredient-details",
}

export interface IModal {
    type: Modals,
    modalData?: any,
}

interface IClosableModal extends IModal {
    closeHandle: Function
}

export const Modal = ({ type, modalData, closeHandle }: IClosableModal): JSX.Element =>
{
    let popup: JSX.Element = <div />;

    switch (type)
    {
        case Modals.PlaceOrder:
            modalData = "034536";
            popup = <OrderDetails orderId={modalData} closeHandle={closeHandle} />;
        break;

        case Modals.IngredientDetails:
            popup = <IngredientDetails ingredientData={modalData} closeHandle={closeHandle} />;
        break;
    }

    return (
        <div className={styles.modal}>
            {popup}
        </div>
    )
}