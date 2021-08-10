import { readFile } from 'fs/promises';

export async function readCredentials(): Promise<Credential> {
  const response = await readFile('src/db.json', 'utf-8');
  const db = JSON.parse(response);
  const credentials = db.credentials;
  return credentials;
}
