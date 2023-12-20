import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IEntry, IFeed, IFeedObject } from '../../interfaces/Feed';
import { AppDispatch } from '../configureStore';
import { api } from '../../service/api';
import { AxiosRequestConfig } from 'axios';

const initialState = {
  feed: {} as IFeed,
  maxPage: 0,
  entries: {} as Record<string, IEntry>,
};

const entriesSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    updateFeed(state, { payload }: PayloadAction<{ feed: IFeed }>) {
      state.feed = payload.feed;
    },
    updateMaxPage(state, { payload }: PayloadAction<{ max: number }>) {
      state.maxPage = payload.max;
    },
    updateEntries(state, { payload }: PayloadAction<{ entries: IEntry[] }>) {
      for (const entry of payload.entries || []) {
        state.entries[entry.id.label] = entry;
      }
    },
    resetEntries() {
      return { ...initialState };
    },
  },
});

interface IFeedParams {
  appId: string;
  countryCode: string;
  page: number;
}
// THUNKS
export const fetchFeed = createAsyncThunk<void, IFeedParams, { dispatch: AppDispatch }>(
  'feed/fetchFeed',
  async ({ appId, countryCode, page }, thunkApi) => {
    const config: AxiosRequestConfig = {
      params: {
        sortBy: 'mostRecent',
        page: `${page}`,
      },
    };
    const { feed }: IFeedObject = await api.fetchFeed(appId, countryCode, config);
    thunkApi.dispatch(updateFeed({ feed }));
    const max = fetchMaxPage(feed);
    thunkApi.dispatch(updateMaxPage({ max }));
  }
);

export const fetchMaxPage = (feed: IFeed) => {
  if (feed.entry) {
    const node = feed.link.find((l) => l.attributes.rel === 'last')?.attributes;

    if (node) {
      const searchParams = node.href.split('/').filter((section) => section.includes('page='));
      if (searchParams.length) {
        const pageNumbers: number[] = searchParams.map((p) => parseInt(p.slice(5)));
        return Math.max(...pageNumbers);
      }
    }
  }
  return 0;
};

export const { updateFeed, updateEntries, resetEntries, updateMaxPage } = entriesSlice.actions;

export default entriesSlice.reducer;
