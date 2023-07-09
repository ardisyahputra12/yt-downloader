import express from 'express';
import cors from 'cors';
import youtube from 'ytdownloader-fts';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to youtube downloader');
})

app.post('/download', (req, res) => {
  const data = {
    link_yt: req.body.link_yt,
  };

  youtube(data.link_yt)
    .then((response) => res.send(response))
    .catch((err) => {
      try {
        const parsedError = JSON.parse(err.message);
        console.log(parsedError);
      } catch (e) {
        console.log('JSON invalid');
      }
    })
})

app.listen(4000, () => {
  console.log('Server Works !!! At port 4000');
})
