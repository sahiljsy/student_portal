import express from 'express';
const router = express.Router();

import { create, getAllAttachment, getAttachment, deleteassignment, downloadFile } from '../controllers/assignment_controller.js';


router.post('/create',create );
router.post('/getall',getAllAttachment);
router.post('/getAttachment',getAttachment);
router.delete('/delete',deleteassignment);
router.get('/downloadFile/:id', downloadFile);

export default router;