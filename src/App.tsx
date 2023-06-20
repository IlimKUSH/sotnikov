import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <UserList />
        <AddUserForm />
      </div>
    </Provider>
  );
};

export default App;