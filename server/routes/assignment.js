import express from 'express';
const router = express.Router();
import { create, getAllAttachment, newSubmission, getAttachment, deleteassignment } from '../controllers/assignment_controller.js';

router.post('/create',create );
router.post('/getall',getAllAttachment);
router.post('/newSubmission',newSubmission);
router.post('/getAttachment',getAttachment);
router.delete('/delete',deleteassignment);



export default router;