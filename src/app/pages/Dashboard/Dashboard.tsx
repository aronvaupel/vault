import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  useEffect(() => {
    async function fetchCredentials() {
      const response = await fetch('/api/credentials', {
        headers: {
          Authorization: 'Hund',
        },
      });
      const credentials = await response.json();
      setCredentials(credentials);
    }
    fetchCredentials();
  }, []);
  return (
    <>
      <h1 className={styles.container}>Vault</h1>
      <p>My personal password manager</p>
      <input type="text" placeholder="Masterpassword" />
      <div>container for later</div>
      {credentials?.forEach((credential) => console.log(credential))}
    </>
  );
}
