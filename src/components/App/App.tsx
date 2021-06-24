import { useEffect } from 'react';
import styles from './App.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { useDispatch } from 'react-redux';
import { GET_INGREDIENTS_LIB } from '../../services/actions/api';
import { ADD_ITEM } from '../../services/actions/constructor';

const App = () => {

    const INGREDIENTS_ENDPOINT: string = 'https://norma.nomoreparties.space/api/ingredients';

    const dispatch = useDispatch();

    useEffect(() => {
        fetch(INGREDIENTS_ENDPOINT)
        .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(`Status ${response.status}`);
        })
        .then(responseObj => {
            dispatch({ type: GET_INGREDIENTS_LIB, data: responseObj.data });
            
            dispatch({ type: ADD_ITEM, item: responseObj.data[4] });
            dispatch({ type: ADD_ITEM, item: responseObj.data[3] });
            dispatch({ type: ADD_ITEM, item: responseObj.data[0] });
        })
        .catch(error => console.error(`Ingredients data receiving error: ${error}`));
    }, [dispatch]);

    return (
        <div className={styles.appCont}>
            <AppHeader />
            <main className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            </main>
        </div>
    );
}

export default App;
