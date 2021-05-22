import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientMenuList, IngredientTypes } from '../IngredientMenuList/IngredientMenuList';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import styles from './BurgerIngredients.module.css';

export interface IBurgerIngredientsProps {
    ingredients: IngredientData[];
}

class BurgerIngredients extends React.Component<IBurgerIngredientsProps>
{
    setCurrent()
    {
    }

    render()
    {
        return (
            <section className={styles.section}>
                <div className="text text_type_main-large pt-10 pb-5">Соберите бургер</div>
                <div className={`${styles.menu} pb-10`}>
                    <Tab value={IngredientTypes.Buns} active={true} onClick={this.setCurrent}>
                        {IngredientTypes.Buns}
                    </Tab>
                    <Tab value={IngredientTypes.Sauces} active={false} onClick={this.setCurrent}>
                        {IngredientTypes.Sauces}
                    </Tab>
                    <Tab value={IngredientTypes.Toppings} active={false} onClick={this.setCurrent}>
                        {IngredientTypes.Toppings}
                    </Tab>
                </div>
                <IngredientMenuList ingredients={this.props.ingredients} />
            </section>   
        )
    }
}

export default BurgerIngredients;