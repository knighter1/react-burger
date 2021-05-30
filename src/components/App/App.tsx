import { useState } from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import { Popup, Modals, IModal } from '../Popup/Popup';
import data from '../../utils/data.json';

const App = () => {
    
    const [showModal, setShowModal] = useState<IModal>({ type:Modals.None });
    const [currentItems, setCurrentItems] = useState<IngredientData[]>(data.slice(0, 3));

    const onAddItem = (item: IngredientData): void => {
        setCurrentItems([...currentItems, item]);
        setShowModal({ type: Modals.IngredientDetails, modalData: item });
    };
        
    const onShowModal = (modalType: Modals, modalData?: object): void => setShowModal({ type: modalType, modalData: modalData });

    const onCloseModal = (): void => onShowModal(Modals.None);

    return (
        <div className={styles.appCont}>
            <AppHeader />
            <main className={styles.main}>
                <BurgerIngredients ingredients={data} onAddItemHandler={(item: IngredientData) => onAddItem(item)} />
                <BurgerConstructor items={currentItems} showModal={(modalType: Modals) => onShowModal(modalType)} />
            </main>
            {showModal.type !== Modals.None && <Popup type={showModal.type} closeHandle={() => onCloseModal()} modalData={showModal.modalData} />}
        </div>
    );
}

export default App;
