import express from 'express';
import { 
  getUserProfile, 
  updateUserProfile, 
  changePassword 
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../config/uploadConfig.js'; 

const router = express.Router();


router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, upload.single('profilePicture'), updateUserProfile);

// Password Change Route
router.put('/change-password', protect, changePassword);

export default router;