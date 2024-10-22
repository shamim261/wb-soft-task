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
      : [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = action.payload;
      // check if the item already exists in the cart
      const existingItem = state.cart.cartItems.find(
        (item) => item.id === newItem.id
      );
      // if the item exists, update the quantity
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item.id === existingItem.id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      // save the updated cart items to local storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case "REMOVE_FROM_CART":
      const itemToRemove = action.payload;
      // remove the item from the cart
      const updatedCartItems = state.cart.cartItems.filter(
        (item) => item.id !== itemToRemove.id
      );
      // save the updated cart items to local storage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return { ...state, cart: { ...state.cart, cartItems: updatedCartItems } };
    case "SAVE_SHIPPING_ADDRESS":
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
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
