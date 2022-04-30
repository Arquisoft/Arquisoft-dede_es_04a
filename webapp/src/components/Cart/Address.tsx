import { ChangeEvent, FormEvent, useState } from "react";
import { AddressType, OrderType } from "../../shared/sharedtypes";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import {ReactSession} from 'react-client-session';
import * as userService from '../Services/UserService';
import * as orderService from '../Services/OrderService';

const Address = () => {

    const navigate = useNavigate();

    const initialState = {
        pod: ''
    };

    const initialAdress = {street_address: '',
        locality: '', 
        region: '', 
        postal_code: '', 
        country_name: ''
    };

    const [address, setAddress] = useState<AddressType>( initialAdress );
    const [order] = useState<OrderType>(ReactSession.get("order"));
    const [pod, setPod] = useState<string>(initialState.pod);
    const [cost, setCost] = useState<string>("");
    const [reception, setReception] = useState<string>("");

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPod( e.target.value );
    }

    const getAddress = async () => {
        if(checkPod()){
            let user = ReactSession.get("user");
            try{
                const res = await userService.getAddress(user.token,pod);
                if (res.status === 200){
                    setAddress({street_address: res.data.result.street_address, locality: res.data.result.locality, region: res.data.result.region, postal_code: res.data.result.postal_code, country_name: res.data.result.country_name});
                }       
            }catch(error){
                setPod(initialState.pod);
                toast.error("Wrong pod");
            }      
        }else{
            setPod(initialState.pod);
            toast.error("Pod is empty");
        }
    }

    const checkPod = (): boolean => {
        if (pod.length===0)
            return false;
        return true;
    }

    function addDays(date:Date, days:number):Date {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    const shippingDetails = async () => {
        let user = ReactSession.get("user");
        const response = await orderService.getShippingDetails(user.username,address,user.token);
        if (response.status === 200){
            order.shippingCost=response.data.amount;
            setCost(String(response.data.amount)+"€");

            var today = new Date(Date.now());
            var date = addDays(today,response.data.estimated_days);
            order.receptionDate= date;
            setReception(String(date));
        }
    }

    const accept = async (e: FormEvent<HTMLFormElement>) => {
        order.address=address;
        ReactSession.set("order",order);
        navigate("/cart/payment");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h3>Your address</h3>
                            <label htmlFor="pod">Your pod:</label>
                            <input
                                type="text"
                                name="pod"
                                className="form-control"
                                onChange={inputChange}
                                value={pod}
                            />
                            <button className="btn btn-primary" onClick={() => getAddress()}>
                                Get address
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <div className="card">
                        <div className="card-body">
                            <label htmlFor="country">Country:</label>
                            <input
                                type="text"
                                name="country"
                                className="form-control"
                                value={address.country_name}
                                disabled
                            />
                            <label htmlFor="region">Region:</label>
                            <input
                                type="text"
                                name="region"
                                className="form-control"
                                value={address.region}
                                disabled
                            />  
                            <label htmlFor="locality">Locality:</label>                     
                            <input
                                type="text"
                                name="locality"
                                className="form-control"
                                value={address.locality}
                                disabled
                            />
                            <label htmlFor="street">Street:</label>                        
                            <input
                                type="text"
                                name="street"
                                className="form-control"
                                value={address.street_address}
                                disabled
                            /> 
                            <label htmlFor="postal_code">Postal_code:</label>                     
                            <input
                                type="text"
                                name="postal_code"
                                className="form-control"
                                value={address.postal_code}
                                disabled
                            />                         
                            <button className="btn btn-primary" onClick={() => shippingDetails()} disabled={address === initialAdress}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={accept}>
                                <label htmlFor="shippingCost">Shipping cost:</label>
                                <input
                                    type="text"
                                    name="shippingCost"
                                    className="form-control"
                                    value={cost}
                                    disabled
                                />
                                <label htmlFor="receptionDate">Reception date:</label>
                                <input
                                    type="text"
                                    name="receptionDate"
                                    className="form-control"
                                    value={reception}
                                    disabled
                                />                         
                                <button className="btn btn-primary" disabled={cost === ""}>
                                    Accept
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Address
