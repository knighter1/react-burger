import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import { Popup, Modals } from '../Popup/Popup';
import data from '../../utils/data.json';

interface AppState
{
    currentItems: IngredientData[];
    showModal: Modals
}

class App extends React.Component<object, AppState>
{
    public data: IngredientData[];

    constructor(props: object)
    {
        super(props);

        this.data = data;

        this.state = {
            currentItems: [this.data[0], this.data[1], this.data[2]],
            showModal: Modals.None
        }
    }

    onAddItem(item: IngredientData): void
    {
        this.setState(prevState => {
            return { 
                ...prevState,
                currentItems: [...prevState.currentItems, item],
                showModal: Modals.IngredientDetails
            }
        });
    }

    onShowModal(modalType: Modals): void
    {
        this.setState(prevState => {
            return { 
                ...prevState,
                showModal: modalType
            }
        });
    }

    onCloseModal(): void
    {
        this.setState(prevState => {
            return { 
                ...prevState,
                showModal: Modals.None
            }
        });
    }

    render()
    {
        return (
            <div className={styles.appCont}>
                <AppHeader />
                <main className={styles.main}>
                    <BurgerIngredients ingredients={this.data} onAddItemHandler={(item: IngredientData) => this.onAddItem(item)} />
                    <BurgerConstructor items={this.state.currentItems} showModal={(modalType: Modals) => this.onShowModal(modalType)} />
                </main>
                {this.state.showModal !== Modals.None && <Popup type={this.state.showModal} closeHandle={() => this.onCloseModal()} object={{ingredientData: this.data[0]}} />}
            </div>
        );
    }
}

export default App;
