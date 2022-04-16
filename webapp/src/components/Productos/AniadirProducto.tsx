import { ChangeEvent, FormEvent, useState } from "react";
import { Producto } from "../../shared/sharedtypes";
import * as productosService from './ProductosService';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const AniadirProducto = () => {

    const navigate = useNavigate();

    const initialState = {
        categoria:"",
        name: "",
        description: "",
        urlImage: "",
        price: 0,
        units: 0,
        onSale: true,
    };

    const [producto, setProducto] = useState<Producto>(initialState);

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                await productosService.addProducto(producto);
                toast.success("Succesfully registered");
                navigate('/');
            } catch (error) {
                setProducto(initialState);
                toast.error("Username or email are already used");
            }
        }
    }

    const checkPrice = (): boolean => {
        if (producto.price !== 0)
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
                        <form onSubmit={submit}>
                        <div className="form-group">
                                <input
                                    type="text"
                                    name="categoria"
                                    placeholder="Categoria"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={producto.categoria}
                                    autoFocus
                                />
                            </div>


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
                                    name="urlImagen"
                                    placeholder="urlImagen"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={producto.urlImage}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={producto.price}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="number"
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