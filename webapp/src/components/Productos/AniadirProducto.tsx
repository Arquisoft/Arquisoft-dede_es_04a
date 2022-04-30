import { ChangeEvent, FormEvent, useState } from "react";
import { Producto } from "../../shared/sharedtypes";
import * as productsService from '../Services/ProductsService';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import {ReactSession} from 'react-client-session';

const AniadirProducto = () => {

    const navigate = useNavigate();

    const initialState = {
        category:"",
        name: "",
        description: "",
        urlImage: "",
        basePrice: 0,
        units: 0,
        onSale: true,
        IVA: 0.21
    };

    const [producto, setProducto] = useState<Producto>(initialState);

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProducto({ ...producto, [e.target.name]: e.target.value })
        console.log("Cambio" + e.target.name)
        console.log(producto)
    }

    const inputChangeCat = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("nombre")
        console.log(e.target.value)
        setProducto({ ...producto, [e.target.name]: e.target.value })
        
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!checkEmpty()) {
            setProducto(initialState);
            toast.error("There is any field empty");
        }
        else if (!checkPrice()) {
            setProducto(initialState);
            toast.error("The price must be more than 0");
        }
        else {
            try {
                const user = ReactSession.get("user");
                await productsService.addProducto(user.username, user.token, producto);
                toast.success("Succesfully added");
                navigate('/');
            } catch (error) {
                setProducto(initialState);
                toast.error("Error at adding");
            }
        }
    }

    const checkPrice = (): boolean => {
        if (producto.basePrice !== 0)
            return true;
        return false;
    }

    const checkEmpty = (): boolean => {
        if (producto.name === initialState.name)
            return false;
        if (producto.description === initialState.description)
            return false;
        if (producto.urlImage === initialState.urlImage)
            return false;
        return true;
    }

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Nuevo Producto</h3>
                        <form onSubmit={submit} encType="multipart/form-data">
                    

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={producto.name}
                                    autoFocus
                                />
                            </div>


                            <div className="form-group">
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={producto.description}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="category"
                                    placeholder="Categories"
                                    className="form-control"
                                    onChange={inputChangeCat}
                                    value={producto.category}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="urlImage"
                                    placeholder="UrlImage"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={producto.urlImage}
                                ></input>
                            </div>

                           
                            <div className="form-group">
                                <input
                                    type="number"
                                    name="basePrice"
                                    placeholder="Price"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={producto.basePrice}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type= "number"
                                    name="units"
                                    placeholder="Units"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={producto.units}
                                    autoFocus
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

export default AniadirProducto