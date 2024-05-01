import express from 'express';
import cors from "cors";
import userRoute from './routes/users.js'
import db_connection  from './db/connection.js';
import dotenv from 'dotenv';

dotenv.config();
db_connection();

const PORT = process.env.PORT || 5050;
const app = express();

// app.use(cors);
app.use(express.json());
app.use("/api/users", userRoute);

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});