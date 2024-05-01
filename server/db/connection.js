import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const db_Connection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected : ",connect.connection.name ,connect.connection.host);

    } catch (error) {
        console.log(error);
        return (1);
    }
}

export default db_Connection;