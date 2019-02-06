const express = require('express');
const bodyParser = require('body-parser');
const priceController = require('./price/priceController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Controll-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/calculatePrice', priceController.calculatePrice, (req, res) => {
  res.send({ totalCost: `$${res.locals.cost.toFixed(2)}` });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}!`));

module.exports = app;
