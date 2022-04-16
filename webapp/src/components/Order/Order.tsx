import{ useState, useEffect} from 'react'
import { Item, OrderType } from "../../shared/sharedtypes"
import OrderItem  from './OrderItem';
import * as orderService from './OrderService';

type Id = {
    id: string;  
}

const Order = ({id}: Id) => {
  const [productos, setProductos] = useState<Item[]>([]);
  const [order, setOrder] = useState<OrderType>();

  const loadOrder = async () => {
    let res = await orderService.getOrder(id);
    setOrder(res.data.order)
    setProductos(order?.products as Item[]);
  }

  useEffect(() => {
    loadOrder();
  }, [])

  return (
    <div>
      <h1 className='title'>Pedido {order?.id}</h1>
      <div className='productos'>
        {productos.map(item => 
          {return (<div>
                    <OrderItem producto={item.producto} num={item.num}/>
                  </div>
        )})}
      </div>
      <h2>Total: {order?.price}€</h2>
    </div>
  )
}

export default Order
