import { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import { useDispatch } from 'react-redux';
import { getIngredientsLib } from '../../services/actions/ingredientsLib';
import ConstructorPage from '../../pages/Constructor/Constructor';
import SignInPage from '../../pages/SignIn/SignIn';
import RegisterPage from '../../pages/Register/Register';
import ForgotPasswordPage from '../../pages/ForgotPassword/ForgotPassword';
import ResetPasswordPage from '../../pages/ResetPassword/ResetPassword';
import OrdersFeedPage from '../../pages/OrdersFeed/OrdersFeed';
import ProfilePage from '../../pages/Profile/Profile';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { ProvideAuth } from '../../services/auth';
import IngredientPage from '../../pages/Ingredient/Ingredient';
import NotFound404 from '../../pages/NotFound404/NotFound404';
import { Modal } from '../Modal/Modal';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';

const ModalSwitch = () => {

    const location: any = useLocation();
    const history = useHistory();

    const background = history.action === "PUSH" && location.state && location.state.background;

    return (
        <ProvideAuth>
            <AppHeader />
            <Switch location={background || location}>
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
                <ProtectedRoute path='/profile' exact={false}>
                    <ProfilePage />
                </ProtectedRoute>
                <Route>
                    <NotFound404 />
                </Route>
            </Switch>
            {
                background &&
                <Route path={'/ingredients/:id'}>
                    <Modal closeHandle={() => {history.goBack();}}>
                        <IngredientDetails />
                    </Modal>
                </Route>
            }
        </ProvideAuth>
    );
}

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => dispatch(getIngredientsLib()), [dispatch]);

    return (
        <div className={styles.appCont}>
            <Router>
                <ModalSwitch />
            </Router>
        </div>
    );
}

export default App;
