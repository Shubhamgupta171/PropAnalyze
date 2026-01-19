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
