import{ useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { OrderType } from "../../shared/sharedtypes";
import * as orderService from '../Services/OrderService';
import {ReactSession} from 'react-client-session';
import jsPDF from 'jspdf';
import DownloadIcon from '@mui/icons-material/Download';

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

  const download = () => {
      var doc = new jsPDF('landscape','px','a4',false);
      doc.text('TechZone - Invoice',120,100);
      doc.text("Order "+ order?._id!,120,120);
      var j = 0;
      for (var i = 0; i < productos.length; i ++){
        doc.text(i+"."+" "+productos[i].name+" x"+productos[i].num,120,140+j)
        j+=20;
      }
      doc.text("Total: "+order?.totalPrice+"$",120,140+j)
      doc.save('invoice.pdf')
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
      <h2>Total: {order?.totalPrice}$</h2>
      <button className='btn btn-primary' onClick={download}><DownloadIcon/> Invoice</button>
    </div>
  )
}

export default Order
