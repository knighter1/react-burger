import React from 'react';
import { IngredientMenuItem } from '../IngredientMenuItem/IngredientMenuItem';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import styles from './IngredientMenuList.module.css';

export interface IIngredientMenuListProps {
    ingredients: IngredientData[];
}

export enum IngredientTypes
{
    bun = "Булки" as any,
    sauce = "Соусы" as any,
    main = "Начинки" as any
}

export class IngredientMenuList extends React.Component<IIngredientMenuListProps>
{
    private bunsList: IngredientData[];
    private saucesList: IngredientData[];
    private mainList: IngredientData[];

    constructor(props: IIngredientMenuListProps)
    {
        super(props);

        this.bunsList = props.ingredients.filter(element => element.type === IngredientTypes[IngredientTypes.bun]);
        this.mainList = props.ingredients.filter(element => element.type === IngredientTypes[IngredientTypes.main]);
        this.saucesList = props.ingredients.filter(element => element.type === IngredientTypes[IngredientTypes.sauce]);
    }

    renderCategory(type: IngredientTypes, data: IngredientData[])
    {
        if (!data.length)
            return;

        return (
            <>
                {<span id={`menu_${IngredientTypes[type]}`} className={`${styles.listCategory} text text_type_main-medium pt-2`}>{type}</span>}
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
        categories.push(this.renderCategory(IngredientTypes.bun, this.bunsList));
        categories.push(this.renderCategory(IngredientTypes.main, this.mainList));
        categories.push(this.renderCategory(IngredientTypes.sauce, this.saucesList));

        return (
            
            <div className={styles.list}>
                { categories.map(category => category) }   
            </div>
        );
    }
}