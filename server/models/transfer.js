import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Transfer = new Schema({
    contractAddr : String,
    to : String,
    from : String,
    value : Number
});

export default mongoose.model('transfer', Transfer);
