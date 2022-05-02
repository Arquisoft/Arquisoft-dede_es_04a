import { render } from "@testing-library/react";
import Navbar from "./Navbar";
import {Producto, Item} from '../../shared/sharedtypes'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

test('check that the list of users renders propertly', async () => {
    const product:Producto = {category: 'cellular', name: 'IPhone', description: 'a', urlImage:'aaaaa', basePrice: 200, units: 2, onSale: true, IVA: 0.21 };
    const listProd: Item[] = [{producto: product, num: 3}];
    const {getByText} = render(<BrowserRouter><Navbar products={listProd}/></BrowserRouter>);
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByText('Register')).toBeInTheDocument();
    expect(getByText('TechZone')).toBeInTheDocument();
  });