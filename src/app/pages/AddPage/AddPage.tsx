import React, { useState } from 'react';
import styles from './AddPage.module.css';

export default function AddPage(): JSX.Element {
  const [masterPassword, setMasterPassword] = useState<string>('');
  const [service, setService] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [passWord, setPassword] = useState<string>('');

  async function addCredential() {
    const newCredential = {
      service: service,
      username: userName,
      password: passWord,
    };
    const response = await fetch('/api/credentials', {
      method: 'POST',
      headers: {
        Authorization: masterPassword,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCredential),
    });
    console.log(await response.json());
    alert('Done');
  }

  return (
    <main>
      <h1>Add new Credential</h1>
      <form
        className="addCredentialForm"
        onSubmit={(event) => {
          event.preventDefault();
          addCredential();
        }}
      >
        <h4>Service</h4>
        <input
          type="text"
          placeholder="service"
          value={service}
          onChange={(event) => setService(event.target.value)}
          required
        />
        <h4>Username</h4>
        <input
          type="text"
          placeholder="userName"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          required
        />
        <h4>Password</h4>
        <input
          type="password"
          placeholder="passWord"
          value={passWord}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <h4>Masterpassword</h4>
        <input
          type="password"
          placeholder="Masterpassword"
          value={masterPassword}
          onChange={(event) => setMasterPassword(event.target.value)}
          required
        />

        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </main>
  );
}
