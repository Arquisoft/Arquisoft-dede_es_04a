import{ useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom';
import { Item, OrderType } from "../../shared/sharedtypes"
import OrderItem  from './OrderItem';
import * as orderService from '../Services/OrderService';

const Order = () => {
  const [productos, setProductos] = useState<Item[]>([]);
  const [order, setOrder] = useState<OrderType>();

  const [searchParams] = useSearchParams();

  const loadOrder = async () => {
    let res = await orderService.getOrder(searchParams.get("id") as string); //this.props.match.params.id
    setOrder(res.data.order)
    setProductos(order?.products as Item[]);
  }

  useEffect(() => {
    loadOrder();
  }, [])

  return (
    <div>
      <h1 className='title'>Pedido {order?._id}</h1>
      <div className='productos'>
        {productos.map(item => 
          {return (<div>
                    <OrderItem producto={item.producto} num={item.num}/>
                  </div>
        )})}
      </div>
      <h2>Total: {order?.totalPrice}€</h2>
    </div>
  )
}

export default Order
