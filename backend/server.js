// All Imports required for the project backend

import fs from 'fs';
import express, { response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';

import product_data from './product_catalog.js';

// Load environment variables
dotenv.config();

const app = express();

app.use(express.json());
// Use CORS with frontend URL from .env
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );

// app.use(cors());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

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
  const { model, userPrompt } = req.body;
  if(model=='chatgpt'){
    const gptKey = process.env.VITE_OPENAI_API_KEY;
    res.status(200).send({success: true, key: gptKey})
  }
  else{
    const geminiKey = process.env.VITE_GEMINI_API_KEY
    // res.status(200).send({success: true, key: geminiKey})

    const fetchResponse = async () => {
      const promptText = `
        You are given a product catalog in JSON format. 
        Return ONLY the products that match the user's request. 
        Catalog: ${JSON.stringify(product_data)}
        User request: ${userPrompt}
      `;

      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: promptText}],
              },
            ],
          }),
        }
      );

      if (!geminiResponse.ok) {
        const errorData = await geminiResponse.json();
        console.error("Gemini Model error:", errorData);
        setAnswer("Error: " + (errorData.error?.message || geminiResponse.statusText));
        return;
      }
      
      const result = await geminiResponse.json(); 
      const extractData = result.candidates[0].content.parts[0].text;
      // console.log(extractData);
      // const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      // setAnswer(extractData || "Unable to Extract Data");
      return res.status(200).send({success: true, response: extractData});
    }
    fetchResponse();
  }
});

// console.log(product_data);
const hist_table = `CREATE TABLE IF NOT EXISTS HISTORY (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prompt TEXT NOT NULL,
    response TEXT
  )`;

db.run(hist_table, [], (err) => {
  if(err){
    return console.log("ERROR IN HISTORY TABLE CREATION : "+err);
  }
  console.log("HISTORY TABLE CREATED");
})

app.post('/addhistory', (req, res) => {
  const { prompt, response } = req.body;
  console.log("Prompt : "+prompt);
  console.log("Response: "+JSON.stringify(response));

  const query = `insert into HISTORY (prompt, response) values (?, ?);`;
  db.run(query, [prompt, JSON.stringify(response)], (err) => {
    if(err){
      return res.status(500).send({success: false, message: `ERROR IN CHAT SAVING: ${err}`})
    }
    return res.status(200).send({success: true, message: "CHAT SAVED"});
  })
});

app.post("/get_product_catalog", (req, res) => {
  res.status(200).send({success: true, product_catalog: product_data})
})



app.post("/gethistory", (req, res) => {
  const { message } = req.body;
  db.all("Select * from History", [], (err, data) => {
    if(err){
      return res.status(500).send({success: false, history: "NO HISTORY FOUND"})
    }
    return res.status(200).send({success: true, history: data})
  })
})

// db.run("drop table History", [], (err) => {
//   if(err){
//     return console.log("ERROR IN HISTORY DELETION");
//   }
//   console.log("SUCESS");
// })

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});