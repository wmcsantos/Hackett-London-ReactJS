export interface Category {
  id: number
  name: string
  parent_id: number
}

const fetchSubcategoriesById = async (parent_id: number): Promise<Category[]> => {
  try {
    const response = await fetch(`http://localhost:8000/subcategories/${parent_id}`, {
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

export default fetchSubcategoriesById