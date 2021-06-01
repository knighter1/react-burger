import { useEffect, useState } from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { Modals, IModal } from '../Modal/Modal';

const App = () => {

    const INGREDIENTS_ENDPOINT: string = 'https://norma.nomoreparties.space/api/ingredients';
    
    const [showModal, setShowModal] = useState<IModal>({ type:Modals.None });
    const [currentItems, setCurrentItems] = useState<IngredientData[]>([]);
    const [ingredientsData, setIngredientsData] = useState<IngredientData[]>([]);

    useEffect(() => {
        fetch(INGREDIENTS_ENDPOINT)
        .then(response => response.json())
        .then(responseObj => { setIngredientsData(responseObj.data); setCurrentItems([responseObj.data[0], responseObj.data[1], responseObj.data[2]]) })
        .catch(error => console.error(`Ingredients data receiving error: ${error}`));
    }, []);

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
                {ingredientsData.length && <BurgerIngredients ingredients={ingredientsData} onAddItemHandler={(item: IngredientData) => onAddItem(item)} />}
                {currentItems.length && <BurgerConstructor items={currentItems} showModal={(modalType: Modals) => onShowModal(modalType)} />}
            </main>
            {showModal.type !== Modals.None && <ModalOverlay type={showModal.type} closeHandle={() => onCloseModal()} modalData={showModal.modalData} />}
        </div>
    );
}

export default App;
