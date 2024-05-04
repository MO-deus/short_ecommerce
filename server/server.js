import express from 'express';
import cors from "cors";
import userRoute from './routes/users.js';
import productRoute from './routes/products.js';
import db_connection from './db/connection.js';
import dotenv from 'dotenv';

dotenv.config();
db_connection();

const PORT = process.env.PORT || 5050;
const app = express();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});