import { useState } from 'react';
import { useAuth } from "react-oidc-context";

// API
import getApi from '../api/get';
import postApi from '../api/post';


// STYLES
import styles from '../styles/components.module.scss';

const UploadCSV = () => {
    const [message, setMessage] = useState("");
    const auth = useAuth();

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        console.log("Going in here", file);
        if (!file.name.endsWith(".csv")) {
            console.log("Failting");
            setMessage("Only CSV files are allowed.");
            return;
        } else {
            await uploadFile(file);
        }
    };

    const uploadFile = async (file: File) => {
        try {
            const authToken = auth.user?.id_token || '';
            console.log("Here");
            // Request a pre-signed URL from the backend
            const response = await getApi({authToken, endpoint: "gen-s3-url", querystring: `fileName=${file.name}`});

            console.log("Response", response, authToken);

            if (!response.ok || !response.body) {
                throw new Error(response.error);
            }

            const data = response.body;

            // Upload file to S3 using the pre-signed URL
            const res = await postApi({
                data: file,
                headers: {
                    "Content-Type": "text/csv",
                },
                customUrl: data.putUrl,
                method: "PUT",
            });

            // Process S3 file via Lambda  
            if (res && res.ok) { 
                console.log("Res", data);
                const res2 = await postApi({
                    auth: authToken,
                    data: {
                        fileName: data.fileName,
                        userId: auth?.user?.profile?.sub,
                    },
                    endpoint: 'upload',
                });

            }

            setMessage("File uploaded successfully!");
            console.log("Post successful")
        } catch (error:any) {
            setMessage(`Upload failed: ${error.message}`);
        }
    };

    return (
        <div>
        <h2>Upload CSV</h2>
        <label htmlFor="file-input" className={styles['custom-file-input']}> Choose CSV File to Upload </label>
        <input id="file-input" type="file" accept=".csv" onChange={handleFileChange} style={{display: 'none'}} />
        {message && <p>{message}</p>}
        </div>
    );
}

export default UploadCSV;
