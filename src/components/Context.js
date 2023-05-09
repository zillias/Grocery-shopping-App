import React, { createContext, useState } from "react";
import Allproducts from "../Assets/Carrefour DATA English.json";

const AppContext = createContext();

export const Context = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [whishlistItems, setWhishlistItems] = useState([]);

  const changeCart = (id, quantity, image) => {
    const existingItem = cart.items.find((item) => item.id === id);
    const itemPrice = parseFloat(
      Allproducts.find((item) => item.id === id).price.replace(",", ".")
    );

    if (existingItem) {
      if (quantity === 0) {
        setCart({
          total: cart.total - existingItem.quantity * itemPrice,
          items: cart.items.filter((item) => item.id !== id),
        });
      } else {
        setCart({
          total:
            cart.total -
            existingItem.quantity * itemPrice +
            quantity * itemPrice,
          items: cart.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      }
    } else
      setCart({
        total: cart.total + quantity * itemPrice,
        items: [...cart.items, { id, quantity, image }],
      });
  };

  const changeWhishlist = (id) => {
    const existingItem = whishlistItems.find((item) => item.id === id);
    const product = Allproducts.find((item) => item.id === id);
    if (existingItem) {
      setWhishlistItems(whishlistItems.filter((item) => item.id !== id));
    } else {
      setWhishlistItems([...whishlistItems, product]);
    }
  };

  return (
    <AppContext.Provider
      value={{ cart, whishlistItems, changeCart, changeWhishlist }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
