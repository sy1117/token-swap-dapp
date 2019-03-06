import express from 'express';
import User from '../models/user';
import mongoose from 'mongoose';



const router = express.Router();

router.get('/', (req, res) => {
    User.find({},function (err, users) {
        if (err) return console.error(err);
        else res.status(200).json(users);
    })
});


router.get('/:address', (req, res) => {
    User.findOne({address: req.params.address}, (err, user) => {
        if (err) throw err;
        if(user){
            return res.status(200).json(user)
        }
    });
});

router.post('/contract', (req, res) => {
    User.findOne({address: req.body.user}, (err, user) => {
        if (err) throw err;
        if(user){
            if(!user.contracts) user.contracts = [];
            user.contracts.push(req.body.contract);
            user.save((err, updated)=>{
                return res.status(200).json(updated);
            })
        }
    });
});

router.post('/contract/:address', (req, res) => {
    User.findOne({address: req.params.address}, (err, user) => {
        if (err) throw err;
        if(user){
            if(user.contracts) user.constracts =[];
            user.contracts.push(req.body.contract);
            user.update({contracts:user.contracts}, (err, _user)=>{
                if(err) throw err;
                return res.json({
                    success: true,
                    _user
                });
            });
        }
    });
});


export default router;
