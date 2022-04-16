
interface Props{
    id: string;
    price: number;   
}

const OrdersItem = ({id, price}: Props) => {  

    

  return (
        <h1>Id:{id}     Importe: {price}€</h1>
  );
}

export default OrdersItem