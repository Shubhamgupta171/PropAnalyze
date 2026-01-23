const reportService = require('../services/report.service');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createReport = catchAsync(async (req, res, next) => {
  const report = await reportService.createReport(req.user.id, req.body);
  res.status(201).json({ status: 'success', data: { report } });
});

exports.getAllReports = catchAsync(async (req, res, next) => {
  const reports = await reportService.getAllReports(req.user.id);
  res.status(200).json({ status: 'success', results: reports.length, data: { reports } });
});

exports.deleteReport = catchAsync(async (req, res, next) => {
  await reportService.deleteReport(req.user.id, req.params.id);
  res.status(204).json({ status: 'success', data: null });
});
