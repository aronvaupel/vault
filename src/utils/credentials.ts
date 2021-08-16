import { readFile, writeFile } from 'fs/promises';
import { Credential, DB } from '../types';
import { encryptCredential, decryptCredential } from './crypto';
import { getCredentialCollection } from './database';

export async function readCredentials(): Promise<Credential[]> {
  const response = await readFile('src/db.json', 'utf-8');
  const db: DB = JSON.parse(response);
  const credentials = db.credentials;

  return credentials;
}

export async function getCredential(
  service: string,
  key: string
): Promise<Credential> {
  const credentials = await readCredentials();
  const credential = credentials.find(
    (credential) => credential.service === service
  );
  if (!credential) {
    throw new Error(`No credential found for service: ${service}!`);
  }
  const decryptedCredential = decryptCredential(credential, key);

  return decryptedCredential;
}

export async function addCredential(
  credential: Credential,
  key: string
): Promise<void> {
  const collection = getCredentialCollection();
  const newCredential = encryptCredential(credential, key);
  collection.insertOne(newCredential);
}

export async function deleteCredential(service: string): Promise<void> {
  const credentials = await readCredentials();
  const newCredentials = credentials.filter(
    (credential) => credential.service.toLowerCase() !== service.toLowerCase()
  );

  const newDB: DB = { credentials: newCredentials };
  await writeFile('src/db.json', JSON.stringify(newDB, null, 2));
}

export async function updateCredential(
  service: string,
  credential: Credential,
  key: string
): Promise<void> {
  const credentials = await readCredentials();
  const encryptedCredential = encryptCredential(credential, key);
  const filteredCredentials = credentials.filter(
    (credential) => credential.service !== service
  );
  const newDB: DB = {
    credentials: [...filteredCredentials, encryptedCredential],
  };
  await writeFile('src/db.json', JSON.stringify(newDB, null, 2));
}
