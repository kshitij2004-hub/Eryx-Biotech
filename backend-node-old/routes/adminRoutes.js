import express from 'express';
import { loginAdmin, registerAdminSeed } from '../controllers/adminController.js';

const router = express.Router();

// Public route to handle visual dashboard logins
router.post('/login', loginAdmin);

// Seed route to create your very first admin username/password entry
router.post('/register-seed', registerAdminSeed);

// Crucial: This is the exact line the server is complaining about missing!
export default router;
