import styles from './IngredientDetails.module.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setIngredient } from '../../redux/actions/ingredient';
import { IngredientData } from '../../types/IIngredientData';
import { useSelector } from '../../redux/reducers';

export const IngredientDetails = (): JSX.Element => {

    const ingredientData: IngredientData = useSelector(store => store.ingredient) as IngredientData;
    
    const dispatch = useDispatch();

    const characteristic = (charName: string, charValue: number) => (
        <ul className={`${styles.charItem}`}>
            <li className='text text_type_main-default text_color_inactive'>{charName}</li>
            <li className='text text_type_digits-default text_color_inactive'>{charValue}</li>
        </ul>
    )

    const dropIngredient: any = () => {
        return () => dispatch(setIngredient(null));
    }
    useEffect(dropIngredient, [dispatch]);

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