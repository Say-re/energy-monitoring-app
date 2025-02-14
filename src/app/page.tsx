'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { AuthProvider } from "react-oidc-context";
import Auth from "./auth";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_Gs5pCoWrS",
  client_id: "52hjjvomou60c0fl7u0slbl85b",
  redirect_uri: "http://localhost:8080",
  response_type: "code",
  scope: "email openid phone",
};
export default function Home() {
  return (
    <AuthProvider {...cognitoAuthConfig}>
    <Auth />
    <div className={styles.page}>
      <main className={styles.main}>
     </main>
      <footer className={styles.footer}>
      </footer>
    </div>
    </AuthProvider>
  );
}
