import express from 'express';
import user from './user';
import transfer from './transfer';

const router = express.Router();
router.use('/transfer', transfer);

export default router;
