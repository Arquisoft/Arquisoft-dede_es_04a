import { render, fireEvent, act } from "@testing-library/react";
import Productos from "./AniadirProducto";


jest.mock('../../api/api');

test('check add ok', async () => {
 
  await act(async () => {    
    const {container, getByText} = render(<Productos  />)  
    
    const inputCategoria = container.querySelector('input[name="categoria"]')!;
    const inputName = container.querySelector('input[name="name"]')!;
    const inputDescription = container.querySelector('input[name="description"]')!;
    const inputURL = container.querySelector('input[name="urlImagen"]')!;
    const inputPrice = container.querySelector('input[name="price"]')!;
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
  test('check add fail', async () => {
 
    await act(async () => {    
      const {container, getByText} = render(<Productos  />)  
      
      const inputCategoria = container.querySelector('input[name="categoria"]')!;
      const inputName = container.querySelector('input[name="name"]')!;
      const inputDescription = container.querySelector('input[name="description"]')!;
      const inputURL = container.querySelector('input[name="urlImagen"]')!;
      const inputPrice = container.querySelector('input[name="price"]')!;
      const inputUnits = container.querySelector('input[name="units"]')!;
      fireEvent.change(inputName, { target: { value: "" } });
      fireEvent.change(inputCategoria, { target: { value: "" } });
      fireEvent.change(inputDescription, { target: { value: "" } });
      fireEvent.change(inputURL, { target: { value: "./images/carrito.png" } });
      fireEvent.change(inputUnits, { target: { value: 5 } });
      fireEvent.change(inputPrice, { target: { value: 320 } });
      const button = getByText("Submit");
      fireEvent.click(button);
    });
})