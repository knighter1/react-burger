import { useEffect, useState } from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import { DataContext } from '../../services/dataContext';

const App = () => {

    const INGREDIENTS_ENDPOINT: string = 'https://norma.nomoreparties.space/api/ingredients';
    
    const [currentItems, setCurrentItems] = useState<IngredientData[]>([]);
    const [ingredientsData, setIngredientsData] = useState<IngredientData[]>([]);

    useEffect(() => {
        fetch(INGREDIENTS_ENDPOINT)
        .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(`Status ${response.status}`);
        })
        .then(responseObj => { setIngredientsData(responseObj.data); setCurrentItems([responseObj.data[0], responseObj.data[3], responseObj.data[4]]) })
        .catch(error => console.error(`Ingredients data receiving error: ${error}`));
    }, []);

    const onAddItem = (item: IngredientData): void => {
        setCurrentItems([...currentItems, item]);
    };

    return (
        <div className={styles.appCont}>
            <AppHeader />
            <main className={styles.main}>
                <DataContext.Provider value={{ingredients: ingredientsData }}>
                    {ingredientsData.length > 0 && <BurgerIngredients onAddItemHandler={(item: IngredientData) => onAddItem(item)} />}
                </DataContext.Provider>
                {currentItems.length > 0 && <BurgerConstructor items={currentItems} />}
            </main>
        </div>
    );
}

export default App;
