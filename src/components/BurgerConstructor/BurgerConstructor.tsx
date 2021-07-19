import { useState, useEffect } from "react";
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import IngredientsList from '../IngredientsList/IngredientsList';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import IngredientsListItem from '../IngredientsListItem/IngredientsListItem';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { useDispatch, useSelector } from "react-redux";
import { IStore } from '../../index';
import { ADD_ITEM } from "../../services/actions/constructor";
import { useDrop } from "react-dnd";
import { IConstructorState } from "../../services/reducers/constructor";
import { useAuth } from "../../services/auth";
import { useHistory } from "react-router-dom";
import { placeOrder } from "../../services/actions/order";
import { SET_INGREDIENT } from "../../services/actions/ingredient";

interface IBuns
{
    first?: IngredientData | null,
    last?: IngredientData | null;
}

const BurgerConstructor = () =>
{
    const [buns, setBuns] =  useState<IBuns>({ first: null, last: null });

    const currentItems: IConstructorState = useSelector((store: IStore) => store.constructor);

    const dispatch = useDispatch();

    useEffect(() => {

        if (currentItems.bun)
        {
            const first = Object.assign({}, currentItems.bun);
            const last = Object.assign({}, currentItems.bun);

            first.name += ' (верх)';
            last.name += ' (низ)';

            setBuns({ first: first, last: last });
            return;
        }
        
        setBuns({ first: null, last: null });
        
    }, [currentItems, setBuns]);

    const [orderModalState, setOrderModalState] = useState(false);

    const { user }: any = useAuth();

    const history = useHistory();

    const placeOrderHandler = () => {
        
        if (!user)
            history.replace('/login');

        if (!(currentItems.items && currentItems.items.length) || !currentItems.bun)
            return;

        dispatch(placeOrder(currentItems, setOrderModalState));
    }

    const [, dropTarget] = useDrop({
        accept: "ingredients",
        drop(ingredientData) {
            dispatch({ type: ADD_ITEM, item: ingredientData });
        },
    });

    const onIngredientClick = (data: IngredientData) =>
    {
        dispatch({ type: SET_INGREDIENT, ingredientData: data });
    }

    const ingredientClickHandler = (data: IngredientData) => onIngredientClick(data);

    return (
        <>
            <section className={`${styles.section} ml-10`}>
                <div className={`${styles.scrollableList} pt-25`} ref={dropTarget}>
                    {buns.first && <IngredientsListItem type="top" data={buns.first} index={-1} onClickHandler={ingredientClickHandler} /> }
                    {currentItems.items && currentItems.items.length > 0 && <IngredientsList items={currentItems.items} onClickHandler={ingredientClickHandler} />}
                    {buns.last && <IngredientsListItem type="bottom" data={buns.last} index={-1} onClickHandler={ingredientClickHandler} />}
                </div>

                <div className={`mt-10 mr-4 ${styles.commitOrderWrapper}`}>
                    <span className="text text_type_digits-medium mr-2">{currentItems.cost ? currentItems.cost : 0}</span>
                    <CurrencyIcon type="primary" />
                    <div className={`ml-10 ${styles.buttonWrapper}`}>
                        <Button type="primary" size="large" onClick={() => placeOrderHandler()}>
                            Оформить заказ
                        </Button>
                    </div>
                </div>
            </section>
            {orderModalState && <Modal closeHandle={() => setOrderModalState(false)}><OrderDetails /></Modal>}
        </>
    )
}

export default BurgerConstructor;