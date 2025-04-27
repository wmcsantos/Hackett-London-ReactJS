import { BACKEND_URL } from "../config.ts"

const fetchProductVariant = async (
    product_id: number,
    size_id: number,
    color_id: number
) => {
  try {
    const response = await fetch(`${BACKEND_URL}/products/variants/variant?product_id=${product_id}&size_id=${size_id}&color_id=${color_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    
    return response.json()
  } catch (error) {
    console.error('Error fetching product variant:', error);
    throw error
  }
}

export default fetchProductVariant