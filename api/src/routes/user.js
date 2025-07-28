import express from 'express';
import {getUserProfile, updateUserProfile} from '../controllers/user.js';

const router = express.Router();

router.get('/profile', getUserProfile);
router.post('/profile/update', updateUserProfile);



export default router;