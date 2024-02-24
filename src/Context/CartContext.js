import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = { token: localStorage.getItem("userToken") };
  const [numOfCartItems, setNumOfCartItems] = useState(0);
    

  function addProductToCart(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  function getLoggedCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  function removeProductFromCart(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
      .then((response) => response)
      .catch((err) => err);
  }

  function updateProductQuantity(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers }
      )
      .then((response) => response)
      .catch((err) => err);
  }
  async function startInitialCartCount() {
    const { data } = await getLoggedCart();
    setNumOfCartItems(data.numOfCartItems);
  }
  useEffect(() => {
    startInitialCartCount();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getLoggedCart,
        removeProductFromCart,
        updateProductQuantity,
        numOfCartItems,
        setNumOfCartItems,
      }}
    >
      {props.children};
    </CartContext.Provider>
  );
}
