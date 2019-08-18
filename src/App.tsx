import React from 'react';
import './App.css';
import { UserForm } from './user/UserForm';
import { User } from './user/UserSchema';

function App() {

  const onFormSubmitted = (user: User) => {
    console.log(user);
  }

  return (
    <UserForm onFormSubmitted={onFormSubmitted} />
  );
}

export default App;
