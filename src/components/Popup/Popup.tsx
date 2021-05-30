import { PlaceOrderModal } from '../PlaceOrderModal/PlaceOrderModal';
import { IngredientDetailsModal } from '../IngredientDetailsModal/IngredientDetailsModal';
import styles from './Popup.module.css'

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

interface PopupProps extends IModal {
    closeHandle: Function
}

export const Popup = ({ type, modalData, closeHandle }: PopupProps): JSX.Element =>
{
    let popup: JSX.Element = <div />;

    switch (type)
    {
        case Modals.PlaceOrder:
            modalData = "034536";
            popup = <PlaceOrderModal orderId={modalData} closeHandle={closeHandle} />;
        break;

        case Modals.IngredientDetails:
            popup = <IngredientDetailsModal ingredientData={modalData} closeHandle={closeHandle} />;
        break;
    }

    return (
        <div className={styles.modal}>
            {popup}
        </div>
    )
}