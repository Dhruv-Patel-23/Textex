import dotenv from "dotenv";
import mongoose from 'mongoose';
dotenv.config()
// const USERNAME=process.env.USER_NAME;
// const PASSWORD=process.env.PASSWORD


const connection = async() =>{
    
    try {
        await mongoose.connect(process.env.DATABASE_URL,{useUnifiedTopology:true,
            useNewUrlParser:true
        });
        console.log('database connected successfully');
    } catch (error) {
        console.log(error.message);
    }
}

export default connection;