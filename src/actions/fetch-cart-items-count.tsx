import { BACKEND_URL } from '../config.ts'

export interface CartItemsCount {
    total_cart_items: number
}

const fetchCartItemsCount = async (cartId): Promise<CartItemsCount> => {
    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error('No token found!')
    }

    try {
        const response = await fetch(`${BACKEND_URL}/carts/cart/${cartId}/cart-items/count`, {
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
        console.error('Error fetching categories:', error);
        throw error
    }
}

export default fetchCartItemsCount