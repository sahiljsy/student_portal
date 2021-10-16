import express from 'express';
const router = express.Router();
import { create, signin, info, getMySubject, update } from '../controllers/user_controller.js';
import {validateToken} from '../config/authMiddleware.js';


router.post('/create',create );
router.post('/signin', signin);
router.post('/update', update);
router.get('/info', info);
router.post('/getmysubject', getMySubject);


export default router;