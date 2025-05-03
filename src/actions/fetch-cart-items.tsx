import { BACKEND_URL } from '../config.ts'
import { CartItem } from '../context/CartContext.tsx'

const fetchCartItems = async (cartId): Promise<CartItem[]> => {
    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error('No token found!')
    }

    try {
        const response = await fetch(`${BACKEND_URL}/carts/cart/${cartId}/cart-items`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        return response.json()
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error
    }
}

export default fetchCartItems