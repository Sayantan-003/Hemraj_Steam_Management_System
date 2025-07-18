const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const inputController = require('../controllers/input.controllers');
const dashboardController = require('../controllers/dashboard.controllers');

// Input form routes (only InputUser)
router.post('/input', authenticate, authorize(['InputUser']), inputController.createInput);
router.get('/input', authenticate, authorize(['InputUser']), inputController.getOwnInputs);

// Dashboard routes (only DashboardUser)
router.get('/dashboard', authenticate, authorize(['DashboardUser']), dashboardController.getDashboardData);

module.exports = router;
