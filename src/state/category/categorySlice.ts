import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Category {
  id: number
  name: string
}

interface CategoryState {
  selectedCategory: Category | null
  selectedSubcategory: string | null
}

const initialState: CategoryState = {
  selectedCategory: null,
  selectedSubcategory: null,
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      state.selectedCategory = action.payload
      state.selectedSubcategory = null
    },
    setSubcategory: (state, action: PayloadAction<string>) => {
      state.selectedSubcategory = action.payload
    }
  }
})

export const { setCategory, setSubcategory } = categorySlice.actions
export default categorySlice.reducer
