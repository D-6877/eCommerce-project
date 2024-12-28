import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        // require: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    catagory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'catagory',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        type: Boolean,
    }



}, {
    timestamps: true
})

const product = mongoose.model('product', productSchema);
export default product;