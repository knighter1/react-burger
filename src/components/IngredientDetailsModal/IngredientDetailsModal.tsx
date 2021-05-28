import styles from './IngredientDetailsModal.module.css';
import modalCloseBtnImg from '../../images/modal_close_btn.png';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';

interface IIngredientDetailsModalProps
{
    ingredientData: IngredientData,
    closeHandle: Function
}

export const IngredientDetailsModal = ({ ingredientData, closeHandle }: IIngredientDetailsModalProps) => {

    const characteristic = (charName: string, charValue: number) => (
        <ul className={`${styles.charItem}`}>
            <li className='text text_type_main-default text_color_inactive'>{charName}</li>
            <li className='text text_type_digits-default text_color_inactive'>{charValue}</li>
        </ul>
    )

    return (
        <div className={`${styles.container} modal-сontent`}>
            <div className={`${styles.title} text text_type_main-large ml-10 mt-10 mr-10 pt-2`}>
                Детали ингредиента
            </div>
            <img src={ingredientData.image_large} />
            <div className={`text text_type_main-medium mt-4 mb-8`}>
                {ingredientData.name}
            </div>
            <img className={styles.modalCloseBtn} src={modalCloseBtnImg} onClick={(e) => closeHandle()} />
            <div className={`${styles.characteristics} mb-15`}>
                {characteristic('Калории,ккал', ingredientData.calories)}
                {characteristic('Белки, г', ingredientData.proteins)}
                {characteristic('Жиры, г', ingredientData.fat)}
                {characteristic('Углеводы, г', ingredientData.carbohydrates)}
            </div>
        </div>
    );
}