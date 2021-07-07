import { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { useDispatch } from 'react-redux';
import { GET_INGREDIENTS_LIB_REQUEST, GET_INGREDIENTS_LIB_SUCCESS, GET_INGREDIENTS_LIB_ERROR } from '../../services/actions/api';
import SignInPage from '../../pages/SignIn/SignIn';
import RegisterPage from '../../pages/Register/Register';
import ForgotPasswordPage from '../../pages/ForgotPassword/ForgotPassword';

const App = () => {

    const INGREDIENTS_ENDPOINT: string = 'https://norma.nomoreparties.space/api/ingredients';

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: GET_INGREDIENTS_LIB_REQUEST });
        fetch(INGREDIENTS_ENDPOINT)
        .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(`Status ${response.status}`);
        })
        .then(responseObj => {
            dispatch({ type: GET_INGREDIENTS_LIB_SUCCESS, data: responseObj.data });
        })
        .catch(error => 
            {
                console.error(`Ingredients data receiving error: ${error}`);
                dispatch({ type: GET_INGREDIENTS_LIB_ERROR });
            });
    }, [dispatch]);

    return (
        <div className={styles.appCont}>
            <AppHeader />
            <Router>
                <Route path="/" exact={true}>
                    <main className={styles.main}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </DndProvider>
                    </main>
                </Route>
                <Route path="/login" exact={true}>
                    <SignInPage />
                </Route>
                <Route path="/register" exact={true}>
                    <RegisterPage />
                </Route>
                <Route path="/forgot-password" exact={true}>
                    <ForgotPasswordPage />
                </Route>
            </Router>
        </div>
    );
}

export default App;
