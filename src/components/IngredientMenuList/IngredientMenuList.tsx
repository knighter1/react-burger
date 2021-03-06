import { IngredientMenuItem } from '../IngredientMenuItem/IngredientMenuItem';
import styles from './IngredientMenuList.module.css';
import { FC, LegacyRef, useEffect } from 'react';
import { useInView } from "react-intersection-observer";
import { IngredientData } from '../../types/IIngredientData';
import { useSelector } from '../../hooks';

interface IIngredientMenuListProps
{
    changeTypeHandler: (ingredintType: string) => void;
}

export enum IngredientTypes
{
    bun,
    sauce,
    main
}

export const INGREDIENTS_NAMES: string[] = ["Булки", "Соусы", "Начинки"];

export const IngredientMenuList: FC<IIngredientMenuListProps> = ({changeTypeHandler}) =>
{
    const ingredients = useSelector(store => store.ingredientsLib.items);

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

    const renderCategory = (type: IngredientTypes, data: IngredientData[], elementRef: LegacyRef<HTMLDivElement>) =>
    {
        if (!data.length)
            return null;

        return (
            <div key={IngredientTypes[type]} className={styles.categoryBlock} ref={elementRef}>
                <span id={`menu_${IngredientTypes[type]}`} className={`${styles.listCategory} text text_type_main-medium pt-2`}>{INGREDIENTS_NAMES[type]}</span>
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