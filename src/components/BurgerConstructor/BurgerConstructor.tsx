import React from "react";
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import IngredientsList from '../IngredientsList/IngredientsList';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import IngredientsListItem from '../IngredientsListItem/IngredientsListItem';
interface IBurgerConstructorProps
{
    items: IngredientData[];
}

class BurgerConstructor extends React.Component<IBurgerConstructorProps>
{
    render()
    {
        const totalOrderCost: number = this.props.items.reduce((acc, item) => {
            return acc + item.price;
        }, 0);

        return (
            <section className={`${styles.section} ml-10`}>
                
                <div className={`${styles.scrollableList} pt-25`}>
                    <IngredientsListItem type="top" data={this.props.items[0]} />
                    <IngredientsList items={this.props.items} />
                    <IngredientsListItem type="bottom" data={this.props.items[this.props.items.length - 1]} />
                </div>

                <div className={`mt-10 mr-4 ${styles.commitOrderWrapper}`}>
                    <span className="text text_type_digits-medium mr-2">{totalOrderCost}</span>
                    <CurrencyIcon type="primary" />
                    <div className={`ml-10 ${styles.buttonWrapper}`}>
                        <Button type="primary" size="large">
                            Оформить заказ
                        </Button>
                    </div>
                </div>
            </section>
        )
    }
}

export default BurgerConstructor;