import { useContext } from 'react';
import { IngredientMenuItem } from '../IngredientMenuItem/IngredientMenuItem';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import styles from './IngredientMenuList.module.css';
import { DataContext } from '../../services/dataContext';

export interface IIngredientMenuListProps
{
    onAddItemHandler: (item: IngredientData) => void;
}

export enum IngredientTypes
{
    bun = "Булки" as any,
    sauce = "Соусы" as any,
    main = "Начинки" as any
}

export const IngredientMenuList = ({ onAddItemHandler }: IIngredientMenuListProps) =>
{
    const { ingredients } = useContext(DataContext);

    const bunsList: IngredientData[] = ingredients.filter(element => element.type === IngredientTypes[IngredientTypes.bun]);
    const mainList: IngredientData[] = ingredients.filter(element => element.type === IngredientTypes[IngredientTypes.main]);
    const saucesList: IngredientData[] = ingredients.filter(element => element.type === IngredientTypes[IngredientTypes.sauce]);

    const renderCategory = (type: IngredientTypes, data: IngredientData[]) =>
    {
        if (!data.length)
            return null;

        return (
            <div key={IngredientTypes[type]} className={styles.categoryBlock}>
                <span id={`menu_${IngredientTypes[type]}`} className={`${styles.listCategory} text text_type_main-medium pt-2`}>{type}</span>
                {
                    data.map(element => <IngredientMenuItem key={element._id} data={element} onAddItemHandler={onAddItemHandler} />)
                }
            </div>
        );
    }

    let categories = [
        renderCategory(IngredientTypes.bun, bunsList),
        renderCategory(IngredientTypes.sauce, saucesList),
        renderCategory(IngredientTypes.main, mainList)
    ];

    return (
        <div className={styles.list}>
            { categories.map(category => category) }   
        </div>
    );
}