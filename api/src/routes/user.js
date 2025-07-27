import express from 'express';
import { getUserProfile } from '../controllers/user.js';

const router = express.Router();

router.get('/profile', getUserProfile);



export default router;