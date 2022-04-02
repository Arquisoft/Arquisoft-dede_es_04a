import { createContext, useReducer } from "react";
import { CartContextType } from "../components/Carrito/CartItem";
import cartReducer from "../components/reducers/cartReducer";

const initialState= {
    cartItems: [],
    dispatch: () => {}
}

export const CartContext = createContext<CartContextType>(initialState);

export const CartProvider = ({ children }: any) => {

    const [cartItems, dispatch] = useReducer(cartReducer, initialState.cartItems);

    return (
      <CartContext.Provider value={{
        cartItems,
        dispatch
      }}>
          {children}
      </CartContext.Provider>
  )
}