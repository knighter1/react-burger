import { OrderDetails } from '../OrderDetails/OrderDetails';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';

export enum Modals
{
    None = "none",
    OrderDetails = "order-details",
    IngredientDetails = "ingredient-details",
}

export interface IModal {
    type: Modals,
    modalData?: any,
}

export interface IClosableModal extends IModal {
    closeHandle: Function
}

export const Modal = ({ type, modalData, closeHandle }: IClosableModal) =>
{
    let popup: JSX.Element = <div />;

    switch (type)
    {
        case Modals.OrderDetails:
            modalData = "034536";
            popup = <OrderDetails orderId={modalData} closeHandle={closeHandle} />;
        break;

        case Modals.IngredientDetails:
            popup = <IngredientDetails ingredientData={modalData} closeHandle={closeHandle} />;
        break;
    }

    return (
        <>
            {popup}
        </>
    )
}