import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './category/categorySlice.ts'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    category: categoryReducer,
  })
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            // Ignore redux-persist actions that include non-serializable values
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            ignoredActionPaths: ['register'],
            ignoredPaths: ['_persist'], // optional: suppress for persist state too
          },
        }),
})
  
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch