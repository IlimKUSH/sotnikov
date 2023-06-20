import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from './features/users/usersSlice';

const rootReducer = combineReducers({
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;