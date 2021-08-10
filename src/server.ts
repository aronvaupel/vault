import { readFile } from 'fs/promises';

async function readPasswords() {
  const data = await readFile('src/db.json', 'utf-8');
  console.log(data);
}
readPasswords();
