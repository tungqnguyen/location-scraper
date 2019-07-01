
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;
const viewsPath = path.join(__dirname, '../views');
const placeDetection = require('@alpaca-travel/place-detection');

app.use(express.json());
app.set('views', viewsPath);

app.get('/', async (req, res) => {
  const { url } = req.query;
  res.sendFile(path.join(`${viewsPath}/index.html`));
  try {
    const data = await placeDetection.scrape({ url });
    console.log('data return from API to client', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
