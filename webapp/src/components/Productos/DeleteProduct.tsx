import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Producto } from "../../shared/sharedtypes";
import * as productService from '../Services/ProductsService';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { SettingsPowerTwoTone } from "@mui/icons-material";
import {ReactSession} from 'react-client-session';

export const DeleteProduct = () => {

    const productInitialState = {
        category:"",
        name: "",
        description: "",
        urlImage: "",
        basePrice: 0,
        units: 0,
        onSale: true,
        IVA: 0.21
    };

    const[productos, setProductos] = useState<Producto[]>([])
    const [producto, setProducto] = useState<Producto>(productInitialState);
    const [name, setName] = useState<string>("");
    const navigate = useNavigate();

    

    const inputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value )
        findProd()
        console.log("acabe el change")
    }

    const loadProductos = async ()=>{
        const res = await productService.getProductos()
        console.log("carga Prods")
        console.log(res)
        let datos = res.data
        console.log(datos)
        setProductos(datos.products)
    }

    const findProd = () =>{
        console.log("busca Prods")
        productos.forEach( item => {
            if(item.name=== name){
                console.log("encuentra Prods")
                console.log(item.name)
                setProducto(item)    
            }
        });
    }
    const checkEmpty = (): boolean => {
        if (name !== "")
            return true;
        return false;
    }

    const checkNotFound = (): boolean => {
        if (producto.name !== "")
            return true;
        return false;
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("nombre que llega")
        console.log(name)
        if (!checkEmpty()) {
            setName("");
            toast.error("There is any field empty");
        }else if(!checkNotFound()){
            toast.error("The product does not exist");
        }
        else {
            console.log("paso campos")
            try {
                const user = ReactSession.get("user");
                console.log("El producto que llega");
                console.log(producto);
                await productService.deleteProducto(user.username, user.token, producto);
                toast.success("Succesfully deleted");
                navigate('/');
            } catch (error) {
                setProducto(productInitialState);
                toast.error("Error at deleting");
            }
        }
    }

    useEffect(()=>{
        loadProductos()
    }, [])


  return (
    <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Delete Product</h3>
                        <form onSubmit={submit}>
                        <div className="form-group">
                            <a>Product name:</a>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={name}
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
