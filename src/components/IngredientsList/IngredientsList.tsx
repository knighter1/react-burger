import React from 'react';
import styles from './IngredientsList.module.css';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import IngredientsListItem from '../IngredientsListItem/IngredientsListItem';

interface IIngredientsListProps
{
    items: IngredientData[];
}

class IngredientsList extends React.Component<IIngredientsListProps>
{
    render()
    {
        return (
            <div className={`${styles.list} pl-4 pr-2`}>
                {
                    this.props.items.map((item, index) => {
                        return <IngredientsListItem key={index} data={item} />
                    })
                }
            </div>
        )
    }
}

export default IngredientsList;