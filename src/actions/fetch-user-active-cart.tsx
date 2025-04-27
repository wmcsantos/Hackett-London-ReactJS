import { BACKEND_URL } from '../config.ts'

export interface CartType {
  id: number,
  user_id: number,
  cart_status: string,
  session_id: string,
  created_at: string,
  updated_at: string
}

const fetchUserActiveCart = async (): Promise<CartType> => {
  const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No token found!')
    }

    try {
      const response = await fetch(`${BACKEND_URL}/carts/cart`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return response.json()
    } catch (error) {
      console.error('Error fetching user active cart:', error);
      throw error
    }
}

export default fetchUserActiveCart