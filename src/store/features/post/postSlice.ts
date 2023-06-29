import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface PostState {
  post: Post[];
  loading: boolean;
}

const initialState: PostState = {
  post: [],
  loading: true,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post[]>) => {
      state.post = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setPost, setLoading } = postSlice.actions;

export default postSlice.reducer;