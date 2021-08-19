import React, { useState, useEffect } from 'react';
import type { Credential } from '../../../types';
import styles from './Dashboard.module.css';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [masterPassword, setMasterPassword] = useState('');
  useEffect(() => {
    async function fetchCredentials() {
      const response = await fetch('/api/credentials', {
        headers: {
          Authorization: masterPassword,
        },
      });
      const credentials = await response.json();
      setCredentials(credentials);
    }
    fetchCredentials();
    if (!masterPassword) setCredentials([]);
  }, [masterPassword]);
  return (
    <>
      <h1 className={styles.container}>Vault</h1>
      <p>My personal password manager</p>
      <input
        type="password"
        placeholder="Masterpassword"
        onChange={(event) => setMasterPassword(event.target.value)}
      />
      <div>List of entries</div>
      {credentials.length !== 0 &&
        credentials.map((credential) => (
          <div>
            <p>Service:{credential.service}</p>
            <p>Username:{credential.username}</p>
            <p>Password:{credential.password} </p>
          </div>
        ))}
    </>
  );
}
