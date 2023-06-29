import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from './features/posts/postsSlice';
import postReducer from './features/post/postSlice';
import albumsReducer from './features/albums/albumsSlice';

const rootReducer = combineReducers({
  posts: postsReducer,
  post: postReducer,
  albums: albumsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;