import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/server.js";

dotenv.config(); //--load env variables

connectDB(); //--connect database

const app = express(); 

// Middleware
app.use(cors());
app.use(express.json());

//Testing route
app.get("/", (req, res)=>{
    res.send("API is running smoothly for TaskSync");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

