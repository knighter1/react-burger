import styles from './ModalOverlay.module.css'
import { Modal, IClosableModal } from '../Modal/Modal';

export const ModalOverlay = (props: IClosableModal): JSX.Element =>
{
    return (
        <div className={styles.overlay} onClick={() => props.closeHandle()}>
            <Modal {...props} />
        </div>
    )
}