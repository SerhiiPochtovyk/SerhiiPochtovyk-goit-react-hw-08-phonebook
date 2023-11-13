import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './contactsSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'], // filter до blacklist
};

const persistedReducer = persistReducer(persistConfig, contactsReducer);

const store = configureStore({
  reducer: {
    contacts: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
