import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTopStories, fetchStory, IStory } from '../api/hnApi.ts';
import { RootState } from '../store.ts';

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

interface NewsItems {
  items: IStory[];
  status: Status;
  error: unknown;
}

const initialState: NewsItems = {
  items: [],
  status: Status.IDLE,
  error: null,
};

export const fetchNewsItems = createAsyncThunk(
  'newsItems/fetchNewsItems',
  async (_, { getState }) => {
    const state = getState() as RootState;
    if (state.newsItems.items.length > 0) {
      return state.newsItems.items; // Return existing items if already loaded
    }
    const ids = await fetchTopStories();
    const topTenIds = ids.slice(0, 20);
    return await Promise.all(topTenIds.map(id => fetchStory(id)));
  },
);

const newsItemsSlice = createSlice({
  name: 'newsItems',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNewsItems.pending, state => {
        state.status = Status.LOADING;
      })
      .addCase(fetchNewsItems.fulfilled, (state, action) => {
        state.status = Status.SUCCEEDED;
        // Add fetched news items to the array
        state.items = action.payload;
      })
      .addCase(fetchNewsItems.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      });
  },
});

export default newsItemsSlice.reducer;
