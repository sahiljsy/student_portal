import express from 'express';
const router = express.Router();
import { create } from '../controllers/assignment_controller.js';

router.post('/create',create );



export default router;