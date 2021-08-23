import React, { useState, useEffect } from 'react';
import type { Credential } from '../../../types';
import CredentialCard from '../../components/CredentialCard/CredentialCard';
import styles from './Dashboard.module.css';
import Buttons from '../../components/Buttons/Buttons';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [masterPassword, setMasterPassword] = useState('');

  async function fetchCredentials() {
    const response = await fetch('/api/credentials', {
      headers: {
        Authorization: masterPassword,
      },
    });
    const credentials = await response.json();
    setCredentials(credentials);
  }

  useEffect(() => {
    if (!masterPassword) {
      setCredentials([]);
    }
    fetchCredentials();
  }, [masterPassword]);

  async function deleteCredential(service: string, masterPassword: string) {
    await fetch(`/api/credentials/${service}`, {
      method: 'DELETE',
      headers: { Authorization: masterPassword },
    });
  }

  async function handleDeleteClick(service: string) {
    await deleteCredential(service, masterPassword);
    await fetchCredentials();
  }

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
            <CredentialCard
              key={credential._id}
              credentialData={credential}
              onDeleteClick={handleDeleteClick}
            />
          ))}
      </div>
      <Buttons />
    </main>
  );
}
