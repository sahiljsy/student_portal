import express from 'express';
const router = express.Router();
import { create, getAll, updatenotice, deletenotice } from '../controllers/noitce_controller.js';
import {validateToken} from '../config/authMiddleware.js'

router.post('/create',create );
router.get('/getall',validateToken,getAll);
router.post('/update',updatenotice)
router.delete('/delete',deletenotice);


export default router;