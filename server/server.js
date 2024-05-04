import express from 'express';
import cors from "cors";
import userRoute from './routes/users.js';
import productRoute from './routes/products.js';
import db_connection  from './db/connection.js';
import dotenv from 'dotenv';

dotenv.config();
db_connection();

const PORT = process.env.PORT || 5050;
const app = express();

const corsOptions = {
    credentials: true,
    origin: ['https://short-ecommerce-backend.vercel.app', 'http://localhost:3000']
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});