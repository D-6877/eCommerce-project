import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext(); // Capitalize context name for clarity

const CartProvider = ({ children }) => { // Capitalize provider name
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let existingCartItem = localStorage.getItem('cart');
        if (existingCartItem) {
            setCart(JSON.parse(existingCartItem));
        }
    }, [])

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children} {/* Render children correctly */}
        </CartContext.Provider>
    );
};

// Custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
