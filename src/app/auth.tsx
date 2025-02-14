// App.js

import { useAuth } from "react-oidc-context";

// Styles
import styles from '../styles/auth.module.css';

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
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

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
