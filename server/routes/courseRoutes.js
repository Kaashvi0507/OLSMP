import express from 'express';
import { createCourse, getInstructorCourses } from '../controllers/courseController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCourse);

router.route('/instructor')
  .get(protect, getInstructorCourses);

export default router;