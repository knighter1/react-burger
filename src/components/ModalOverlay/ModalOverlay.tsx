import { useEffect } from 'react';
import styles from './ModalOverlay.module.css'

interface IModalOverlayProps
{
    closeHandle: Function;
    children: JSX.Element;
}

export const ModalOverlay = ({ closeHandle, children }: IModalOverlayProps): JSX.Element =>
{
    useEffect(() => {
        const escapeKeyDownHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape')
                closeHandle();
        }

        document.addEventListener('keydown', escapeKeyDownHandler);
        return () => document.removeEventListener("keydown", escapeKeyDownHandler);
    }, [closeHandle]);

    return (
        <div className={styles.overlay} onClick={() => closeHandle()}>
            {children}
        </div>
    )
}