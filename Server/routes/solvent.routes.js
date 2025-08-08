import express from 'express';
import { createSolventLog, getSolventDataByOperator } from '../controllers/solvent.controller.js';
import validateSolvent from '../middlewares/validateSolvent.js';

const router = express.Router();

router.post('/create', validateSolvent);
router.get('/operator', getSolventDataByOperator);

export default router;
