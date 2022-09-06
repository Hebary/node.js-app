import express, { Router } from 'express';
import { createUser, login, profile } from '../controllers/usersController.js';
import checkAuth from '../middleware/checkAuth.js';
const router = Router();

router.post('/', createUser); 
router.post('/login', login);
router.get("/profile", checkAuth, profile);
export default router;