import express from 'express';
import mongoose from 'mongoose';
import Contract from '../models/contract';

const Schema = mongoose.Schema;
const router = express.Router();

router.post('/search',(req, res) => {
    Contract.find({ address : { $in : req.body.addresses }}, (err, contracts)=>{
        if(err) console.log(err);
        if(contracts){
            return res.status(200).json(contracts);
        }
    });
});
router.post('/', (req, res) => {
    console.log({
        name : req.body.name,
        company : req.body.company,
        recruiter : req.body.recruiter,
        address : req.body.address,
        respondents : req.body.respondents
    })
    let con = new Contract({
        name : req.body.name,
        company : req.body.company,
        recruiter : req.body.recruiter,
        address : req.body.address,
        respondents : req.body.respondents
    });
    con.save((err,result)=>{
        return res.status(200).json(result);
    });
});

export default router;
