import { useState, useEffect, useReducer } from "react";
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
import { SET_ORDER_ID } from "../../services/actions/order";
import { useDrop } from "react-dnd";
import { IConstructorState } from "../../services/reducers/constructor";

interface IBuns
{
    first?: IngredientData | null,
    last?: IngredientData | null;
}

interface IOrderCost
{
    value: number;
}

function orderCostReducer(state: IOrderCost, items: IngredientData[]): IOrderCost
{
    const value: number = items.reduce((acc, item) => {
        return acc + item.price;
    }, 0);

    return {value: value};
}

const BurgerConstructor = () =>
{
    const PLACE_ORDER_ENDPOINT: string = 'https://norma.nomoreparties.space/api/orders';

    const [buns, setBuns] =  useState<IBuns>({ first: null, last: null });

    const currentItems: IConstructorState = useSelector((store: IStore) => store.constructor);

    const dispatch = useDispatch();

    useEffect(() => {
        const first = Object.assign({}, currentItems.bun);
        const last = Object.assign({}, currentItems.bun);

        first.name += ' (верх)';
        last.name += ' (низ)';

        setBuns({ first: first, last: last });
        
    }, [currentItems]);

    const [modalState, setModalState] = useState(false);

    const getFullIngredients = () => {
        const items = [];
        
        if (currentItems.items)
            items.push(...currentItems.items);

        if (currentItems.bun)
            items.push(currentItems.bun, currentItems.bun);

        return items;
    }

    useEffect(() => {
        const items = getFullIngredients();
        orderCostDispatch(items);
    }, [currentItems]);

    const placeOrder = () => {
        
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
            dispatch({ type: SET_ORDER_ID, orderId: responseObj.order.number });
            setModalState(true); 
        })
        .catch(error => console.error(`Order placing error: ${error}`));
    }

    const [, dropTarget] = useDrop({
        accept: "ingredients",
        drop(ingredientData) {
            dispatch({ type: ADD_ITEM, item: ingredientData });
        },
    });

    const [orderCost, orderCostDispatch] = useReducer(orderCostReducer, {value: 0}, undefined);

    return (
        <>
            <section className={`${styles.section} ml-10`}>
                <div className={`${styles.scrollableList} pt-25`} ref={dropTarget}>
                    {buns.first && <IngredientsListItem type="top" data={buns.first} index={-1} />}
                    {currentItems.items && currentItems.items.length > 0 && <IngredientsList items={currentItems.items} />}
                    {buns.last && <IngredientsListItem type="bottom" data={buns.last} index={-1} />}
                </div>

                <div className={`mt-10 mr-4 ${styles.commitOrderWrapper}`}>
                    <span className="text text_type_digits-medium mr-2">{orderCost.value}</span>
                    <CurrencyIcon type="primary" />
                    <div className={`ml-10 ${styles.buttonWrapper}`}>
                        <Button type="primary" size="large" onClick={() => placeOrder()}>
                            Оформить заказ
                        </Button>
                    </div>
                </div>
            </section>
            {modalState && <Modal closeHandle={() => setModalState(false)}><OrderDetails /></Modal>}
        </>
    )
}

export default BurgerConstructor;