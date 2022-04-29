import { ChangeEvent, FormEvent, MouseEventHandler, useState } from "react";
import { AddressType, OrderType } from "../../shared/sharedtypes";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import {ReactSession} from 'react-client-session';
import * as userService from '../Services/UserService';

const Address = () => {

    const navigate = useNavigate();

    const initialState = {
        pod: ''
    };

    const [address, setAddress] = useState<AddressType>( {street_address: '', locality: '', region: '', postal_code: '', country_name: ''} );
    const [order] = useState<OrderType>(ReactSession.get("order"));
    const [pod, setPod] = useState<string>(initialState.pod);

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPod( e.target.value );
    }

    const getAddress = async () => {
        if(checkPod()){
            let user = ReactSession.get("user");
            try{
                const res = await userService.getAddress(user.token,pod);
                if (res.status === 200){
                    console.log(res.data.result)
                    setAddress({street_address: res.data.result.street_address, locality: res.data.result.locality, region: res.data.result.region, postal_code: res.data.result.postal_code, country_name: res.data.result.country_name});
                } 
                console.log(address);       
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
        if (pod.length==0)
            return false;
        return true;
    }

    const confirm = async (e: FormEvent<HTMLFormElement>) => {
        order.address=address;
        ReactSession.set("order",order);
        navigate("/cart/payment");
    }

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Your address</h3>
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
                            <button className="btn btn-primary" onClick={() => getAddress()}>
                                Get address
                            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Address
