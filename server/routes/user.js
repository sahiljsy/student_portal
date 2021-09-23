import express from 'express';
const router = express.Router();
import { create, signin, info } from '../controllers/user_controller.js';

router.post('/create',create );
router.post('/signin', signin);
router.get('/info', info);


export default router;