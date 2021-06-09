import { useState } from "react";
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

const BurgerConstructor = ({items}: IBurgerConstructorProps) =>
{
    const [currentItems, setItems] = useState(items);
    const [modalState, setModalState] = useState(false);

    const onRemoveItem = (id: string): void => setItems(currentItems.filter(element => element._id !== id));

    const totalOrderCost: number = currentItems.reduce((acc, item) => {
        return acc + item.price;
    }, 0);

    const first = currentItems.find(element => element.type === IngredientTypes[IngredientTypes.bun]);
    const last = first;
    
    const innerItems = currentItems.filter((element) => element.type !== IngredientTypes[IngredientTypes.bun]);

    return (
        <>
            <section className={`${styles.section} ml-10`}>
                <div className={`${styles.scrollableList} pt-25`}>
                    {first && <IngredientsListItem type="top" data={first} />}
                    {currentItems.length && <IngredientsList items={innerItems} onRemoveItemHandle={(id: string) => onRemoveItem(id)} />}
                    {last && <IngredientsListItem type="bottom" data={last} />}
                </div>

                <div className={`mt-10 mr-4 ${styles.commitOrderWrapper}`}>
                    <span className="text text_type_digits-medium mr-2">{totalOrderCost}</span>
                    <CurrencyIcon type="primary" />
                    <div className={`ml-10 ${styles.buttonWrapper}`}>
                        <Button type="primary" size="large" onClick={() => setModalState(true)}>
                            Оформить заказ
                        </Button>
                    </div>
                </div>
            </section>
            {modalState && <Modal type={Modals.OrderDetails} closeHandle={() => setModalState(false)} modalData={"034536"} />}
        </>
    )
}

export default BurgerConstructor;