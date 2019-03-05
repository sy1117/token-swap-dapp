import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
    address: String,
    name: String,
    userType : Number,
    contracts :[String],
    comments: Array
},{ collection: 'users' });

export default mongoose.model('user', User);
