import { ChangeEvent, FormEvent, useState } from "react";
import { PaymentMean } from "../../shared/sharedtypes";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import {ReactSession} from 'react-client-session';
import * as orderService from '../Services/OrderService';
import {OrderType} from '../../shared/sharedtypes';

const Payment = () => {

    const navigate = useNavigate();

    const initialState = {
        name: '',
        surname: '',
        code: '', 
        date: '',
        cvv: ''
    };

    const [payment, setPayment] = useState<PaymentMean>({ name: '', surname: '', code: '', date: '', cvv: '' });

    const [order] = useState<OrderType>(ReactSession.get("order"));

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPayment({ ...payment, [e.target.name]: e.target.value })
    }

    const pay = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(checkPaymentMean()){
            let products = new Map<string,number>();
            order.products.map(i => products.set(i.producto.name,i.num));
            var orderDate = new Date(Date.now());
            try{
                const res = await orderService.createNewOrder(products,order.address!,order.user.email!,order.shippingCost!,String(order.totalPrice),orderDate,order.receptionDate!,"PREPARING",order.user.token!);
                if(res.status===200){
                    ReactSession.set("order",undefined);
                    toast.success("Payment accepted");
                    navigate("/");
                }
            }catch(error){
                setPayment(initialState);
                toast.error("Somthing was wrong");
            }
        }
    }

    const checkPaymentMean = (): boolean => {
        if (!checkEmpty()) {
            setPayment(initialState);
            toast.error("There is any field empty");
            return false;
        }
        return checkParams();
    }

    const checkEmpty = (): boolean => {
        if (payment.name === initialState.name)
            return false;
        if (payment.surname === initialState.surname)
            return false;
        if (payment.code === initialState.code)
            return false;
        if (payment.date === initialState.date)
            return false;
        if (payment.cvv === initialState.cvv)
            return false;
        return true;
    }

    const checkParams = (): boolean => {
        if (isNaN(Number(payment.code))){
            toast.error("code can only contain numbers");
            return false;
        }
        if (payment.code.length!=16){
            toast.error("creditcard code length must be 16");
            return false;
        }
        if (isNaN(Number(payment.cvv))){
            toast.error("cvv can only contain numbers");
            return false;
        }
        if(payment.cvv.length!==3){
            toast.error("cvv length must be 3");
            return false;
        }
        return true;
    }

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Payment</h3>
                        <form onSubmit={pay}>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                onChange={inputChange}
                                value={payment.name}
                                autoFocus
                            />                        
                            <label htmlFor="surname">Surname:</label>
                            <input
                                type="text"
                                name="surname"
                                className="form-control"
                                onChange={inputChange}
                                value={payment.surname}
                            />
                            <label htmlFor="code">CreditCard code:</label>
                            <input
                                type="text"
                                name="code"
                                className="form-control"
                                onChange={inputChange}
                                value={payment.code}
                            />
                            <label htmlFor="date">Expiration date:</label>
                            <input
                                type="text"
                                name="date"
                                placeholder="01/22"
                                className="form-control"
                                onChange={inputChange}
                                value={payment.date}
                            />
                            <label htmlFor="cvv">CVV:</label>
                            <input
                                type="text"
                                name="cvv"
                                placeholder="999"
                                className="form-control"
                                onChange={inputChange}
                                value={payment.cvv}
                            />
                            <button className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
