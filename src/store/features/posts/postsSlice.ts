import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  id: number;
  title: string;
  body: string;
  username: string;
  userId?: string;
}

interface PostsState {
  posts: Post[];
  total: number;
  loading: boolean;
}

const initialState: PostsState = {
  posts: [],
  total: 0,
  loading: true,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<{posts: Post[], total: number}>) => {
      state.posts = action.payload.posts
      state.total = action.payload.total
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    removePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const { id, title, body, username } = action.payload;
      const postIndex = state.posts.findIndex(post => post.id === id);
      if (postIndex !== -1) {
        state.posts[postIndex] = {
          id,
          title,
          body,
          username
        };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setPosts, setLoading, addPost, removePost, updatePost } = postsSlice.actions;

export default postsSlice.reducer;