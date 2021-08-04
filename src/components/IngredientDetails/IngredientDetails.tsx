import styles from './IngredientDetails.module.css';
import { FC, useEffect } from 'react';
import { setIngredient } from '../../redux/actions/ingredient';
import { IngredientData } from '../../types/IIngredientData';
import { useDispatch, useSelector } from '../../hooks';

export const IngredientDetails: FC = () => {

    const ingredientData: IngredientData | null = useSelector(store => store.ingredient);
    
    const dispatch = useDispatch();

    const characteristic = (charName: string, charValue: number) => (
        <ul className={`${styles.charItem}`}>
            <li className='text text_type_main-default text_color_inactive'>{charName}</li>
            <li className='text text_type_digits-default text_color_inactive'>{charValue}</li>
        </ul>
    )

    useEffect(() =>
    {
        return (() => { dispatch(setIngredient(null)) })
    }, [dispatch]);

    if (!ingredientData)
        return null;

    return (
        <div className={`${styles.pageContainer} modal-сontent`}>
            <div className={`${styles.title} text text_type_main-large ml-10 mt-10 mr-10 pt-2`}>
                Детали ингредиента
            </div>
            <img src={ingredientData.image_large} alt={ingredientData.name} />
            <div className={`text text_type_main-medium mt-4 mb-8`}>
                {ingredientData.name}
            </div>
            <div className={`${styles.characteristics} mb-15`}>
                {characteristic('Калории,ккал', ingredientData.calories)}
                {characteristic('Белки, г', ingredientData.proteins)}
                {characteristic('Жиры, г', ingredientData.fat)}
                {characteristic('Углеводы, г', ingredientData.carbohydrates)}
            </div>
        </div>
    );
}