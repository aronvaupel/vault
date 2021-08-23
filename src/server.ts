import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {
  addCredential,
  deleteCredential,
  getCredential,
  readCredentials,
  updateCredential,
} from './utils/credentials';
import type { Credential } from './types';
import { validatePassword } from './utils/validation';
import { connectDatabase } from './utils/database';

if (!process.env.MONGODB_URL) {
  throw new Error('No mongo database available!');
}

const app = express();
const port = 3001;
app.use(express.json());

app.get('/api/credentials', async (req, res) => {
  const masterPassword = req.headers.authorization;
  if (!masterPassword) {
    res.status(400).send('Authorization header missing');
    return;
  } else if (!(await validatePassword(masterPassword))) {
    res.status(401).send('Unauthorized request');
    return;
  }
  try {
    const credentials = await readCredentials(masterPassword);
    res.status(200).json(credentials);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error! Please try again later.');
  }
});

app.get('/api/credentials/:service', async (req, res) => {
  const { service } = req.params;
  const masterPassword = req.headers.authorization;
  if (!masterPassword) {
    res.status(400).send('Authorization header missing');
    return;
  } else if (!(await validatePassword(masterPassword))) {
    res.status(401).send('Unauthorized request');
    return;
  }
  try {
    const credential = await getCredential(service, masterPassword);
    res.status(200).json(credential);
  } catch (error) {
    console.error(error);
    res.status(404).send(`Could not find service: ${service}`);
  }
});

app.post('/api/credentials', async (req, res) => {
  const credential: Credential = req.body;
  const masterPassword = req.headers.authorization;
  if (!masterPassword) {
    res.status(400).send('Authorization header missing');
    return;
  } else if (!(await validatePassword(masterPassword))) {
    res.status(401).send('Unauthorized request');
    return;
  }
  await addCredential(credential, masterPassword);
  return res.status(200).send(credential);
});

app.post('/api/credentials', async (request, response) => {
  const credential: Credential = request.body;
  const masterPassword = request.headers.authorization;
  if (!masterPassword) {
    response.status(400).send('Authorization header missing');
    return;
  } else if (!(await validatePassword(masterPassword))) {
    response.status(401).send('Unauthorized request');
    return;
  }
  await addCredential(credential, masterPassword);
  return response.status(200).send(credential);
});

app.delete('/api/credentials/:service', async (req, res) => {
  const { service } = req.params;
  const masterPassword = req.headers.authorization;
  await deleteCredential(service);
  if (!masterPassword) {
    res.status(400).send('Authorization header missing');
    return;
  } else if (!(await validatePassword(masterPassword))) {
    res.status(401).send('Unauthorized request');
    return;
  }
});

app.post('/api/credentials', async (req, res) => {
  const credential: Credential = req.body;
  const masterPassword = req.headers.authorization;
  if (!masterPassword) {
    res.status(400).send('Authorization header missing');
    return;
  } else if (!(await validatePassword(masterPassword))) {
    res.status(401).send('Unauthorized request');
    return;
  }

  const credentialId = await addCredential(credential, masterPassword);
  return res.status(200).send(credentialId);
});

app.patch('/api/credentials/:service', async (req, res) => {
  const { service } = req.params;
  const credential: Credential = req.body;
  const masterPassword = req.headers.authorization;
  if (!masterPassword) {
    res.status(400).send('Authorization header missing');
    return;
  } else if (!(await validatePassword(masterPassword))) {
    res.status(401).send('Unauthorized request');
    return;
  }
  try {
    await updateCredential(service, credential, masterPassword);
    res.status(200).json(credential);
  } catch (error) {
    console.error(error);
    res.status(404).send(`Could not find service: ${service}`);
  }
});

app.get('/', (_req, res) => {
  try {
    res.send('Hello World!');
  } catch (error) {
    console.error(error);
    res.status(404).send('Can´t connect to server!');
  }
});

connectDatabase(process.env.MONGODB_URL).then(() => {
  console.log('connected to db');
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
