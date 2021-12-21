import React from 'react';
import './App.css';
import { AuthenticatedApp } from 'authenticated-app';
import { useAuth } from 'context/auth-context';
import { UnauthenticateApp } from 'screens/unauthenticated-app';

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticateApp />}
    </div>
  );
}

export default App;
