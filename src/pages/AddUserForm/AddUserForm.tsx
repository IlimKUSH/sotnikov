import React, { useState } from 'react';
import { createUser } from '../../store/features/users/usersActions';
import { useAppDispatch } from '../../hooks/useAppDispatch';

export const AddUserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [permissions, setPermissions] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      name,
      email,
      permissions: permissions.split(',').map(permission => permission.trim()),
      image: '',
    };
    dispatch(createUser(user));
    setName('');
    setEmail('');
    setPermissions('');
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Permissions (comma-separated)"
          value={permissions}
          onChange={e => setPermissions(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};