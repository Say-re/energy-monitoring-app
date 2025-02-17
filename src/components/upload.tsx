import { useState } from 'react';

// API
import postApi from '../api/post';


// STYLES
import styles from '../styles/components.module.css';

const UploadCSV = () => {
  const [message, setMessage] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file.name.endsWith(".csv")) {
      setMessage("Only CSV files are allowed.");
      return;
    } else {
      await uploadFile();
    }
  };

  const uploadFile = async () => {
    try {
      // Request a pre-signed URL from the backend
      const response = await postApi({endpoint: "/generate-presigned-url", data: {file_name: file.name}});

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      // Upload file to S3 using the pre-signed URL
      await fetch(data.presigned_url, {
        method: "POST",
        body: file,
        headers: {
          "Content-Type": "text/csv",
        },
      });

      setMessage("File uploaded successfully!");
    } catch (error) {
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
