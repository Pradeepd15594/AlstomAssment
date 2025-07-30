import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { AuthService } from "./../Services/AuthService";
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage for web)

import AuthSlice from './Slices/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AuthPersistConfig = {
    key: 'AuthSlice',
    storage: AsyncStorage, // 👈 use AsyncStorage here
    blacklist: [AuthService.reducerPath]
};

// Combine reducers
const rootReducer = combineReducers({
    [AuthService.reducerPath]: AuthService.reducer,
    // [CategoryService.reducerPath]: CategoryService.reducer,
    // [RolesService.reducerPath]: RolesService.reducer,
    AuthSlice: persistReducer(AuthPersistConfig, AuthSlice.reducer), // Persisted
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        // serializableCheck: {
        //     ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // },
        serializableCheck: false,
    }).concat(
        AuthService.middleware,
    ),
});

// Persistor
export const persistor = persistStore(store);

// Listeners
setupListeners(store.dispatch);

// Types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;