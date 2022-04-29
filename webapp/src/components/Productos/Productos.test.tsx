import { render, act } from "@testing-library/react";
import Productos from "./Productos";
import {User} from '../../shared/sharedtypes';
import * as api from '../../api/api';
import * as productService from '../Services/ProductsService';
import {Producto, Item} from '../../shared/sharedtypes'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

jest.mock('../../api/api');

test('check register fail', async () => {
  const product:Producto = {category: 'cellular', name: 'IPhone', description: 'a', urlImage:'aaaaa', basePrice: 200, units: 2, onSale: true, IVA: 0.21};
  const listProd: Item[] = [{producto: product, num: 3}];

  const component = render(<BrowserRouter><Productos products={listProd}/></BrowserRouter>);

  component.getByText("Productos");

  
  
})

test('check productos ok', async () => {
    const res = await productService.getProductos()
   
    let datos = res.data

  jest.spyOn(api,'addUser').mockImplementation((user:User):Promise<boolean> => Promise.resolve(true))
  await act(async () => {    
    const {container, getByText} = render(<Productos  products={datos.products}/>)  
    expect(getByText(datos.products[0].name)).toBeInTheDocument();
    expect(getByText(datos.products[1].name)).toBeInTheDocument();
    expect(getByText(datos.products[2].name)).toBeInTheDocument();
    
  });
})
