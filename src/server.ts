import express, { response } from 'express';
import {
  addCredential,
  deleteCredential,
  getCredential,
  readCredentials,
  updateCredential,
} from './utils/credentials';
import type { Credential } from './types';

const app = express();
const port = 3000;
app.use(express.json());

app.get('/api/credentials/:service', async (req, res) => {
  const { service } = req.params;
  try {
    const credential: Credential = await getCredential(service);
    res.status(200).json(credential);
  } catch (error) {
    res.status(404).send(`Could not find service: ${service}`);
  }
});

app.post('/api/credentials', async (req, res) => {
  const credential: Credential = req.body;
  console.log(credential);
  await addCredential(credential);
  return res.status(200).send(credential);
});

app.delete('/api/credentials/:service', async (req, res) => {
  const { service } = req.params;

  await deleteCredential(service);
  res.status(200).send('Deleted');
});

app.get('/api/credentials', async (_req, res) => {
  try {
    res.status(200).json(await readCredentials());
  } catch (error) {
    console.error(error);
    response.status(500).send('Internal server error');
  }
});

app.put('/api/credentials/:service', async (req, res) => {
  try {
    const { service } = req.params;
    const credential: Credential = req.body;
    await updateCredential(service, credential);
    res.status(200).send(credential);
  } catch {
    console.error('error');
    res.status(404).send(`Could not find ${service}`);
  }
});

app.get('/', (_req, res) => {
  try {
    res.send('Hello World!');
  } catch (error) {
    console.error(error);
    response.status(404).send('Can´t connect to server!');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
