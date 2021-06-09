import { useState, useEffect } from "react";
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import IngredientsList from '../IngredientsList/IngredientsList';
import { IngredientData } from '../IngredientMenuItem/IngredientMenuItem';
import IngredientsListItem from '../IngredientsListItem/IngredientsListItem';
import { Modals, Modal } from '../Modal/Modal';
import { IngredientTypes } from '../IngredientMenuList/IngredientMenuList';

interface IBurgerConstructorProps
{
    items: IngredientData[];
}

interface IBuns
{
    first?: IngredientData,
    last?: IngredientData
}

const BurgerConstructor = ({items}: IBurgerConstructorProps) =>
{
    const PLACE_ORDER_ENDPOINT: string = 'https://norma.nomoreparties.space/api/orders';
    
    useEffect(() => {
        const first = items.find(element => element.type === IngredientTypes[IngredientTypes.bun]);
        const last = first;
        last && items.push(last);
        last && setBuns({first: first, last: last });
    }, [items]);

    const [currentItems, setItems] = useState(items);
    const [modalState, setModalState] = useState(false);
    const [buns, setBuns] =  useState<IBuns>({});
    const [orderNumber, setOrderNumber] =  useState(0);

    const onRemoveItem = (id: string): void => setItems(currentItems.filter(element => element._id !== id));

    const totalOrderCost: number = currentItems.reduce((acc, item) => {
        return acc + item.price;
    }, 0);

    const innerItems = currentItems.filter((element) => element.type !== IngredientTypes[IngredientTypes.bun]);

    const placeOrder = () => {
        
        const ingredients = currentItems.map(item => item._id);
        
        //currentItems.forEach(item => console.log(item.name));
        //console.log("ingredients: ", ingredients);

        fetch(PLACE_ORDER_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ingredients: ingredients})
          })
        .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(`Status ${response.status}`);
        })
        .then(responseObj => { setModalState(true); setOrderNumber(responseObj.order.number); })
        .catch(error => console.error(`Order placing error: ${error}`));
    }

    return (
        <>
            <section className={`${styles.section} ml-10`}>
                <div className={`${styles.scrollableList} pt-25`}>
                    {buns.first && <IngredientsListItem type="top" data={buns.first} />}
                    {currentItems.length && <IngredientsList items={innerItems} onRemoveItemHandle={(id: string) => onRemoveItem(id)} />}
                    {buns.last && <IngredientsListItem type="bottom" data={buns.last} />}
                </div>

                <div className={`mt-10 mr-4 ${styles.commitOrderWrapper}`}>
                    <span className="text text_type_digits-medium mr-2">{totalOrderCost}</span>
                    <CurrencyIcon type="primary" />
                    <div className={`ml-10 ${styles.buttonWrapper}`}>
                        <Button type="primary" size="large" onClick={() => placeOrder()}>
                            Оформить заказ
                        </Button>
                    </div>
                </div>
            </section>
            {modalState && <Modal type={Modals.OrderDetails} closeHandle={() => setModalState(false)} modalData={orderNumber} />}
        </>
    )
}

export default BurgerConstructor;