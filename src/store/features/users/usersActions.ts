import { setUsers, addUser, removeUser, updateUser, User, setLoading } from './usersSlice';
import { AppDispatch } from '../..';
import axios from 'axios';

export const fetchUsers = () => async(dispatch: AppDispatch) => {
  const response = await axios(`${process.env.REACT_APP_BASE_URL}/users`);
  const users = response.data;

  dispatch(setLoading(true));

  setTimeout(() => {
    dispatch(setUsers(users));
    dispatch(setLoading(false));
  }, 1000);
};

export const createUser = (user: Omit<User, 'id'>) => (dispatch: AppDispatch) => {
  const id = Date.now();
  const newUser: User = { id, ...user };

  dispatch(setLoading(true));

  setTimeout(() => {
    dispatch(addUser(newUser));
    dispatch(setLoading(false));
  }, 1000);
};

export const deleteUser = (userId: number) => (dispatch: AppDispatch) => {
  dispatch(removeUser(userId));
};

export const updateUserDetails = (user: User) => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  setTimeout(() => {
    dispatch(updateUser(user));
    dispatch(setLoading(false));
  }, 1000);
};