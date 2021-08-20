import React from 'react';
import { Credential } from '../../../types';
import style from './CredentialCard.module.css';

type CredentialProps = {
  credentialData: Credential;
};

export default function credentialCard({
  credentialData,
}: CredentialProps): JSX.Element {
  return (
    <div className={style.credentialCardWrapper}>
      <p>Service:{credentialData.service}</p>
      <p>Username:{credentialData.username}</p>
      <p>Password:{credentialData.password} </p>
    </div>
  );
}
