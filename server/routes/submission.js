import express from 'express';
const router = express.Router();
import {checksubmission, newSubmission, getallsubmission,downloadFile} from '../controllers/submission_controller.js'

router.post('/newSubmission',newSubmission);
router.post('/checkSubmission', checksubmission)
router.post('/getallsubmission',getallsubmission)
router.get('/downloadFile/:id', downloadFile);

export default router;
