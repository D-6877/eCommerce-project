import mongoose from 'mongoose'

const createDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Data base connection successfully `);


    } catch (error) {
        console.log("mongoose error", error);


    }

}

export default createDB;