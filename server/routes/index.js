import express from 'express';
const router = express.Router();
import { homeController } from '../controllers/home_controller.js';
import user from './user.js';
import notice from './notice.js';
import subject from './subject.js';
import assignment from './assignment.js';

router.get('/', homeController);
router.use('/user',user);
router.use('/notice', notice)
router.use('/subject', subject);
router.use('/assignment',assignment)

export default router;