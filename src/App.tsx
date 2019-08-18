import React from 'react';
import './App.css';
import { FuckForm } from './user/FuckForm';
import { User, UserSchema } from './user/UserSchema';

function App() {

  const onFormSubmitted = (user: User) => {
    console.log(user);
  }

  return (
    <FuckForm className="my-custom-form" onFormSubmitted={onFormSubmitted} schema={UserSchema} />
  );
}

export default App;
