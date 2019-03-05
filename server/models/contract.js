import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Contract = new Schema({
    name : String,
    company: String,
    recruiter : String,
    address : String,
    respondents : Array
});

export default mongoose.model('contract', Contract);
