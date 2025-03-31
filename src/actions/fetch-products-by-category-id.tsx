export interface Category {
  id: number
  name: string
}

const fetchProductsByCategoryId = async (id: number): Promise<Category[]> => {
  try {
    const response = await fetch(`http://localhost:8000/products/category/${id}`, {
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

export default fetchProductsByCategoryId