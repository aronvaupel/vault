import React from 'react';
import styles from './Dashboard.module.css';

export default function Dashboard(): JSX.Element {
  return (
    <>
      <h1 className={styles.container}>Vault</h1>
      <p>My personal password manager</p>
      <input type="text" placeholder="Masterpassword" />
      <div>container for later</div>
    </>
  );
}
