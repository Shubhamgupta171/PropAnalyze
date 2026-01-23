const portfolioService = require('../services/portfolio.service');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createPortfolio = catchAsync(async (req, res, next) => {
  const portfolio = await portfolioService.createPortfolio(req.user.id, req.body);
  res.status(201).json({ status: 'success', data: { portfolio } });
});

exports.getAllPortfolios = catchAsync(async (req, res, next) => {
  const portfolios = await portfolioService.getAllPortfolios(req.user.id);
  res.status(200).json({ status: 'success', results: portfolios.length, data: { portfolios } });
});

exports.getPortfolio = catchAsync(async (req, res, next) => {
  const portfolio = await portfolioService.getPortfolio(req.user.id, req.params.id);
  if (!portfolio) return next(new AppError('Portfolio not found', 404));
  res.status(200).json({ status: 'success', data: { portfolio } });
});

exports.addProperty = catchAsync(async (req, res, next) => {
  const item = await portfolioService.addPropertyToPortfolio(req.user.id, req.params.id, req.body.propertyId);
  res.status(201).json({ status: 'success', data: { item } });
});

exports.removeProperty = catchAsync(async (req, res, next) => {
  await portfolioService.removePropertyFromPortfolio(req.user.id, req.params.id, req.params.propertyId);
  res.status(204).json({ status: 'success', data: null });
});

exports.deletePortfolio = catchAsync(async (req, res, next) => {
  await portfolioService.deletePortfolio(req.user.id, req.params.id);
  res.status(204).json({ status: 'success', data: null });
});
