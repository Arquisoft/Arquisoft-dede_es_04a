import React from "react";

export type CartItem = {
    id: number;
    name: string;
    urlImage: string;
    price: number;
    onSale: boolean;
    amount: number;
}

export type CartActionReducer = {
    payload: any;
    type: 'ADD' | 'REMOVE' | 'REMOVE-ALL' | 'CLEAR' ;
    //Add, Remove, RemoveAll
}

export type CartContextType = {
    cartItems: CartItem[],
    dispatch: React.Dispatch<CartActionReducer>
}