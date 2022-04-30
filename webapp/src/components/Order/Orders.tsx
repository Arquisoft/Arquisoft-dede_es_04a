import{ useState, useEffect} from 'react'
import { OrderType } from "../../shared/sharedtypes"
import { ReactSession } from 'react-client-session';
import * as orderService from '../Services/OrderService';
import OrdersItem from './OrdersItem';
import { useNavigate } from 'react-router';

const Orders = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const navigate = useNavigate();

  const loadOrders = async () => {
    let res = await orderService.getOrdersOf(ReactSession.get("user"));
    setOrders(res.data.orders);
  }

  useEffect(() => {
    loadOrders();
  }, [])

  const show = (order:OrderType) => {
    navigate('/orders/details/'+order._id);
  }

  return (
    <div>
      <h1 className='title'>My orders</h1>
      <div className='pedidos'>
        {orders.map(order => 
          {return (<div className="row">
                    <div className="card">
                      <OrdersItem order={order}/>
                      <button className="btn btn-primary" onClick={() => show(order)}>Mostrar</button> 
                    </div>
                  </div>
        )})}
      </div>
    </div>
  )
}

export default Orders
