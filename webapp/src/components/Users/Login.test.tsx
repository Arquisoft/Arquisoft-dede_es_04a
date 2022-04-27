import { render, fireEvent, act } from "@testing-library/react";
import Login from "./Login";

test('check login ok', async () => {
    await act(async () => {    
      const {container, getByText} = render(<Login />)  
      const inputName = container.querySelector('input[name="username"]')!;
      const inputPassword = container.querySelector('input[name="password"]')!;

      fireEvent.change(inputName, { target: { value: "pablo" } });
      fireEvent.change(inputPassword, { target: { value: "pablo" } });

      const button = getByText("Submit");
      fireEvent.click(button);
    });
})

test('check login fail', async () => {
    await act(async () => {    
      const {container, getByText} = render(<Login />)  
      const inputName = container.querySelector('input[name="username"]')!;
      const inputPassword = container.querySelector('input[name="password"]')!;

      fireEvent.change(inputName, { target: { value: "" } });
      fireEvent.change(inputPassword, { target: { value: "pablo" } });

      const button = getByText("Submit");
      fireEvent.click(button);
    });
})


test('check login fail no register', async () => {
    await act(async () => {    
      const {container, getByText} = render(<Login />)  
      const inputName = container.querySelector('input[name="username"]')!;
      const inputPassword = container.querySelector('input[name="password"]')!;

      fireEvent.change(inputName, { target: { value: "klchv" } });
      fireEvent.change(inputPassword, { target: { value: "pablo" } });

      const button = getByText("Submit");
      fireEvent.click(button);
    });
})