const priceController = {};

priceController.calculatePrice = (req, res, next) => {
  const { startDate, numberOfDay } = req.body;
  console.log('calculating price');
  next();
}

module.exports = priceController;
