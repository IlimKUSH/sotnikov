import React, { useEffect } from 'react';
import { fetchUsers, deleteUser } from '../../store/features/users/usersActions';
import { RootState } from '../../store/rootReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { SearchIcon } from '../../components/icons/search';

export const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.users.users);
  console.log(users);
  
  useEffect(() => {
    if(!users.length) {
      dispatch(fetchUsers());
    }
  }, [dispatch]);

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUser(userId));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <h2>Команда</h2>
        <Box display="flex" alignItems="center" gap="10px">
          <TextField
            label="Поиск по Email"
            InputProps={{
              endAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            }}
          />
          <Button variant="contained" color="secondary" sx={{ borderRadius: 2}}>Добавить пользователя</Button>
        </Box>
      </Box>
      {users.map(user => (
        <div key={user.id}>
          <img src={user.image} alt={user.name} />
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.permissions.join(', ')}</p>
          <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </Box>
  );
};