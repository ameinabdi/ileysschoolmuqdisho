import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import questionRoutes from './question.route';

const router = express.Router();

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount user routes at /users
router.use('/users', userRoutes);

router.use('/question', questionRoutes);

export default router;