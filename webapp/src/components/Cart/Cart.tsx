import{ useState, useEffect} from 'react';
import { ReactSession } from 'react-client-session';
import CartItem from "./CartItem";
import { OrderType, Item} from "../../shared/sharedtypes";
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type Products = {
  products: Item[];
}

const Carrito = (props: Products) => {
  const [price, setPrice] = useState<number>(0);
  const navigate = useNavigate();

  const calculateTotalPrice = () =>{
    setPrice(0);
    let total = 0;
    for(var i = 0;i<props.products.length;i++){
        var producto = props.products[i];
        total += (producto.producto.basePrice + (producto.producto.basePrice * producto.producto.IVA)) * producto.num;
    }
    setPrice(Number(total.toFixed(2)));
  }

  useEffect(()=>{
    calculateTotalPrice();
  }, [])

  const removeFromCart = (producto: Item)=>{
    props.products.forEach( item => {
        if(item.producto.name===producto.producto.name){
            var pos = props.products.indexOf(item);
            if(item.num-1 === 0){
              props.products.splice(pos, 1);
            }else{
              item.num-=1;
            }
        }
    });
    calculateTotalPrice();
  }

  const addFromCart = (producto: Item)=>{
    props.products.forEach( item => {
        if(item.producto.name===producto.producto.name){
            item.num+=1;   
        }
    });
    calculateTotalPrice();
  }

  const createOrder = ()=>{
    let order : OrderType = {_id:"" , user: ReactSession.get("user"), products: props.products, totalPrice: price};
    ReactSession.set("order",order);
    navigate("/cart/address");
  }

  return (
    <div>
      <h1 className='title'>My cart</h1>
      <div className='productos'>
        {props.products.map(item => 
          {
            return (
              <div key={item.producto.name} >
                  <CartItem producto={item.producto} num={item.num}/>
                  <div className="buttom">
                      <a href="#" className="btn" onClick={() => addFromCart(item)}><AddIcon fontSize='large'/></a>
                      <a href="#" className="btn" onClick={() => removeFromCart(item)}><RemoveIcon fontSize='large'/></a>               
                  </div>
              </div>
        )})}
      </div>
      <h2>Total: {price}€</h2>
      <button className="btn btn-primary" onClick={()=>createOrder()} disabled={props.products.length===0}>Finalize order</button>
    </div>
  )
}
export default Carrito
