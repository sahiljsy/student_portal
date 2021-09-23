import express from 'express';
const router = express.Router();
import {create, addStudent} from '../controllers/subject_controller.js'

router.post('/create',create );
router.post('/addstudent', addStudent)


export default router;