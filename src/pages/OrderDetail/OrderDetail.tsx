import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { OrderInfoDetails } from '../../components/OrderInfoDetails/OrderInfoDetails';
import { getOrderById } from '../../redux/actions/orderDetails';
import { useDispatch, useSelector } from '../../redux/reducers';

interface OrderId {
    id: string;
}

const OrderDetailPage = () =>
{
    const lib = useSelector(store => store.ingredientsLib);

    const dispatch = useDispatch();

    const { id } = useParams<OrderId>();

    useEffect(() => {
        lib && lib.items.length && dispatch(getOrderById(id, lib));
    }, [dispatch, id, lib]);

    return (
        <div>
            {<OrderInfoDetails />}
        </div>     
    )
}

export default OrderDetailPage;