import { createContext, useEffect, useRef, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [showShoppingCart, setShowShoppingCart] = useState("");
  const [user, setUser] = useState();
  const [counterLoads, setCounterLoads] = useState(0);

  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      setShoppingCart([]);
    } else {
      if (counterLoads >= 1) {
        window.localStorage.setItem(
          "cartProducts",
          JSON.stringify(shoppingCart)
        );
      } else {
        setCounterLoads(counterLoads + 1);
      }
    }
  }, [shoppingCart]);

  useEffect(() => {
    try {
      const productosEnLocalStorage =
        window.localStorage.getItem("cartProducts");

      if (productosEnLocalStorage) {
        setShoppingCart(JSON.parse(productosEnLocalStorage));
      } else {
        setShoppingCart([]);
      }
    } catch (e) {
      setShoppingCart([]);
    }
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      setUser(user);
    }
  }, []);

  /**
   * Add item to shopping cart
   */
  const addItemToCart = (product) => {
    const inCart = shoppingCart.find((el) => el.id === product.id);

    if (inCart) {
      const productUpdate =
        shoppingCart &&
        shoppingCart.map((productInCart) => {
          if (productInCart.id === product.id) {
            return { ...inCart, qty: inCart.qty + 1 };
          } else return productInCart;
        });

        setShoppingCart(productUpdate);
    } else {
      const newItem = {
        id: product.id,
        nombreProducto: product.nombreProducto,
        imagen: product.imagen,
        qty: 1,
        precio: product.precio,
      };
      setShoppingCart([...shoppingCart, newItem]);
    }
  };

  /**
   * Remove item from shopping cart
   */
  const removeItemToCart = (productId) => {
    setShoppingCart(shoppingCart.filter((el) => el.id !== parseInt(productId)));
  };

  /**
   * Low quantity from item shopping cart
   */
  const lowQtyItemCart = (productId) => {
    const newArray = [...shoppingCart];
    const elementShoppingCart = newArray.find(
      (el) => el.id === parseInt(productId)
    );

    if (elementShoppingCart.qty > 1) {
      elementShoppingCart.qty = elementShoppingCart.qty - 1;
      setShoppingCart(newArray);
    };
  };

  /**
   * High quantity from item shopping cart
   */
  const highQtyItemCart = (productId) => {
    const newArray = [...shoppingCart];
    const elementShoppingCart = newArray.find(
      (el) => el.id === parseInt(productId)
    );
    elementShoppingCart.qty = elementShoppingCart.qty + 1;
    setShoppingCart(newArray);
  };

  return (
    <CartContext.Provider
      value={{
        shoppingCart: shoppingCart,
        setShoppingCart,
        addItemToCart,
        removeItemToCart,
        lowQtyItemCart,
        highQtyItemCart,
        showShoppingCart: showShoppingCart,
        setShowShoppingCart,
        user: user,
        setUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
