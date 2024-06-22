import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface BlogPost {
  id: string;
  title: string;
  body: string;
}

interface BlogPostsState {
  posts: BlogPost[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BlogPostsState = {
  posts: [],
  status: 'idle',
  error: null,
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchPosts = createAsyncThunk<BlogPost[], void, { rejectValue: string }>(
  'blog/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      await delay(2000);
      const response = await axios.get<BlogPost[]>('https://jsonplaceholder.typicode.com/posts');
      return response.data.map((post: any) => ({
        id: uuidv4(),
        title: post.title,
        body: post.body,
      })) as BlogPost[];
    } catch (error) {
      return rejectWithValue('Failed to fetch blog posts');
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<BlogPost>) => {
      state.posts.push(action.payload);
    },
    setPosts: (state, action: PayloadAction<BlogPost[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unknown error';
      })
  },
});

export const { addPost, setPosts } = blogSlice.actions;
export default blogSlice.reducer;
