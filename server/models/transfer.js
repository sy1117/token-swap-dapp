import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Transfer = new Schema({
    address : String,
    transactionHash : {type: String, unique: true},
    returnValues : {
        to : String,
        from : String,
        value : Number
    }
});

export default mongoose.model('transfer', Transfer);
