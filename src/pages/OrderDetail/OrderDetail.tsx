import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { OrderInfoDetails } from '../../components/OrderInfoDetails/OrderInfoDetails';
import { getOrderById } from '../../redux/actions/orderDetails';
import { IStore } from '../../redux/reducers';

const OrderDetailPage = () =>
{
    const lib = useSelector((store: IStore) => store.ingredientsLib);

    const dispatch = useDispatch();

    const { id }: any = useParams();

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