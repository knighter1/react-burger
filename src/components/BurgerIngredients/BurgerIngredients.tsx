import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientMenuList, IngredientTypes } from '../IngredientMenuList/IngredientMenuList';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import styles from './BurgerIngredients.module.css';

export interface IBurgerIngredientsProps
{
    onAddItemHandler: (item: IngredientData) => void
}

const BurgerIngredients = ( { onAddItemHandler }: IBurgerIngredientsProps) =>
{
    const [currentType, setCurrentType] = useState(IngredientTypes[IngredientTypes.bun]);
    const types: IngredientTypes[] = [IngredientTypes.bun, IngredientTypes.sauce, IngredientTypes.main];

    const setCurrent = (type: string): void =>
    {
        setCurrentType(type);
        document.querySelector('#menu_' + type)?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <section className={styles.section}>
            <div className="text text_type_main-large pt-10 pb-5">Соберите бургер</div>
            <div className={`${styles.menu} pb-10`}>
                {
                    types.map(type => {
                        const handler = (type: string) => setCurrent(type);
                        const state: boolean = currentType === IngredientTypes[type];
                        return (
                            <Tab key={type} value={IngredientTypes[type]} active={state} onClick={handler}>
                                {type}
                            </Tab>
                        )
                    })
                }
            </div>
            <IngredientMenuList onAddItemHandler={onAddItemHandler} />
        </section>   
    )
}

export default BurgerIngredients;