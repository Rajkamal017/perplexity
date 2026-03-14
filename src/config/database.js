import mongoose from "mongoose";

const connectDB = async () =>{
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to DB`);
};

export default connectDB