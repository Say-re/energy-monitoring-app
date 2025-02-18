// App.js

import { useAuth } from "react-oidc-context";

// Styles
import styles from '../styles/auth.module.scss';

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "52hjjvomou60c0fl7u0slbl85b";
    const logoutUri = "http://localhost:8080";
    const cognitoDomain = "https://us-west-2gs5pcowrs.auth.us-west-2.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return (
      <div className={styles['login-screen']}>
      <div>Loading...</div>
      </div>
    );
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div className={styles['login-screen']}>
      <div>
        <h1>HEM</h1>
        <p>Home Energy Monitoring</p>
        <p>Done, right.</p>
        <p>Let's get started!</p>
        {!auth.isAuthenticated && <button onClick={() => auth.signinRedirect()}>Sign in</button>}
        {auth.isAuthenticated && <button onClick={() => signOutRedirect()}>Sign out</button>}
      </div>
    </div>
  );
}

export default App;
