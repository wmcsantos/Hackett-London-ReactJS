import { BACKEND_URL } from "../config.ts"

export interface OrdersType {
    id: number
    order_status: string
    order_date: string
    total_amount: number
}

const fetchUserOrders = async (): Promise<OrdersType[]> => {
    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error('No token found!')
    }

    const response = await fetch(`${BACKEND_URL}/orders/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error('Failed to fetch user orders')
    }

    return await response.json()
}

export default fetchUserOrders