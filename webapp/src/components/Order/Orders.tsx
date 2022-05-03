import{ useState, useEffect} from 'react'
import { OrderType } from "../../shared/sharedtypes"
import { ReactSession } from 'react-client-session';
import * as orderService from '../Services/OrderService';
import OrdersItem from './OrdersItem';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  const loadOrders = async () => {
      let res = await orderService.getOrdersOf(ReactSession.get("user"));
      setOrders(res.data.orders);
  }

  useEffect(() => {
    loadOrders();
  }, [])


  return (
    <div>
      <h1 className='title'>My orders</h1>
      <div className='pedidos'>
        {orders.map(order => 
          {return (<div className="row" key={order._id}>
                    <div className="card">
                      <OrdersItem order={order}/>
                      <Link className="btn btn-primary" type="button" to={"/order/details/"+order._id}>View</Link> 
                    </div>
                  </div>
        )})}
      </div>
    </div>
  )
}

export default Orders
