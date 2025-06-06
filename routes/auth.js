import express from 'express';
import { register, login, getUserProfile, logout } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getUserProfile);
router.post('/logout', protect, logout);

export default router;
