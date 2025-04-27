import { BACKEND_URL } from "../config.ts"

export interface Product {
  id: number
  name: string
  description_details: string | null
  description_composition: string | null
  description_care: string | null
  description_delivery: string | null
  product_variant_id: number
  price: number
}

const fetchProductById = async (id: number): Promise<Product[]> => {
  try {
    const response = await fetch(`${BACKEND_URL}/products/product/${id}`, {
        method: 'GET'
    })

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    throw error
  }
}

export default fetchProductById