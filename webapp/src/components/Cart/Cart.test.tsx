import { render } from "@testing-library/react";
import Cart from "./Cart";
import {Producto, Item} from '../../shared/sharedtypes'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

test('check the cart renders correctly', async () => {
    const product:Producto = {categories: 'cellular', name: 'IPhone', description: 'a', urlImage:'aaaaa', price: 200, units: 2, onSale: true };
    const listProd: Item[] = [{producto: product, num: 3}];
    const {getByText} = render(<BrowserRouter><Cart products={listProd}/></BrowserRouter>);
    expect(getByText(listProd[0].num)).toBeInTheDocument();  
  });