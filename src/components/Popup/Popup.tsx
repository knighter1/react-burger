import { PlaceOrderModal } from '../PlaceOrderModal/PlaceOrderModal';
import { IngredientDetailsModal } from '../IngredientDetailsModal/IngredientDetailsModal';
import styles from './Popup.module.css'

export enum Modals
{
    None = "none",
    PlaceOrder = "place-order",
    IngredientDetails = "ingredient-details",
}

interface PopupProps {
    type: Modals,
    object?: any,
    closeHandle: Function
}

export const Popup = ({ type, object, closeHandle }: PopupProps): JSX.Element => {
    
    let popup: JSX.Element = <div />;
    switch (type)
    {
        case Modals.PlaceOrder:
            popup = <PlaceOrderModal orderId={"034536"} closeHandle={closeHandle} />;
        break;

        case Modals.IngredientDetails:
            popup = <IngredientDetailsModal ingredientData={object.ingredientData} closeHandle={closeHandle} />;
        break;
    }

    console.log(type);

    return (
        <div className={styles.modal}>
            {popup}
        </div>
    )
}