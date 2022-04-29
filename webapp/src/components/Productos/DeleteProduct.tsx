import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Producto } from "../../shared/sharedtypes";
import * as productService from '../Services/ProductsService';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { SettingsPowerTwoTone } from "@mui/icons-material";

export const DeleteProduct = () => {

    const productInitialState = {
        categories:[],
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
    const [name, setName] = useState<string>();
    const navigate = useNavigate();

    

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value )
        findProd()
        setProducto(producto)
    }

    const loadProductos = async ()=>{
        const res = await productService.getProductos()
        console.log(res)
        let datos = res.data
        console.log(datos)
        setProductos(datos.products)
    }

    const findProd = () =>{
        productos.forEach( item => {
            if(item.name=== name){
                setProducto(item)    
            }
        });
    }
    const checkEmpty = (): boolean => {
        if (name !== "")
            return true;
        return false;
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!checkEmpty()) {
            setName("");
            toast.error("There is any field empty");
        }
        else {
            try {
                await productService.deleteProducto(producto);
                toast.success("Succesfully added");
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
