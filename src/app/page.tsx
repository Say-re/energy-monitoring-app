'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { AuthProvider } from "react-oidc-context";
import App from "./app";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_Gs5pCoWrS",
  client_id: "52hjjvomou60c0fl7u0slbl85b",
  redirect_uri: "http://localhost:8080/auth/success",
  response_type: "code",
  scope: "email openid phone",
};
export default function Home() {
  return (
    <AuthProvider {...cognitoAuthConfig}>
    <App />
    <div className={styles.page}>
      <main className={styles.main}>
     </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
    </AuthProvider>
  );
}
