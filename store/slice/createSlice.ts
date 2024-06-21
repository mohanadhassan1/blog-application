import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

const localPostsSlice = createSlice({
  name: 'localPosts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<{ title: string; body: string }>) => {
      const newPost: BlogPost = {
        id: uuidv4(),
        title: action.payload.title,
        body: action.payload.body,
      };
      state.posts.push(newPost);
      localStorage.setItem('posts', JSON.stringify(state.posts));
    },
    setPosts: (state, action: PayloadAction<BlogPost[]>) => {
      state.posts = action.payload;
      localStorage.setItem('posts', JSON.stringify(state.posts));
    },
    loadPostsFromLocalStorage: (state) => {
      if (typeof window !== 'undefined') {
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
          state.posts = JSON.parse(storedPosts);
        }
      }
    },
  },
  extraReducers: builder => {
    // builder
     // .addCase(createPost.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(createPost.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.posts.push(action.payload);
      //   localStorage.setItem('posts', JSON.stringify(state.posts));
      // })
      // .addCase(createPost.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.payload ?? 'Unknown error';
      // });
  },
});

export const { addPost, setPosts, loadPostsFromLocalStorage } = localPostsSlice.actions;
export default localPostsSlice.reducer;