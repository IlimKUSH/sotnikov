import React, { useEffect } from 'react';
import { fetchUsers, deleteUser } from '../../store/features/users/usersActions';
import { RootState } from '../../store/rootReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUser(userId));
  };

  return (
    <div>
      <h2>User List</h2>
      {users.map(user => (
        <div key={user.id}>
          <img src={user.image} alt={user.name} />
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.permissions.join(', ')}</p>
          <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;