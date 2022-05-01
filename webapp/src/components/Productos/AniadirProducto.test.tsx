import { render, fireEvent, act } from "@testing-library/react";
import Productos from "./AniadirProducto";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

jest.mock('../../api/api');

test('check add ok', async () => {
 
  await act(async () => {    
    const {container, getByText} = render(<BrowserRouter><Productos  /></BrowserRouter>)  
    
    const inputCategoria = container.querySelector('input[name="category"]')!;
    const inputName = container.querySelector('input[name="name"]')!;
    const inputDescription = container.querySelector('input[name="description"]')!;
    const inputURL = container.querySelector('input[name="urlImage"]')!;
    const inputPrice = container.querySelector('input[name="basePrice"]')!;
    const inputUnits = container.querySelector('input[name="units"]')!;
    fireEvent.change(inputName, { target: { value: "Graph" } });
    fireEvent.change(inputCategoria, { target: { value: "categoria" } });
    fireEvent.change(inputDescription, { target: { value: "aaaa" } });
    fireEvent.change(inputURL, { target: { value: "./images/carrito.png" } });
    fireEvent.change(inputUnits, { target: { value: 5 } });
    fireEvent.change(inputPrice, { target: { value: 320 } });
    const button = getByText("Submit");
    fireEvent.click(button);
  });
})