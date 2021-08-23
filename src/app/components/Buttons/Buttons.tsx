import { Link } from 'react-router-dom';
import styles from './Buttons.module.css';
import React from 'react';

export default function Buttons(): JSX.Element {
  return (
    <div className={styles.BtnWrapper}>
      <Link to="/add">
        <button className={styles.searchBtn}>Add</button>
      </Link>
      <Link to="/search">
        <button className={styles.addBtn}>Search</button>
      </Link>
    </div>
  );
}
