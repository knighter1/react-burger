import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './ModalOverlay.module.css'
import { Modal, IClosableModal } from '../Modal/Modal';

const modalRoot: HTMLElement = document.getElementById("modals") as HTMLElement;

export const ModalOverlay = (props: IClosableModal): JSX.Element =>
{
    useEffect(() => {
        const escapeKeyDownHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape')
                props.closeHandle();
        }

        document.addEventListener('keydown', escapeKeyDownHandler);
        return () => document.removeEventListener("keydown", escapeKeyDownHandler);
    }, [props]);

    return ReactDOM.createPortal(
        (
            <div className={styles.overlay} onClick={() => props.closeHandle()}>
                <Modal {...props} />
            </div>
        ), 
        modalRoot
    );
}