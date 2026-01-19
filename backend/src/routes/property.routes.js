const express = require('express');
const propertyController = require('../controllers/property.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const uploadMiddleware = require('../middlewares/upload.middleware');

const router = express.Router();

/**
 * @swagger
 * /properties/properties-within/{distance}/center/{latlng}/unit/{unit}:
 *   get:
 *     summary: Find properties within a specific distance of a center point
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: distance
 *         required: true
 *         schema:
 *           type: number
 *         description: Distance from center
 *       - in: path
 *         name: latlng
 *         required: true
 *         schema:
 *           type: string
 *         description: Latitude and longitude (lat,lng)
 *       - in: path
 *         name: unit
 *         required: true
 *         schema:
 *           type: string
 *           enum: [mi, km]
 *         description: Distance unit
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 results:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Property'
 */
router
  .route('/properties-within/:distance/center/:latlng/unit/:unit')
  .get(propertyController.getPropertiesWithin);

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Real estate listing management
 */

/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Get all properties with filters
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: price[gte]
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: beds
 *         schema:
 *           type: integer
 *       - in: query
 *         name: asset_class
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort field (e.g. -price)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Property'
 *   post:
 *     summary: Create a new property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               beds:
 *                 type: integer
 *               baths:
 *                 type: number
 *               sqft:
 *                 type: number
 *               description:
 *                 type: string
 *               asset_class:
 *                 type: string
 *               location:
 *                 type: string
 *                 description: JSON stringified location object
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 */
router.route('/')
  .get(propertyController.getAllProperties)
  .post(
    authMiddleware.protect, 
    authMiddleware.restrictTo('agent', 'admin'), 
    uploadMiddleware.uploadPropertyImages, 
    propertyController.createProperty
  );

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Get a specific property by ID
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *   patch:
 *     summary: Update a property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: 'string' }
 *               price: { type: 'number' }
 *               images:
 *                 type: array
 *                 items: { type: 'string', format: 'binary' }
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     summary: Delete a property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 */
router.route('/:id')
  .get(propertyController.getProperty)
  .patch(
    authMiddleware.protect, 
    uploadMiddleware.uploadPropertyImages,
    propertyController.updateProperty
  )
  .delete(authMiddleware.protect, propertyController.deleteProperty);

module.exports = router;
