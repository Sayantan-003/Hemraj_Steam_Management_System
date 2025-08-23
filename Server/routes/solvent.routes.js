import express from 'express';
import { 
    createSolventLog, 
    getSolventDataByOperator, 
    getSolventDashboardData,
    getSolventPerformanceHistory,
    exportSolventDashboard,
    getAvailableOperators,
    getShiftDetails
} from '../controllers/solvent.controller.js';
import validateSolvent from '../middlewares/validateSolvent.js';

const router = express.Router();

router.post('/create', validateSolvent, createSolventLog);
router.get('/operator', getSolventDataByOperator);
router.get('/dashboard', getSolventDashboardData);
router.get('/performance-history', getSolventPerformanceHistory);
router.get('/export', exportSolventDashboard);
router.get('/available-operators', getAvailableOperators);
router.get('/shift-details', getShiftDetails);

export default router;
