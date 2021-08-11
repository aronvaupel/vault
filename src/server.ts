import express, { response } from 'express';
import { getCredential, readCredentials } from './utils/credentials';

const app = express();
const port = 3000;

app.get('/api/credentials/:service', async (req, res) => {
  const { service } = req.params;
  try {
    const credential = await getCredential(service);
    res.status(200).json(credential);
  } catch (error) {
    res.status(404).send(`Could not find service: ${service}`);
  }
});

app.get('/api/credentials', async (_req, res) => {
  try {
    res.status(200).json(await readCredentials());
  } catch (error) {
    response.status(500).send('Internal server error');
  }
});

app.get('/', (_req, res) => {
  try {
    res.send('Hello World!');
  } catch (error) {
    response.status(404).send('Can´t connect to server!');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
