import styles from './Modal.module.css';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import modalCloseBtnImg from '../../images/modal_close_btn.png';

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
            popup = <OrderDetails orderId={modalData} />;
        break;

        case Modals.IngredientDetails:
            popup = <IngredientDetails ingredientData={modalData} />;
        break;
    }

    return (
        <div className={styles.modalContainer} onClick={(event) => event.stopPropagation()}>
            {popup}
            <img className='modal-close-btn' src={modalCloseBtnImg} onClick={() => closeHandle() } alt="Закрыть" />
        </div>
    )
}