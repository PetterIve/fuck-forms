import React from 'react';
import './App.css';
import { FuckForm } from './user/FuckForm';
import { User, UserSchema } from './user/UserSchema';

function App() {

  const onFormSubmitted = (user: User) => {
    console.log(user);
  }

  return (
    <div className="form-container">
      <h1>User form</h1>
      <FuckForm className="my-custom-form" onFormSubmitted={onFormSubmitted} schema={UserSchema} />
    </div>
  );
}

export default App;
