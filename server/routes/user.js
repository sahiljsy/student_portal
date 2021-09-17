import express from 'express';
const router = express.Router();
import { create, signin } from '../controllers/user_controller.js';

router.post('/create',create );
router.post('/signin', signin);


export default router;