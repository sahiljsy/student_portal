import express from 'express';
const router = express.Router();
import {create, addStudent, update, getAll} from '../controllers/subject_controller.js'

router.post('/create',create );
router.post('/update',update );
router.post('/addstudent', addStudent)
router.get('/getall', getAll)


export default router;