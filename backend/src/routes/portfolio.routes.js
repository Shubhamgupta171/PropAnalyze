const express = require('express');
const portfolioController = require('../controllers/portfolio.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.route('/')
  .get(portfolioController.getAllPortfolios)
  .post(portfolioController.createPortfolio);

router.route('/:id')
  .get(portfolioController.getPortfolio)
  .delete(portfolioController.deletePortfolio);

router.post('/:id/properties', portfolioController.addProperty);
router.delete('/:id/properties/:propertyId', portfolioController.removeProperty);

module.exports = router;
