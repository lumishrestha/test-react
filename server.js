import cors from 'cors';
import compression from 'compression';
import express from 'express';

const app = express();

const baseUrl = `https://${process.env.PROJECT_DOMAIN}.glitch.me`

app.use(compression());

// your manifest must have appropriate CORS headers, you could also use '*'
app.use(cors({ origin: 'https://trello.com' }));

app.use(express.static('public'));

app.get('/', cors(), (request, res) => {
  res.send(`Go to ${baseUrl}/manifest.json`);
});

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});