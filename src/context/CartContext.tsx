import React, { createContext, useContext, useEffect, useState } from "react"
import fetchCartItems from "../actions/fetch-cart-items.tsx"
import fetchUserActiveCart from "../actions/fetch-user-active-cart.tsx"

export interface CartItem {
    id: number
    cart_id: number
    product_variant_id: number
    quantity: number
    price: number
    created_at: string | null
    updated_at: string | null
}

interface CartContextType {
    cartItems: CartItem[]
    cartItemCount: number
    fetchCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const fetchCart = async () => {
        const cart = await fetchUserActiveCart()
        const cartId = cart?.id
        if (!cart) return
    
        try {
          const items = await fetchCartItems(cartId)
          setCartItems(items)
        } catch (err) {
          console.error("Failed to fetch cart items", err)
        }
    }
    
    useEffect(() => {
    fetchCart()
    }, [])

    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0)

    return (
        <CartContext.Provider value={{ cartItems, fetchCart, cartItemCount }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
      }
      return context
}