import { ReactElement, useRef } from 'react';
import styles from './IngredientsListItem.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { constructorRemoveItem, constructorReorderItem } from '../../redux/actions/constructor';
import { useDrag, useDrop } from 'react-dnd';
import { IngredientData } from '../../types/IIngredientData';
import { useDispatch } from '../../redux/reducers';

interface IConstructorElement {
    type?: 'top' | 'bottom';
    isLocked?: boolean;
    text: string;
    thumbnail: string;
    price: number;
    handleClose?: (event: Event) => void;
};

interface IIngredientsListItemProps
{
    data: IngredientData;
    index: number;
    type?: "top" | "bottom";
    onClickHandler: (data: IngredientData) => void;
}

const IngredientsListItem = ({ data, index, type, onClickHandler }: IIngredientsListItemProps): ReactElement =>
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
                dispatch(constructorRemoveItem(index))
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
            dispatch(constructorReorderItem(item.prevIndex, index))
        },
    });

    dragRef(dropRef(elementRef));

    const elementProps = getElementProps(data);

    const buttonPaddingStyle = elementProps.isLocked ? "pr-8 pl-6" : "pr-2";
    let elementPaddingStyle = elementProps.isLocked ? "pr-4" : "";
    elementPaddingStyle += !elementProps.isLocked ? "mb-2 mt-2" : "";
    
    const className = `${styles.item} ${isDrag ? styles.isDrag : ""}`;

    return (
        <div className={className} ref={elementRef} >
            <div className={buttonPaddingStyle} >
                {!elementProps.isLocked && <DragIcon type="primary" />}
            </div>
            <div className={`${styles.element} ${elementPaddingStyle}`} onClick={() => onClickHandler(data)}>
                <ConstructorElement {...elementProps} />
            </div>
        </div>
    );
}

export default IngredientsListItem;