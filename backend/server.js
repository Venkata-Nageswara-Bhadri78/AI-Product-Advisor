// All Imports required for the project backend

import fs from 'fs';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';

import product_data from './product_catalog.js';

// Load environment variables
dotenv.config();

const app = express();
// Middleware
app.use(express.json());
// Use CORS with frontend URL from .env
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );

app.use(cors());

const db = new sqlite3.Database(process.env.DB_FILE, (err) => {
    if(err){
        console.log("Error in SQL Setup : "+err.message);
    }
    else{
        console.log("SQL connected Sucessfully");
    }
})

// console.log("CLIENT_URL:", process.env.CLIENT_URL);

app.post('/example', (req, res) => {
  const {data} = req.body;
  console.log("Hai Backend Is Running Sucessfully");
  return res.status(200).send({success: true})
})

app.post("/getapikey", (req, res) => {
  const { model } = req.body;
  if(model=='chatgpt'){
    const gptKey = process.env.VITE_OPENAI_API_KEY;
    res.status(200).send({success: true, key: gptKey})
  }
  else{
    const geminiKey = process.env.VITE_GEMINI_API_KEY
    res.status(200).send({success: true, key: geminiKey})
  }
});

// console.log(product_data);

app.post("/get_product_catalog", (req, res) => {
  res.status(200).send({success: true, product_catalog: product_data})
})
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});