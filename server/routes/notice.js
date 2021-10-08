import express from 'express';
const router = express.Router();
import { create, getAll } from '../controllers/noitce_controller.js';
import {validateToken} from '../config/authMiddleware.js'

router.post('/create',create );
router.get('/getall',validateToken,getAll);


export default router;