const express = require('express');
const reportController = require('../controllers/report.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware.protect);

/**
 * @swagger
 * /api/v1/reports/generate:
 *   post:
 *     summary: Generate PDF report and upload to cloud
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - propertyId
 *               - analysisId
 *             properties:
 *               propertyId:
 *                 type: integer
 *                 description: ID of the property
 *               analysisId:
 *                 type: integer
 *                 description: ID of the analysis
 *     responses:
 *       201:
 *         description: PDF report generated successfully
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Property or analysis not found
 */
router.post('/generate', reportController.generateReport);

/**
 * @swagger
 * /api/v1/reports/download:
 *   post:
 *     summary: Generate and download PDF report directly
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - propertyId
 *               - analysisId
 *             properties:
 *               propertyId:
 *                 type: integer
 *                 description: ID of the property
 *               analysisId:
 *                 type: integer
 *                 description: ID of the analysis
 *     responses:
 *       200:
 *         description: PDF file stream
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Property or analysis not found
 */
router.post('/download', reportController.downloadReport);

/**
 * @swagger
 * /api/v1/reports:
 *   get:
 *     summary: Get all reports for current user
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reports
 *   post:
 *     summary: Create a report record manually
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyId:
 *                 type: integer
 *               analysisId:
 *                 type: integer
 *               name:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Report created successfully
 */
router.route('/')
  .get(reportController.getAllReports)
  .post(reportController.createReport);

/**
 * @swagger
 * /api/v1/reports/{id}:
 *   get:
 *     summary: Get a specific report by ID
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Report details
 *       404:
 *         description: Report not found
 *   delete:
 *     summary: Delete a report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Report deleted successfully
 *       404:
 *         description: Report not found
 */
router.route('/:id')
  .get(reportController.getReport)
  .delete(reportController.deleteReport);

module.exports = router;

