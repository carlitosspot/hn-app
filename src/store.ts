import { configureStore } from '@reduxjs/toolkit';
import starredReducer from './features/starredSlice';
export const store = configureStore({
  reducer: {
    starred: starredReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
