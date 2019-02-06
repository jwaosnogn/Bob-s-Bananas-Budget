const redis = require('redis');

const priceController = {};

const databaseKey = process.env.NODE_ENV === 'test' ? 1 : 0;
const client = redis.createClient();
client.select(databaseKey);

priceController.calculatePrice = (req, res, next) => {
  const { startDate, numberOfDays } = req.body;
  const currentDay = new Date(startDate);

  // Edge Cases
  if (!startDate || numberOfDays === undefined) {
    return res.status(400).send('Error: Start date and/or number of Days missing');
  }
  if (numberOfDays < 0) {
    return res.status(400).send('Error: Number of days has to be at least 0');
  }
  if (numberOfDays === 0) {
    return res.send({ totalCost: '$0.00' });
  }
  if (isNaN(currentDay)) {
    return res.status(400).send('Erorr: Please input correct format for start day');
  }

  // Creating unique key to be checked/stored in Redis
  const key = JSON.stringify([startDate, numberOfDays]);

  // Check Redis if request with same parameters has been made before
  client.get(key, (err, result) => {
  // If this is a request that hasn't been made before, calculate cost, store into Redis, and send output
    if (!result) {
      let cost = 0;
      // Iterate through all days in range, adding to cost only if weekday with multiplier depending on date
      for (let i = 0; i < numberOfDays; i += 1) {
        const date = currentDay.getDate();
        const day = currentDay.getDay();
        const multiplier = Math.floor((date - 1) / 7);
        if (day >= 1 && day <= 5) {
          cost += 0.05 + 0.05 * multiplier;
        }
        currentDay.setDate(currentDay.getDate() + 1);
      }
      client.set(key, cost);
      res.locals.cost = cost;
      next();
    } else {
      // If not a new request, send cached cost
      res.locals.cost = Number(result);
      next();
    }
  });
};

module.exports = priceController;
