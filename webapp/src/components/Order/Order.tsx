import{ useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { OrderType } from "../../shared/sharedtypes";
import * as orderService from '../Services/OrderService';
import {ReactSession} from 'react-client-session';

type Product = {
    name:string,
    num:number
}

const Order = () => {
  const [productos,setProductos] = useState<Product[]>([]);
  const [order, setOrder] = useState<OrderType>();

  const params = useParams();

  const loadOrder = async () => {
    let user = ReactSession.get("user");
    let res = await orderService.getOrder(params._id as string,user.token);
    if(res.data.order){
      setOrder(res.data.order)
      let prods:Product[] = [];
      for(var p in res.data.order.products){
        var product = {name:p,num:res.data.order.products[p]};
        prods.push(product);
      }
      setProductos(prods); 
    }
  }

  useEffect(() => {
    loadOrder();
  })

  return (
    <div>
      <h1 className='title'>Order {order?._id}</h1>
      <div className='row'>
        <ol>
        {productos.map(item => 
          {
            return (
                  <li key={item.name}>
                    <h2>{item.name} x {item.num}</h2>
                  </li>
        )})}
        </ol>
      </div>
      <h2>Total: {order?.totalPrice}€</h2>
    </div>
  )
}

export default Order
