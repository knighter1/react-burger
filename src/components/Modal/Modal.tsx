import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import modalCloseBtnImg from '../../images/modal_close_btn.png';
import { FC } from 'react';

const modalRoot: HTMLElement = document.getElementById("modals") as HTMLElement;

export interface IModal {
    closeHandle: () => void,
    children: JSX.Element
}

export const Modal: FC<IModal> = ({ closeHandle, children }: IModal) =>
{
    return ReactDOM.createPortal( 
       (
            <ModalOverlay closeHandle={() => closeHandle()}>
                <div className={styles.modalContainer} onClick={(event) => event.stopPropagation()}>
                    {children}
                    <img className='modal-close-btn' src={modalCloseBtnImg} onClick={() => closeHandle() } alt="Закрыть" />
                </div>
            </ModalOverlay>
        ),
        modalRoot
    );
}