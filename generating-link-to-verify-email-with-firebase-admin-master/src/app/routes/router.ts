import { Router } from 'express'
import { emailVerification } from '../services/emailVerification.service';

export const router = Router();

router.post('/send-email-verification',emailVerification)