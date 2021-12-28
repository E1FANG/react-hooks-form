import React from 'react';
import './App.css';
import { AuthenticatedApp } from 'authenticated-app';
import { useAuth } from 'context/auth-context';
import { UnauthenticateApp } from 'screens/unauthenticated-app';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { FullPageErrorFallback } from 'components/lib';

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticateApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
