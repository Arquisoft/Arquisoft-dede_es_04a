import { render, act } from "@testing-library/react";
import Productos from "./Productos";
import {Producto, Item} from '../../shared/sharedtypes'
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../api/api');

test('check register fail', async () => {
  const product:Producto = {category: 'cellular', name: 'IPhone', description: 'a', urlImage:'aaaaa', basePrice: 200, units: 2, onSale: true, IVA: 0.21};
  const listProd: Item[] = [{producto: product, num: 3}];

  const component = render(<BrowserRouter><Productos products={listProd}/></BrowserRouter>);

  component.getByText("Productos");

  
  
})
