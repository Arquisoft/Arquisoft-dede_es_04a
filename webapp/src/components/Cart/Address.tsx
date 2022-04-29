import { ChangeEvent, FormEvent, useState } from "react";
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

    const getAddress = async (e: FormEvent<HTMLFormElement>) => {
        if(checkPod()){
            let user = ReactSession.get("user");
            try{
                const res = await userService.getAddress(user.token,pod);
                console.log(res);
                if (res.status === 200)
                    setAddress({street_address: res.data.street_address, locality: res.data.locality, region: res.data.region, postal_code: res.data.postal_code, country_name: res.data.country_name});           
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
        if (pod === initialState.pod)
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
                        <form onSubmit={getAddress}>
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
                                Get address
                            </button>
                        </form>
                        <form onSubmit={confirm}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="country"
                                    placeholder=""
                                    className="form-control"
                                    value={address.country_name}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="region"
                                    placeholder=""
                                    className="form-control"
                                    value={address.region}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="locality"
                                    placeholder=""
                                    className="form-control"
                                    value={address.locality}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="street"
                                    placeholder=""
                                    className="form-control"
                                    value={address.street_address}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="postal_code"
                                    placeholder=""
                                    className="form-control"
                                    value={address.postal_code}
                                    disabled
                                />
                            </div>
                            <button className="btn btn-primary">
                                Confirm
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Address
