import { IngredientMenuItem } from '../IngredientMenuItem/IngredientMenuItem';
import styles from './IngredientMenuList.module.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useInView } from "react-intersection-observer";
import { TStore } from '../../redux/reducers';
import { IngredientData } from '../../types/IIngredientData';

interface IIngredientMenuListProps
{
    changeTypeHandler: Function
}

export enum IngredientTypes
{
    bun = "Булки" as any,
    sauce = "Соусы" as any,
    main = "Начинки" as any
}

export const IngredientMenuList: React.FC<IIngredientMenuListProps> = ({changeTypeHandler}) =>
{
    const ingredients: IngredientData[] = useSelector((store: TStore) => store.ingredientsLib.items) as IngredientData[];

    const bunsList: IngredientData[] = ingredients ? ingredients.filter(element => element.type === IngredientTypes[IngredientTypes.bun]) : [];
    const mainList: IngredientData[] = ingredients ? ingredients.filter(element => element.type === IngredientTypes[IngredientTypes.main]) : [];
    const saucesList: IngredientData[] = ingredients ? ingredients.filter(element => element.type === IngredientTypes[IngredientTypes.sauce]) : [];

    const viewSets = {
        threshold: 0,
    };

    const [bunsRef, inViewBuns] = useInView(viewSets);
    const [mainRef, inViewMain] = useInView(viewSets);
    const [saucesRef, inViewSauces] = useInView(viewSets);

    useEffect(() => {
        if (inViewBuns) {
            changeTypeHandler(IngredientTypes[IngredientTypes.bun]);
        }
        else if (inViewSauces) {
            changeTypeHandler(IngredientTypes[IngredientTypes.sauce]);
        }
        else if (inViewMain) {
            changeTypeHandler(IngredientTypes[IngredientTypes.main]);
        }
    }, [inViewBuns, inViewMain, inViewSauces, changeTypeHandler]);

    const renderCategory = (type: IngredientTypes, data: IngredientData[], elementRef: any) =>
    {
        if (!data.length)
            return null;

        return (
            <div key={IngredientTypes[type]} className={styles.categoryBlock} ref={elementRef}>
                <span id={`menu_${IngredientTypes[type]}`} className={`${styles.listCategory} text text_type_main-medium pt-2`}>{type}</span>
                {
                    data.map(element => <IngredientMenuItem key={element._id} data={element} />)
                }
            </div>
        );
    }

    const categories = [
        renderCategory(IngredientTypes.bun, bunsList, bunsRef),
        renderCategory(IngredientTypes.sauce, saucesList, saucesRef),
        renderCategory(IngredientTypes.main, mainList, mainRef)
    ];

    return (
        <div className={styles.list}>
            { categories }
        </div>
    );
}