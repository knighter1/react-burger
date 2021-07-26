import { useRef } from 'react';
import styles from './IngredientsListItem.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { REMOVE_ITEM, REORDER_ITEM } from '../../redux/actions/constructor';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { IngredientData } from '../../types/IIngredientData';

interface IConstructorElement {
    type?: 'top' | 'bottom';
    isLocked?: boolean;
    text: string;
    thumbnail: string;
    price: number;
    handleClose?: any
};

interface IIngredientsListItemProps
{
    data: IngredientData;
    index: number;
    type?: "top" | "bottom";
    onClickHandler: Function
}

const IngredientsListItem = ({ data, index, type, onClickHandler }: IIngredientsListItemProps) =>
{
    const dispatch = useDispatch();

    const elementRef = useRef(null);

    const getElementProps = (item: IngredientData) =>
    {
        const elementProps: IConstructorElement = {
            text: item.name,
            price: item.price,
            thumbnail: item.image_mobile,
            type: type,
            isLocked: type ? true : false,
            handleClose: (event: Event) => {
                event.stopPropagation();
                dispatch({ type: REMOVE_ITEM, index: index })
            }
        };

        return elementProps;
    }

    const [{isDrag}, dragRef] = useDrag({
        type: !type ? "reorder" : "",
        item: { data: data, prevIndex: index },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const [, dropRef] = useDrop({
        accept: "reorder",
        drop(item: any) {
            dispatch({ type: REORDER_ITEM, newIndex: index, prevIndex: item.prevIndex });
        },
    });

    dragRef(dropRef(elementRef));

    const elementProps = getElementProps(data);

    const buttonPaddingStyle = elementProps.isLocked ? "pr-8 pl-6" : "pr-2";
    let elementPaddingStyle = elementProps.isLocked ? "pr-4" : "";
    elementPaddingStyle += !elementProps.isLocked ? "mb-2 mt-2" : "";
    
    const className = `${styles.item} ${isDrag ? styles.isDrag : ""}`;

    const location = useLocation();

    return (
        <Link to={{
            pathname: `/ingredients/${data._id}`,
            state: {background: location}
        }}>
            <div className={className} ref={elementRef} >
                <div className={buttonPaddingStyle} >
                    {!elementProps.isLocked && <DragIcon type="primary" />}
                </div>
                <div className={`${elementPaddingStyle} ${styles.element}`} onClick={() => onClickHandler(data)}>
                    <ConstructorElement {...elementProps} />
                </div>
            </div>
        </Link>
    );
}

export default IngredientsListItem;