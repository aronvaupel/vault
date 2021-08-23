import React from 'react';
import { Credential } from '../../../types';
import style from './CredentialCard.module.css';

type CredentialProps = {
  credentialData: Credential;
  onDeleteClick: (service: string) => void;
};

export default function credentialCard({
  credentialData,
  onDeleteClick,
}: CredentialProps): JSX.Element {
  return (
    <div className={style.credentialCardWrapper}>
      <p>Service:{credentialData.service}</p>
      <p>Username:{credentialData.username}</p>
      <p>Password:{credentialData.password} </p>
      <button onClick={() => onDeleteClick(credentialData.service)}>X</button>
    </div>
  );
}
