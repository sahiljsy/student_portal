import express from 'express';
const router = express.Router();
import {checksubmission, newSubmission} from '../controllers/submission_controller.js'

router.post('/newSubmission',newSubmission);
router.post('/checkSubmission', checksubmission)

export default router;
