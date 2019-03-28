import express from 'express';
import transfer from './transfer';

const router = express.Router();
router.use('/transfer', transfer);

export default router;
