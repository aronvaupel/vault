import React, { useState, useEffect } from 'react';
import type { Credential } from '../../../types';
import CredentialCard from '../../components/CredentialCard/CredentialCard';
import styles from './Dashboard.module.css';
import Buttons from '../../components/Buttons/Buttons';

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
    <main>
      <h1 className={styles.container}>Vault</h1>
      <p>My personal password manager</p>
      <input
        type="password"
        placeholder="Masterpassword"
        onChange={(event) => setMasterPassword(event.target.value)}
      />
      <div className={styles.cardWrapper}>
        {credentials.length !== 0 &&
          credentials.map((credential) => (
            <CredentialCard credentialData={credential} />
          ))}
      </div>
      <Buttons />
    </main>
  );
}
