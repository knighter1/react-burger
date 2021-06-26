import { useState, useEffect } from "react";
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import IngredientsList from '../IngredientsList/IngredientsList';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import IngredientsListItem from '../IngredientsListItem/IngredientsListItem';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { useDispatch, useSelector } from "react-redux";
import { IStore } from '../../index';
import { ADD_ITEM } from "../../services/actions/constructor";
import { PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS, PLACE_ORDER_ERROR } from "../../services/actions/order";
import { useDrop } from "react-dnd";
import { IConstructorState } from "../../services/reducers/constructor";
import { SET_INGREDIENT } from "../../services/actions/ingredient";

interface IBuns
{
    first?: IngredientData | null,
    last?: IngredientData | null;
}

const BurgerConstructor = () =>
{
    const PLACE_ORDER_ENDPOINT: string = 'https://norma.nomoreparties.space/api/orders';

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
        }
        
    }, [currentItems]);

    const [ingredientsModalState, setIngredientsModalState] = useState(false);
    const [orderModalState, setOrderModalState] = useState(false);

    const getFullIngredients = () => {
        const items = [];
        
        if (currentItems.items)
            items.push(...currentItems.items);

        if (currentItems.bun)
            items.push(currentItems.bun, currentItems.bun);

        return items;
    }

    const placeOrder = () => {
        
        if (!(currentItems.items && currentItems.items.length) || !currentItems.bun)
            return;

        dispatch({ type: PLACE_ORDER_REQUEST });
        fetch(PLACE_ORDER_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ingredients: getFullIngredients()})
        })
        .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(`Status ${response.status}`);
        })
        .then(responseObj => {
            dispatch({ type: PLACE_ORDER_SUCCESS, orderId: responseObj.order.number });
            setOrderModalState(true); 
        })
        .catch(error => {
            dispatch({ type: PLACE_ORDER_ERROR });
            console.error(`Order placing error: ${error}`)
        });
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
        setIngredientsModalState(true);
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
                        <Button type="primary" size="large" onClick={() => placeOrder()}>
                            Оформить заказ
                        </Button>
                    </div>
                </div>
            </section>
            {orderModalState && <Modal closeHandle={() => setOrderModalState(false)}><OrderDetails /></Modal>}
            {ingredientsModalState && <Modal closeHandle={() => setIngredientsModalState(false)}><IngredientDetails /></Modal>}
        </>
    )
}

export default BurgerConstructor;