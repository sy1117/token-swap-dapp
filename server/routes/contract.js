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
    let con = new Contract({
        name : req.body.name,
        company : req.body.company,
        recruiter : req.body.recruiter,
        address : req.body.address,
        comments: req.body.comments,
        respondents : req.body.respondents
    });
    con.save((err,result)=>{
        if(err) console.log(err);
        return res.status(200).json(result);
    });
});

router.put('/:address', (req, res) => {
    Contract.findOneAndUpdate({address: req.params.address}, req.body, (err, result)=>{
        if(err) console.log(err);
        return res.status(200).json(result);
    });
});

router.delete('/:address', (req, res) => {
    Contract.findOneAndRemove({address: req.params.address}, (err, result)=>{
        if(err) console.log(err);
        return res.status(200).json(result);
    });
});

export default router;
