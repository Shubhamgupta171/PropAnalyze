const reportService = require('../services/report.service');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

/**
 * Generate PDF report and upload to cloud
 * POST /api/v1/reports/generate
 * Body: { propertyId, analysisId }
 */
exports.generateReport = catchAsync(async (req, res, next) => {
  const { propertyId, analysisId } = req.body;

  if (!propertyId || !analysisId) {
    return next(new AppError('Property ID and Analysis ID are required', 400));
  }

  const result = await reportService.generatePDFReport(
    req.user.id,
    propertyId,
    analysisId
  );

  res.status(201).json({
    status: 'success',
    message: 'PDF report generated successfully',
    data: {
      report: result.report,
      downloadUrl: result.downloadUrl,
      fileName: result.fileName
    }
  });
});

/**
 * Generate PDF report and stream directly
 * POST /api/v1/reports/download
 * Body: { propertyId, analysisId }
 */
exports.downloadReport = catchAsync(async (req, res, next) => {
  const { propertyId, analysisId } = req.body;

  if (!propertyId || !analysisId) {
    return next(new AppError('Property ID and Analysis ID are required', 400));
  }

  const result = await reportService.generatePDFStream(
    req.user.id,
    propertyId,
    analysisId
  );

  // Set headers for PDF download
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${result.fileName}"`);
  res.setHeader('Content-Length', result.buffer.length);

  // Send PDF buffer
  res.send(result.buffer);
});

/**
 * Create a report record manually
 * POST /api/v1/reports
 */
exports.createReport = catchAsync(async (req, res, next) => {
  const report = await reportService.createReport(req.user.id, req.body);
  res.status(201).json({ status: 'success', data: { report } });
});

/**
 * Get all reports for current user
 * GET /api/v1/reports
 */
exports.getAllReports = catchAsync(async (req, res, next) => {
  const reports = await reportService.getAllReports(req.user.id);
  res.status(200).json({ status: 'success', results: reports.length, data: { reports } });
});

/**
 * Get a specific report by ID
 * GET /api/v1/reports/:id
 */
exports.getReport = catchAsync(async (req, res, next) => {
  const report = await reportService.getReportById(req.user.id, req.params.id);
  
  if (!report) {
    return next(new AppError('Report not found', 404));
  }

  res.status(200).json({ status: 'success', data: { report } });
});

/**
 * Delete a report
 * DELETE /api/v1/reports/:id
 */
exports.deleteReport = catchAsync(async (req, res, next) => {
  const deleted = await reportService.deleteReport(req.user.id, req.params.id);
  
  if (!deleted) {
    return next(new AppError('Report not found', 404));
  }

  res.status(204).json({ status: 'success', data: null });
});

