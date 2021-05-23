import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientMenuList, IngredientTypes } from '../IngredientMenuList/IngredientMenuList';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import styles from './BurgerIngredients.module.css';

export interface IBurgerIngredientsProps {
    ingredients: IngredientData[];
}

interface IBurgerIngredientsState
{
    currentType: string;
}

class BurgerIngredients extends React.Component<IBurgerIngredientsProps, IBurgerIngredientsState>
{
    private types: IngredientTypes[];

    constructor(props: IBurgerIngredientsProps)
    {
        super(props);

        this.state = { currentType: IngredientTypes[IngredientTypes.bun] }

        this.types = [IngredientTypes.bun, IngredientTypes.main, IngredientTypes.sauce];
    }

    setCurrent(type: string)
    {
        this.setState({ currentType: type });
        document.querySelector('#menu_' + type)?.scrollIntoView();
    }

    render()
    {
        return (
            <section className={styles.section}>
                <div className="text text_type_main-large pt-10 pb-5">Соберите бургер</div>
                <div className={`${styles.menu} pb-10`}>
                    {
                        this.types.map(type => {
                            const handler = (type: string) => this.setCurrent(type);
                            const state: boolean = this.state.currentType === IngredientTypes[type];
                            return (
                                <Tab key={type} value={IngredientTypes[type]} active={state} onClick={handler}>
                                    {type}
                                </Tab>
                            )
                        })
                    }
                </div>
                <IngredientMenuList ingredients={this.props.ingredients} />
            </section>   
        )
    }
}

export default BurgerIngredients;