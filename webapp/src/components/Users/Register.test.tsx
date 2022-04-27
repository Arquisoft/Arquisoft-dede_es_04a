import { render, fireEvent, act } from "@testing-library/react";
import Register from "./Register";
import {User} from '../../shared/sharedtypes';
import * as api from '../../api/api'

jest.mock('../../api/api');

/* test('check register fail', async () => {
  jest.spyOn(api,'addUser').mockImplementation((user:User):Promise<boolean> => Promise.resolve(false))
  await act(async () => {    
    const {container, getByText} = render(<EmailForm OnUserListChange={()=>{}}/>)  
    const inputName = container.querySelector('input[name="username"]')!;
    const inputEmail = container.querySelector('input[name="email"]')!;
    fireEvent.change(inputName, { target: { value: "Pablo" } });
    fireEvent.change(inputEmail, { target: { value: "gonzalezgpablo@uniovi.es" } });
    const button = getByText("Accept");
    fireEvent.click(button);
  });
}) */

test('check register ok', async () => {
  
  jest.spyOn(api,'addUser').mockImplementation((user:User):Promise<boolean> => Promise.resolve(true))
  await act(async () => {    
    const {container, getByText} = render(<Register />)  
    const inputName = container.querySelector('input[name="username"]')!;
    const inputEmail = container.querySelector('input[name="email"]')!;
    const inputPassword = container.querySelector('input[name="password"]')!;
    const inputConfirmPassword = container.querySelector('input[name="confirmPassword"]')!;
    const inputDni = container.querySelector('input[name="dni"]')!;
    fireEvent.change(inputName, { target: { value: "Pablo" } });
    fireEvent.change(inputEmail, { target: { value: "gonzalezgpablo@uniovi.es" } });
    fireEvent.change(inputPassword, { target: { value: "pass" } });
    fireEvent.change(inputConfirmPassword, { target: { value: "pass" } });
    fireEvent.change(inputDni, { target: { value: "0000" } });
    const button = getByText("Submit");
    fireEvent.click(button);
  });
})
