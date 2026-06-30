import express from 'express';
import { getProducts, createProduct, deleteProduct } from '../controllers/productController.js';
import protectAdminAction from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/products -> Public route to pull catalog items into your frontend UI grid
router.route('/').get(getProducts);

// POST /api/products -> Protected admin route to add new medical formulations from the dashboard
router.route('/').post(protectAdminAction, createProduct);

// DELETE /api/products/:id -> Protected admin route to purge items from the database catalog
router.route('/:id').delete(protectAdminAction, deleteProduct);

// The crucial line Node is scanning for:
export default router;