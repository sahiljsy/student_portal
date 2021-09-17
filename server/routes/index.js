import express from 'express';
const router = express.Router();
import { homeController } from '../controllers/home_controller.js';
import user from './user.js';

router.get('/', homeController);
router.use('/user',user);

export default router;