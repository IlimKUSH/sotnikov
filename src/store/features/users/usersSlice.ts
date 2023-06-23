import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
  email: string;
  permissions: string[];
  image: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
}

const initialState: UsersState = {
  users: [],
  loading: true,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const { id, name, email, permissions, image } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = {
          id,
          name,
          email,
          permissions,
          image,
        };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUsers, setLoading, addUser, removeUser, updateUser } = usersSlice.actions;

export default usersSlice.reducer;