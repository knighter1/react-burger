import { useState, useEffect, useReducer } from "react";
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

interface IComponents
{
    first?: IngredientData,
    sortedItems: IngredientData[],
    innerItems: IngredientData[],
    last?: IngredientData
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

const BurgerConstructor = ({items}: IBurgerConstructorProps) =>
{
    const PLACE_ORDER_ENDPOINT: string = 'https://norma.nomoreparties.space/api/orders';

    const [currentItems, setCurrentItems] = useState(items);

    const [components, setComponents] =  useState<IComponents>({sortedItems: [], innerItems: []});

    useEffect(() => {
        const first = currentItems.find(element => element.type === IngredientTypes[IngredientTypes.bun]);
        const last = first;
        const innerItems = currentItems.filter((element) => element.type !== IngredientTypes[IngredientTypes.bun]);
        let sortedItems: IngredientData[] = [...innerItems];

        if (first) sortedItems = [first, ...sortedItems];
        last && sortedItems.push(last);

        setComponents({first: first, sortedItems: sortedItems, innerItems: innerItems, last: last });
    }, [currentItems]);

    console.log(components);

    const [modalState, setModalState] = useState(false);
    const [orderNumber, setOrderNumber] =  useState(0);

    useEffect(() => {
        orderCostDispatch(components.sortedItems);
    }, [components.sortedItems]);

    const onRemoveItem = (id: string): void => setCurrentItems(components.sortedItems.filter(element => element._id !== id));

    const placeOrder = () => {
        
        const ingredients = components.sortedItems.map(item => item._id);

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

    const [orderCost, orderCostDispatch] = useReducer(orderCostReducer, {value: 0}, undefined);

    return (
        <>
            <section className={`${styles.section} ml-10`}>
                <div className={`${styles.scrollableList} pt-25`}>
                    {components.first && <IngredientsListItem type="top" data={components.first} />}
                    {components.innerItems.length > 0 && <IngredientsList items={components.innerItems} onRemoveItemHandle={(id: string) => onRemoveItem(id)} />}
                    {components.last && <IngredientsListItem type="bottom" data={components.last} />}
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
            {modalState && <Modal type={Modals.OrderDetails} closeHandle={() => setModalState(false)} modalData={orderNumber} />}
        </>
    )
}

export default BurgerConstructor;