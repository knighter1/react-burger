import { FC, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientMenuList, INGREDIENTS_NAMES, IngredientTypes } from '../IngredientMenuList/IngredientMenuList';
import styles from './BurgerIngredients.module.css';

const BurgerIngredients: FC = () =>
{
    const [currentType, setCurrentType] = useState(IngredientTypes[IngredientTypes.bun]);
    const types: IngredientTypes[] = [IngredientTypes.bun, IngredientTypes.sauce, IngredientTypes.main];

    const setCurrentTab = (type: string): void =>
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
                        const handler = (type: string) => setCurrentTab(type);
                        const state: boolean = currentType === IngredientTypes[type];
                        return (
                            <Tab key={type} value={IngredientTypes[type]} active={state} onClick={handler}>
                                {INGREDIENTS_NAMES[type]}
                            </Tab>
                        )
                    })
                }
            </div>
            <IngredientMenuList changeTypeHandler={(type: string) => setCurrentType(type)} />
        </section>   
    )
}

export default BurgerIngredients;