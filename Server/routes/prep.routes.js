const express = require('express');
const router = express.Router();
const prepController = require('../controllers/prep.controllers');

// @route   POST /api/prep
// @desc    Create a new Prep log entry
router.post('/', prepController.createPrepLog);

// @route   GET /api/prep
// @desc    Get all Prep log entries
router.get('/', prepController.getAllPrepLogs);

// @route   GET /api/prep/:id
// @desc    Get a single Prep log by ID
router.get('/:id', prepController.getPrepLogById);

// @route   PUT /api/prep/:id
// @desc    Update a Prep log by ID
router.put('/:id', prepController.updatePrepLog);

// @route   DELETE /api/prep/:id
// @desc    Delete a Prep log by ID
router.delete('/:id', prepController.deletePrepLog);

module.exports = router;
