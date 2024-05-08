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
  async (
    { pageNumber, pageSize }: { pageNumber: number; pageSize: number },
    { getState },
  ) => {
    const state = getState() as RootState;
    const startIdx = pageNumber * pageSize;
    if (state.newsItems.items.length > startIdx) {
      return state.newsItems.items; // Return existing items if already loaded
    }
    const currentStories = [...state.newsItems.items];

    // fetch next pageSize stories
    const ids = await fetchTopStories();
    const storyIds = ids.slice(startIdx, startIdx + pageSize);
    const newStories = await Promise.all(storyIds.map(id => fetchStory(id)));

    return currentStories.concat(newStories);
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
