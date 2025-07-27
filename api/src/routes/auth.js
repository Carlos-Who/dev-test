import express from 'express';
import { db } from '../database.js';
import { logInWithEmailAndPassword } from '../controllers/auth.js';

const router = express.Router();

router.post('/login', logInWithEmailAndPassword);

export default router;