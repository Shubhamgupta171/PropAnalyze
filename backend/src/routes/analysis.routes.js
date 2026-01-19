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


module.exports = router;
