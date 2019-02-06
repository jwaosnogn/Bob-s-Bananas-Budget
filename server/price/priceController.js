const priceController = {};

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
  res.locals.cost = cost;
  next();
};

module.exports = priceController;
