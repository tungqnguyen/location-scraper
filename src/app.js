
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;
const placeDetection = require('@alpaca-travel/place-detection');

app.use(express.json());

app.get('/', async (req, res) => {
  const { url } = req.query;
  try {
    const data = await placeDetection.scrape({ url });
    // console.log('data return', JSON.stringify(data));
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
