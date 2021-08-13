import { readFile } from 'fs/promises';
import CryptoJS from 'crypto-js';

export async function validatePassword(password: string): Promise<boolean> {
  const hashedMasterPassword = await readFile('.password', 'utf-8');
  const hashedUserPassword = CryptoJS.SHA256(password).toString();

  return hashedMasterPassword === hashedUserPassword;
}
