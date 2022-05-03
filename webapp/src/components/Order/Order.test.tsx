import { render } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import Order from "./Order";
import * as api from '../Services/OrderService'
import { Item, OrderType, Producto, User } from "../../shared/sharedtypes";
import { ReactSession } from 'react-client-session';

jest.mock('../Services/OrderService');

test('check the payment form render properly', async () => {
    const user: User = {
        username: "user",
        password: "user",
        token: ""
    };
    const product: Producto = { category: 'cellular', name: 'IPhone', description: 'a', urlImage: 'aaaaa', basePrice: 200, units: 2, onSale: true, IVA: 0.21 };
    const listProd: Item[] = [{ producto: product, num: 3 }];
    const order: OrderType = {
        _id: '', user: user,
        products: listProd,
        totalPrice: 0
    };
    ReactSession.set("user", user);
    jest.spyOn(api, 'getOrder').mockImplementation((id: String, token: string): Promise<OrderType> => Promise.resolve(order));

    const { getByText, container } = render(<BrowserRouter><Order /></BrowserRouter>);
    expect(getByText("Order")).toBeInTheDocument();

});