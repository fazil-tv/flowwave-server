import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRout from './interfaces/routes/authroutes'
import adminRout from './interfaces/routes/adminrouts'
import userRout from './interfaces/routes/userRouts'
import cookieParser from 'cookie-parser';
import { connectDB } from "./infrastructure/config";

dotenv.config();


const PORT = process.env.PORT || 4000;
const app = express();



app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  credentials:true,
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));


app.use(cookieParser());
app.use(express.json());

app.use("/api", authRout);
app.use("/userapi", userRout);
app.use("/adminapi", adminRout);

app.listen(PORT, async() => {
  await connectDB()
  console.log(`Server is running on http://localhost:${PORT}`);
});
