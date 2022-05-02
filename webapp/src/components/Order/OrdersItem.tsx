import { OrderType } from "../../shared/sharedtypes";

interface Props{
    order: OrderType;  
}

const OrdersItem = (props: Props) => {  

    

  return (
        <div>
          <h1>Id:{props.order._id}</h1>
          <h3>{props.order.status}</h3>
          <p>Importe: {props.order.totalPrice}€ - Reception date: {props.order.receptionDate}</p>
        </div>
  );
}

export default OrdersItem