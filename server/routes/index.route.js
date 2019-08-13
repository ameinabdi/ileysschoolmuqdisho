import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import questionRoutes from './question.route';
import classRoute from './class.route';
import subjectRoute from './subject.route';
const router = express.Router();

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount user routes at /users
router.use('/users', userRoutes);

router.use('/classes', classRoute);

router.use('/questions', questionRoutes);

router.use('/subjects', subjectRoute)
export default router;