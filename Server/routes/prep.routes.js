import express from 'express';
import { createPrepEntry } from '../controllers/prep.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validatePrepData } from '../middlewares/validatePrepData.js';

const router = express.Router();

// POST /api/prep
router.post('/', authMiddleware, validatePrepData, createPrepEntry);

export default router;
