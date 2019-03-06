import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Contract = new Schema({
    name : String,
    company: String,
    recruiter : String,
    address : String,
    respondents : Array,
    comments:Schema.Types.Mixed
});

export default mongoose.model('contract', Contract);
