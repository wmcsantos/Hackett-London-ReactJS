export interface ProductImages {
  id: number
  image_url: string
  position: number
  code: string
}

const fetchProductImages = async (colorCode, productId): Promise<ProductImages[]> => {
  try {
    const response = await fetch(`http://localhost:8000/products/product-images?color_code=${colorCode}&product_id=${productId}`, {
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