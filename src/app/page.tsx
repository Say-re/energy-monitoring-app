'use client'
import styles from "./page.module.scss";
import { AuthProvider } from "react-oidc-context";
import { useState } from 'react';
import Auth from "./auth";
import UploadCSV from '../components/upload.tsx';
import ManualData from '../components/manual-data.tsx'
import UsageHistory from '../components/usage-history';

const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_Gs5pCoWrS",
    client_id: "52hjjvomou60c0fl7u0slbl85b",
    redirect_uri: "http://localhost:8080",
    response_type: "code",
    scope: "email openid phone",
};
export default function Home() {
    const [action, setAction] = useState('');
    const actions = ['upload', 'input', 'history'];

    const handleSelectAction = (act: string) => {
        return () => {
            setAction(act);
            return null;
        }
    };
    return (
        <AuthProvider {...cognitoAuthConfig}>
            <div className={styles.page}>
                <main className={styles.main}>
                    <h1> Home Energy Monitoring </h1>
                    <p> Let's get started. What would you like to do? </p>
                    {actions.map((act, indx) => {
                        const btnText = act === 'upload' ? 'Upload CSV' : act === 'input' ? 'Manually Input Usage Data' : 'View Historical Data';
                        return (
                            <button key={indx} onClick={handleSelectAction(act)}>
                                {btnText}
                            </button>
                        );
                    })}
                    <Auth />
                    <UploadCSV />
                    <ManualData />
                    <UsageHistory />
                </main>
                <footer className={styles.footer}>
                </footer>
            </div>
        </AuthProvider>
    );
}
