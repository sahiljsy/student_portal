import express from 'express';
const router = express.Router();
import { create, getAll } from '../controllers/noitce_controller.js';

router.post('/create',create );
router.get('/getall',getAll);


export default router;