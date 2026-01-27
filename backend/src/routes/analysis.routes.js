const express = require('express');
const analysisController = require('../controllers/analysis.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Analysis
 *   description: Investment underwriting logic
 */

/**
 * @swagger
 * /analysis/roi/{propertyId}:
 *   get:
 *     summary: Get investment ROI metrics for a property
 *     tags: [Analysis]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the property
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Analysis'
 */
router.get('/roi/:propertyId', analysisController.getROI);

/**
 * @swagger
 * /analysis/max-offer/{propertyId}:
 *   get:
 *     summary: Calculate Max Allowable Offer to hit target CoC
 *     tags: [Analysis]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: targetCoC
 *         required: true
 *         schema:
 *           type: number
 *         description: Target Cash-on-Cash percentage (e.g. 12)
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: 'string' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     maxAllowableOffer: { type: 'number' }
 *                     targetCoC: { type: 'number' }
 */
router.get('/max-offer/:propertyId', analysisController.getMaxOffer);

/**
 * @swagger
 * /analysis/overview:
 *   get:
 *     summary: Get global market stats
 *     tags: [Analysis]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: 'string' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     avgPrice: { type: 'number' }
 *                     numProperties: { type: 'integer' }
 */
router.get('/overview', analysisController.getMarketOverview);

// History routes (Protected)
router.use(authMiddleware.protect);

/**
 * @swagger
 * /analysis/history:
 *   get:
 *     summary: Get all past analyses for the current user
 *     tags: [Analysis]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string }
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page: { type: integer }
 *                     limit: { type: integer }
 *                     totalResults: { type: integer }
 *                     totalPages: { type: integer }
 *                 data:
 *                   type: object
 *                   properties:
 *                     history:
 *                       type: array
 *                       items: { $ref: '#/components/schemas/Analysis' }
 */
router.get('/history', analysisController.getHistory);

/**
 * @swagger
 * /analysis/{propertyId}:
 *   post:
 *     summary: Save an analysis for a property
 *     tags: [Analysis]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [strategy, metrics, inputs]
 *             properties:
 *               strategy: { type: string }
 *               metrics: { type: object }
 *               inputs: { type: object }
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/:propertyId', analysisController.saveAnalysis);

/**
 * @swagger
 * /analysis/{id}:
 *   delete:
 *     summary: Remove an analysis from history
 *     tags: [Analysis]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: No Content
 */
router.delete('/:id', analysisController.deleteAnalysis);

module.exports = router;
