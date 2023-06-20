import { setUsers, addUser, removeUser, updateUser, User } from './usersSlice';
import { AppDispatch } from '../..';
import axios from 'axios';


export const fetchUsers = () => async(dispatch: AppDispatch) => {
  // Имитация асинхронной загрузки данных
  const response = await axios('http://localhost:3001/users');
  const users = response.data;
  
  setTimeout(() => {
    dispatch(setUsers(users));
  }, 500);
};

export const createUser = (user: Omit<User, 'id'>) => (dispatch: AppDispatch) => {
  const id = Date.now();
  const newUser: User = { id, ...user };
  dispatch(addUser(newUser));
};

export const deleteUser = (userId: number) => (dispatch: AppDispatch) => {
  dispatch(removeUser(userId));
};

export const updateUserDetails = (user: User) => (dispatch: AppDispatch) => {
  dispatch(updateUser(user));
};