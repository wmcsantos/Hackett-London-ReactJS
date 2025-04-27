import { BACKEND_URL } from "../config.ts"
  
const addItemToCart = async (
    cart_id: number,
    product_variant_id: number,
    quantity: number,
    price: number
) => {
    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error('No token found!')
    }

    try {
        const response = await fetch(`${BACKEND_URL}/carts/cart/${cart_id}/add-cart-item`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_variant_id,
                quantity,
                price
            }),
        })
    
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.detail || `HTTP error! Status: ${response.status}`)
        }
    
        return response.json()
    } catch (error) {
        console.error('Add to cart error:', error);
        throw error
    }
  }
  
  export default addItemToCart