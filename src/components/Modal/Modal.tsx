import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import modalCloseBtnImg from '../../images/modal_close_btn.png';

const modalRoot: HTMLElement = document.getElementById("modals") as HTMLElement;

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
    let modalContent: JSX.Element = <div />;

    switch (type)
    {
        case Modals.OrderDetails:
            modalContent = <OrderDetails orderId={modalData} />;
        break;

        case Modals.IngredientDetails:
            modalContent = <IngredientDetails ingredientData={modalData} />;
        break;
    }

    return ReactDOM.createPortal( 
       (
            <ModalOverlay closeHandle={() => closeHandle()}>
                <div className={styles.modalContainer} onClick={(event) => event.stopPropagation()}>
                    {modalContent}
                    <img className='modal-close-btn' src={modalCloseBtnImg} onClick={() => closeHandle() } alt="Закрыть" />
                </div>
            </ModalOverlay>
        ),
        modalRoot
    );
}