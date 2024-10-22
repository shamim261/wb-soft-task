import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const initialState = {
  cart: {
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : {},
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      localStorage.setItem("cartItems", JSON.stringify(action.payload));
      return { ...state, cart: { ...state.cart, cartItems: action.payload } };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: {
            ...state.cart.cartItems,
            quantity: action.payload,
          },
        },
      };
    case "REMOVE_FROM_CART":
      localStorage.removeItem("cartItems");
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case "SAVE_SHIPPING_ADDRESS":
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    case "CLEAR_CART":
      localStorage.removeItem("cartItems");
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
