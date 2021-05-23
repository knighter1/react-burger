import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './IngredientMenuItem.module.css';

export interface IngredientData
{
    _id: string;
    type: string;
    name: string;
    price: number;
    image: string;
    image_large: string;
    image_mobile: string;
}

interface IIngredientMenuItemProps
{
    data: IngredientData;
    count?: number;
}

interface IIngredientMenuItemState
{
    count: number;
}

export class IngredientMenuItem extends React.Component<IIngredientMenuItemProps, IIngredientMenuItemState>
{
    private data: IngredientData;

    constructor(props: IIngredientMenuItemProps)
    {
        super(props);

        this.data = props.data;

        this.state = { count: props.count ? props.count : 0 }
    }

    onItemClick()
    {
        this.setState(prevState => ( {count: prevState.count + 1 }));
    }

    render()
    {
        const handler = () => { this.onItemClick() };

        return (
            <div className={`${styles.menuItem} mt-6 mb-8 ml-4 mr-2`}
                onClick={handler} >
                {this.state.count > 0 && <Counter count={this.state.count} size="default" />}
   
                <img className="ml-4 mr-4" src={this.data.image} alt={this.data.name} />
                <div className={`mt-1 mb-1" ${styles.priceBlock}`}>
                    <span className={`text text_type_digits-default pr-2 ${styles.price}`}>{this.data.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <span className="text_type_main-default">{this.data.name}</span>
            </div>
        );
    }
}