import express from 'express';
const router = express.Router();
import { create, signin, info, update } from '../controllers/user_controller.js';

router.post('/create',create );
router.post('/signin', signin);
router.post('/update', update);
router.get('/info', info);



export default router;