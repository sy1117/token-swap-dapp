import express from 'express';
import User from '../models/transfer';
import mongoose from 'mongoose';



const router = express.Router();

router.get('/', (req, res) => {
    User.find({},function (err, users) {
        if (err) return console.error(err);
        else res.status(200).json(users);
    })
});


export default router;
