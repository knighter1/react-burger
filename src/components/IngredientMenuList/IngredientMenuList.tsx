import React from 'react';
import { IngredientMenuItem } from '../IngredientMenuItem/IngredientMenuItem';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import styles from './IngredientMenuList.module.css';

export interface IIngredientMenuListProps {
    ingredients: IngredientData[];
}

export enum IngredientTypes
{
    Buns = "Булки",
    Sauces = "Соусы",
    Toppings = "Начинки",
    Main = "Основное"
}

export class IngredientMenuList extends React.Component<IIngredientMenuListProps>
{
    private bunsList: IngredientData[];
    private saucesList: IngredientData[];
    private mainList: IngredientData[];
    private topingsList: IngredientData[];

    constructor(props: IIngredientMenuListProps)
    {
        super(props);

        this.bunsList = props.ingredients.filter(element => element.type === "bun");
        this.mainList = props.ingredients.filter(element => element.type === "main");
        this.saucesList = props.ingredients.filter(element => element.type === "sauce");
        this.topingsList = props.ingredients.filter(element => element.type === "topings");
    }

    renderCategory(type: IngredientTypes, data: IngredientData[])
    {
        if (!data.length)
            return;

        return (
            <>
                {<span className={`${styles.listCategory} text text_type_main-medium pt-2`}>{type}</span>}
                {
                    data.map(element => {
                        if (element._id === "60666c42cc7b410027a1a9b1")
                            return <IngredientMenuItem key={element._id} data={element} count={2} />
                            
                        return <IngredientMenuItem key={element._id} data={element} />
                    })
                }
            </>
        );
    }

    render()
    {
        let categories = [];
        categories.push(this.renderCategory(IngredientTypes.Buns, this.bunsList));
        categories.push(this.renderCategory(IngredientTypes.Main, this.mainList));
        categories.push(this.renderCategory(IngredientTypes.Sauces, this.saucesList));
        categories.push(this.renderCategory(IngredientTypes.Toppings, this.topingsList));

        return (
            
            <div className={styles.list}>
                { categories.map(category => category) }   
            </div>
        );
    }
}