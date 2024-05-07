import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface StarredState {
  starredItems: number[]; // list of news item IDs that are starred
}

const initialState: StarredState = {
  starredItems: [],
};

const starredSlice = createSlice({
  name: 'starred',
  initialState,
  reducers: {
    toggleStar(state, action: PayloadAction<number>) {
      const index = state.starredItems.indexOf(action.payload);
      if (index >= 0) {
        state.starredItems.splice(index, 1); // If found, remove it
      } else {
        state.starredItems.push(action.payload); // If not found, add it
      }
    },
  },
});

export const { toggleStar } = starredSlice.actions;

export const selectStarredItems = (state: RootState) =>
  state.starred.starredItems;

export default starredSlice.reducer;
