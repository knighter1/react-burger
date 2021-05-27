import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import { Popup } from '../Popup/Popup';
import data from '../../utils/data.json';

class App extends React.Component
interface AppState
{
    currentItems: IngredientData[];
    showModal: string
}

class App extends React.Component<object, AppState>
{
    public data: IngredientData[];

    constructor(props: object)
    {
        super(props);

        this.data = data;

        this.state = {
            showModal: "place-order"
        }
    }
    onCloseModal(): void
    {
        this.setState(prevState => {
            return { 
                ...prevState,
                showModal: ""
            }
        });
    }

    render()
    {
        return (
            <div className={styles.appCont}>
                <AppHeader />
                <main className={styles.main}>
                    <BurgerIngredients ingredients={this.data} />
                    <BurgerConstructor items={this.data} />
                </main>
                {this.state.showModal !== "" && <Popup type={this.state.showModal} close={() => this.onCloseModal()} />}
            </div>
        );
    }
}

export default App;
