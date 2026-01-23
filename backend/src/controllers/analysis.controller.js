const analysisService = require('../services/analysis.service');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getROI = catchAsync(async (req, res, next) => {
  const { propertyId } = req.params;
  // Allow inputs via Query params (for GET) or Body (if converted to POST later)
  // For GET, we use req.query to pass overrides like ?interestRate=7
  const analysis = await analysisService.calculateROI(propertyId, req.query);

  res.status(200).json({
    status: 'success',
    data: {
      analysis,
    },
  });
});

exports.getMaxOffer = catchAsync(async (req, res, next) => {
  const { propertyId } = req.params;
  const { targetCoC } = req.query; // e.g. ?targetCoC=12
  
  if (!targetCoC) {
    return next(new AppError('Please provide a targetCoC percentage', 400));
  }

  const result = await analysisService.calculateMaxOffer(propertyId, targetCoC, req.query);

  res.status(200).json({
    status: 'success',
    data: result
  });
});

exports.getMarketOverview = catchAsync(async (req, res, next) => {
  const stats = await analysisService.getMarketStats();

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.saveAnalysis = catchAsync(async (req, res, next) => {
  const { propertyId } = req.params;
  const { strategy, metrics, inputs } = req.body;
  const userId = req.user.id;

  const analysis = await analysisService.saveAnalysis(userId, propertyId, strategy, metrics, inputs);

  res.status(201).json({
    status: 'success',
    data: { analysis }
  });
});

exports.getHistory = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const history = await analysisService.getHistory(userId);

  res.status(200).json({
    status: 'success',
    results: history.length,
    data: { history }
  });
});

exports.deleteAnalysis = catchAsync(async (req, res, next) => {
  await analysisService.deleteAnalysis(req.user.id, req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});
