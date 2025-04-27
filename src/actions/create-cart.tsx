import { BACKEND_URL } from "../config.ts"

export interface CreateCartType {
    id: number,
    user_id: number,
    cart_status: string,
    session_id: string,
    created_at: string,
    updated_at: string
}

const createCart = async (): Promise<CreateCartType> => {
    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error('No token found!')
    }

    try {
        const response = await fetch(`${BACKEND_URL}/carts/cart`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
    
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.detail || `HTTP error! Status: ${response.status}`)
        }
    
        return response.json()
    } catch (error) {
        console.error('Create cart error:', error);
        throw error
    }
  }
  
  export default createCart