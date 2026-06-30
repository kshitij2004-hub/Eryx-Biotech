import express from 'express';
import { getSafetyReports, createSafetyReport } from '../controllers/safetyController.js';
import protectAdminAction from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/safety -> Public endpoint allowing users to submit adverse effects reports
router.route('/').post(createSafetyReport);

// GET /api/safety -> Protected administrative endpoint to view submitted cases
router.route('/').get(protectAdminAction, getSafetyReports);

export default router;