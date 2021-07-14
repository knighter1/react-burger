import styles from './IngredientDetails.module.css';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../..';
import { useEffect } from 'react';
import { SET_INGREDIENT } from '../../services/actions/ingredient';
import { useHistory, useLocation } from 'react-router-dom';

export const IngredientDetails = (): JSX.Element => {

    const ingredientData: IngredientData = useSelector((store: IStore) => store.ingredient) as IngredientData;
    
    const dispatch = useDispatch();

    const characteristic = (charName: string, charValue: number) => (
        <ul className={`${styles.charItem}`}>
            <li className='text text_type_main-default text_color_inactive'>{charName}</li>
            <li className='text text_type_digits-default text_color_inactive'>{charValue}</li>
        </ul>
    )

    window.history.replaceState(null, '', `/ingredients/${ingredientData._id}`)

    const dropIngredient: any = () => {
        return () => dispatch({ type: SET_INGREDIENT, ingredientData: null });
    }
    useEffect(dropIngredient, [dispatch]);

    const location = useLocation();
    const getContStyle = () => {
        if (location.pathname.indexOf('/ingredient') === 0)
            return `${styles.pageContainer} modal-сontent`
        
        return `${styles.container} modal-сontent`
    }

    return (
        <div className={getContStyle()}>
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