import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

const CRUDCRUD_URL =
  'https://crudcrud.com/api/efb71455cb4d4c4780fcd74d847d1d6e';
const getUserCartUrl = () => {
  const email = localStorage.getItem('email');

  if (!email) {
    return null;
  }

  const cleanEmail = email.replace(/[@.]/g, '');

  return `${CRUDCRUD_URL}/cart${cleanEmail}`;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (product) => {
    const cartUrl = getUserCartUrl();

    if (!cartUrl) {
      alert('Please login first.');
      return;
    }

    const existingItem = cartItems.find(
      (item) => item.title === product.title
    );

    let updatedItem;

    if (existingItem) {
      updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.title === product.title
            ? updatedItem
            : item
        )
      );
    } else {
      updatedItem = {
        ...product,
        quantity: 1,
      };

      setCartItems((prevItems) => [
        ...prevItems,
        updatedItem,
      ]);
    }

    try {
      const response = await fetch(cartUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error('Failed to save cart item');
      }

      const data = await response.json();

      console.log('Cart saved to CrudCrud:', data);
    } catch (error) {
      console.error(
        'Error saving cart to CrudCrud:',
        error
      );
    }
  };

  const fetchCart = async () => {
    const cartUrl = getUserCartUrl();

    if (!cartUrl) {
      return;
    }

    try {
      const response = await fetch(cartUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const data = await response.json();

      console.log('Cart fetched from CrudCrud:', data);

      setCartItems(data);
    } catch (error) {
      console.error(
        'Error fetching cart:',
        error
      );
    }
  };

  const removeFromCart = async (title) => {
    const cartUrl = getUserCartUrl();

    const itemToRemove = cartItems.find(
      (item) => item.title === title
    );

    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => item.title !== title
      )
    );

    if (!itemToRemove || !cartUrl) {
      return;
    }

    try {
      await fetch(
        `${cartUrl}/${itemToRemove._id}`,
        {
          method: 'DELETE',
        }
      );
    } catch (error) {
      console.error(
        'Error deleting cart item:',
        error
      );
    }
  };

  const cartItemCount = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        cartItemCount,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);