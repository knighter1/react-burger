import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../..';
import { OrderInfoDetails } from '../../components/OrderInfoDetails/OrderInfoDetails';
import { SET_ORDER_DETAIL } from '../../redux/actions/order';

const OrderDetailPage = () =>
{
    const lib = useSelector((store: IStore) => store.ingredientsLib.items);

    const dispatch = useDispatch();

    useEffect(() => {
        lib.length && dispatch({
            type: SET_ORDER_DETAIL,
            orderData: {
                name: 'Death Star Starship Main бургер',
                orderId: 124567,
                ingredients: [lib[0], lib[2], lib[4], lib[5], lib[7], lib[8], lib[10]],
                date: new Date() } });
    }, [dispatch, lib]);

    return (
        <div>
            {<OrderInfoDetails />}
        </div>     
    )
}

export default OrderDetailPage;