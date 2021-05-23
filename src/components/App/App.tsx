import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import data from '../../utils/data.json';

class App extends React.Component
{
    public data: IngredientData[];

    constructor(props: object)
    {
        super(props);

        this.data = data;
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
            </div>
        );
    }
}

export default App;
