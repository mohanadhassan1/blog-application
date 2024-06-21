import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './slice/blogSlice';
import createReducer from './slice/createSlice';

const store = configureStore({
  reducer: {
    blog: blogReducer,
    localPosts: createReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
