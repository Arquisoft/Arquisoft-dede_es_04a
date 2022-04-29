import { render, fireEvent, act } from "@testing-library/react";
import {DeleteProduct} from "./DeleteProduct";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

jest.mock('../../api/api');

test('check add ok', async () => {
 
  await act(async () => {    
    const {container, getByText} = render(<BrowserRouter><DeleteProduct  /></BrowserRouter>)  
    
    const inputName = container.querySelector('input[name="name"]')!;

    fireEvent.change(inputName, { target: { value: "Graph" } });

    const button = getByText("Submit");
    fireEvent.click(button);
  });
})