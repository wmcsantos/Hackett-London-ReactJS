import { BACKEND_URL } from '../config.ts'
import { CartItem } from '../context/CartContext.tsx'

const deleteItemFromCart = async (cartId, itemId) => {
    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error('No token found!')
    }

    try {
        const response = await fetch(`${BACKEND_URL}/carts/cart/${cartId}/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

    } catch (error) {
        console.error('Error deleting item from cart:', error);
        throw error
    }
}

export default deleteItemFromCart