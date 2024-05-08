import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import starredReducer from './features/starredSlice';
import newsItemsReducer from './features/newsItemsSlice.ts';
export const store = configureStore({
  reducer: {
    starred: starredReducer,
    newsItems: newsItemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
