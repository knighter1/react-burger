import { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import { useDispatch } from 'react-redux';
import { GET_INGREDIENTS_LIB_REQUEST, GET_INGREDIENTS_LIB_SUCCESS, GET_INGREDIENTS_LIB_ERROR } from '../../services/actions/api';
import ConstructorPage from '../../pages/Constructor/Constructor';
import SignInPage from '../../pages/SignIn/SignIn';
import RegisterPage from '../../pages/Register/Register';
import ForgotPasswordPage from '../../pages/ForgotPassword/ForgotPassword';
import ResetPasswordPage from '../../pages/ResetPassword/ResetPassword';
import OrdersFeedPage from '../../pages/OrdersFeed/OrdersFeed';
import ProfilePage from '../../pages/Profile/Profile';
import ProfileOrdersPage from '../../pages/ProfileOrders/ProfileOrders';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { ProvideAuth } from '../../services/auth';
import IngredientPage from '../../pages/Ingredient/Ingredient';
import NotFound404 from '../../pages/NotFound404/NotFound404';

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
            <Router>
                <ProvideAuth>
                    <AppHeader />
                    <Switch>
                        <Route path="/" exact={true}>
                            <ConstructorPage />
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
                        <Route path="/reset-password" exact={true}>
                            <ResetPasswordPage />
                        </Route>
                        <Route path="/feed">
                            <OrdersFeedPage />
                        </Route>
                        <Route path='/ingredients/:id'>
                            <IngredientPage />
                        </Route>
                        <ProtectedRoute path='/profile' exact={true}>
                            <ProfilePage />
                        </ProtectedRoute>
                        <ProtectedRoute path='/profile/orders' exact={true}>
                            <ProfileOrdersPage />
                        </ProtectedRoute>
                        <Route>
                            <NotFound404 />
                        </Route>
                    </Switch>
                </ProvideAuth>
            </Router>
        </div>
    );
}

export default App;
