import { ChangeEvent, FormEvent, useState } from "react";
import { PaymentMean } from "../../shared/sharedtypes";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import {ReactSession} from 'react-client-session';
import * as orderService from '../Services/OrderService';

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

    const [pod, setPod] = useState<string>();

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPayment({ ...payment, [e.target.name]: e.target.value })
    }

    const pay = async (e: FormEvent<HTMLFormElement>) => {
        let order = ReactSession.get("order");
        if(checkPaymentMean()){
            orderService.createNewOrder(order);
            ReactSession.set("order",undefined);
            toast.success("Payment accepted");
            navigate("/");
        }else{
            setPayment(initialState);
            toast.error("Wrong paymentmean");
        }
    }

    const checkPaymentMean = (): boolean => {
        if (!checkEmpty()) {
            setPayment(initialState);
            toast.error("There is any field empty");
            return false;
        }
        return true;
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

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Payment</h3>
                        <form onSubmit={pay}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={payment.name}
                                    autoFocus
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="surname"
                                    placeholder="Surname"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={payment.surname}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="code"
                                    placeholder="Code"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={payment.code}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="date"
                                    placeholder="date"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={payment.date}
                                />
                                <input
                                    type="text"
                                    name="cvv"
                                    placeholder="CVV"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={payment.date}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="pod"
                                    placeholder="Pod"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={pod}
                                />
                            </div>
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
