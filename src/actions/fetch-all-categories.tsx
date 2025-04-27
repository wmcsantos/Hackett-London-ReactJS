import { BACKEND_URL } from '../config.ts'

export interface Category {
  id: number
  name: string
  parent_id: number
}

const fetchAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${BACKEND_URL}/categories`, {
        method: 'GET'
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

export default fetchAllCategories