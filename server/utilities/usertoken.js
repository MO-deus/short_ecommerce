import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "1d" });
};