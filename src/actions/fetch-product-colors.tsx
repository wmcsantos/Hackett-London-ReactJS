import { BACKEND_URL } from "../config.ts"

export interface ProductColors {
  name: string
  code: string
  image_url: string
  color_id: number
}

const fetchProductImages = async (productId): Promise<ProductColors[]> => {
  try {
    const response = await fetch(`${BACKEND_URL}/products/product-colors?product_id=${productId}`, {
        method: 'GET'
    })

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    
    return response.json()
  } catch (error) {
    console.error('Error fetching product images:', error);
    throw error
  }
}

export default fetchProductImages