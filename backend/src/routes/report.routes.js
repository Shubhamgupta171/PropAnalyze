const express = require('express');
const reportController = require('../controllers/report.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.route('/')
  .get(reportController.getAllReports)
  .post(reportController.createReport);

router.delete('/:id', reportController.deleteReport);

module.exports = router;
