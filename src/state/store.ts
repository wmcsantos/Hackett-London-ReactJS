import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './category/categorySlice.ts'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    category: persistReducer(persistConfig, categoryReducer),
})

export const store = configureStore({
    reducer: rootReducer,
})
  
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch