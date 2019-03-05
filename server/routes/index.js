import express from 'express';
import user from './user';
import contract from './contract';


const router = express.Router();
// router.use('/account', account);
// router.use('/memo', memo);
router.use('/user', user);
router.use('/contract', contract);


export default router;
