import { BACKEND_URL } from "../config.ts"

export interface ProductSizes {
  size_id: number
  name: string
  stock: number
}

const fetchProductSizes = async (colorCode, productId): Promise<ProductSizes[]> => {
  try {
    const response = await fetch(`${BACKEND_URL}/products/product-sizes?color_code=${colorCode}&product_id=${productId}`, {
        method: 'GET'
    })

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    
    return response.json()
  } catch (error) {
    console.error('Error fetching product sizes:', error);
    throw error
  }
}

export default fetchProductSizes