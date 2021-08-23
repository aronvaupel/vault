import React, { useState, useEffect } from 'react';
import type { Credential } from '../../../types';
import CredentialCard from '../../components/CredentialCard/CredentialCard';
import styles from './SearchPage.module.css';

export default function SearchPage(): JSX.Element {
  const [credential, setCredential] = useState<Credential | null>();
  const [masterPassword, setMasterPassword] = useState<string>('');
  const [searchService, setSearchService] = useState<string>('');

  async function findCredential() {
    const response = await fetch(`/api/credentials/${searchService}`, {
      headers: {
        Authorization: masterPassword,
      },
    });
    const credential = await response.json();
    setCredential(credential);
  }

  useEffect(() => {
    if (!masterPassword) setCredential(null);
  }, [masterPassword]);

  return (
    <main>
      <h1>Search</h1>
      <form
        className="addCredentialForm"
        onSubmit={(event) => {
          event.preventDefault();
          findCredential();
        }}
      >
        <h4>Search</h4>
        <input
          type="text"
          placeholder="Search"
          value={searchService}
          onChange={(event) => setSearchService(event.target.value)}
          required
        />
        <h4>Masterpassword</h4>
        <input
          type="text"
          placeholder="Masterpassword"
          value={masterPassword}
          onChange={(event) => setMasterPassword(event.target.value)}
          required
        />

        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
      <div className={styles.cardWrapper}>
        {credential && <CredentialCard credentialData={credential} />}
      </div>
    </main>
  );
}
