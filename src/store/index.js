import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import walletSlice from './walletSlice';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, walletSlice);

export const store = configureStore({
  reducer: {
    wallet: persistedReducer
  }
});

export const persistor = persistStore(store);
