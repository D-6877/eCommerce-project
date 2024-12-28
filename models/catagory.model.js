import mongoose from "mongoose";


const catagorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        lowercase: true
    }


})

const catagory = mongoose.model('catagory', catagorySchema);
export default catagory;