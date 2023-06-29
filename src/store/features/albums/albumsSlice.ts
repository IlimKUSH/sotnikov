import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Album {
  userId: number;
  username: string;
  id: number;
  title: string;
}

interface AlbumState {
  albums: Album[];
  total: number;
  loading: boolean;
}

const initialState: AlbumState = {
  albums: [],
  total: 0,
  loading: true,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setAlbums: (state, action: PayloadAction<{albums: Album[]; total: number}>) => {
      state.albums = action.payload.albums
      state.total = action.payload.total
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setAlbums, setLoading } = albumsSlice.actions;

export default albumsSlice.reducer;