import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import LinearLoading from "../ui/LinearLoading";
import EmptyResponsePage from "../ui/EmptyResponsePage";
import PopUpSave from "../ui/PopUpSave";

const API_URL = import.meta.env.VITE_API_URL;

const AIResponse = ({ isOn, model, prompt, setPrompt, clearResponse, setClearResponse }) => {
  const [answer, setAnswer] = useState("Loading...");
  // const [gptKey, setGptKey] = useState("");
  // const [geminiKey, setGeminiKey] = useState("");

  const [jsonData, setJsonData] = useState([]);
  const [responseJsonData, setResponseJsonData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const defaultPrompt = `You have given a small prompt about which 
  // type of product should I want then you return only the data that suitable 
  // with the user requirement 100/100 (Return only those which aligns well with 
  // user prompt) and also don't give any extra data. Here is your Product Json Data : ${JSON.stringify(jsonData)}`;


  useEffect(() => {
    if(clearResponse){
      setResponseJsonData([]);
      setPrompt("");
      setClearResponse(false)
    }
  }, [clearResponse]);
  useEffect(() => {
    setLoading(true);
  }, [prompt]);

  useEffect(() => {
    
    if (!jsonData.length) return;

    const fetchData = async () => {
      try {
        if (model === "chatgpt") {
          const response = await fetch(`${API_URL}/getapikey`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model }),
          });
          const data = await response.json();
          if (data.success) {
            // setGptKey(data.key);
            const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${data.key}`,
              },
              body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                  { role: "system", content: "You are a product advisor" },
                  { role: "user", content: prompt || "Say Hi" },
                ],
                max_tokens: 300,
              }),
            });

            if (!gptResponse.ok) {
              const errorData = await gptResponse.json();
              console.error("GPT Model error:", errorData);
              setAnswer("Error: " + (errorData.error?.message || gptResponse.statusText));
              return;
            }

            const result = await gptResponse.json();
            setAnswer(result.choices[0].message.content.trim());
          }
        }
        else if (model === "gemini") {
          const response = await fetch(`${API_URL}/getapikey`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model }),
          });
        
          const data = await response.json();
          if (data.success) {
            // setGeminiKey(data.key);

            const promptText = `
              You are given a product catalog in JSON format. 
              Return ONLY the products that match the user's request. 
              Catalog: ${JSON.stringify(jsonData)}
              User request: ${prompt}
            `;

//             const promptText = `You are given a JSON array of products. Return ONLY the products that match the user's request.
// Output MUST be valid JSON. DO NOT include any extra text.
// Catalog: [{...}, {...}, ...], Here is the JSON data: ${jsonData}`
        
            const geminiResponse = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${data.key}`,
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
            setAnswer(extractData || "Unable to Extract Data");

            if(isOn){
              const k = convertResponseToJSON(extractData)
              // useEffect(() => {
                const fetchHistory = async () => {
                  const response = await fetch(`${API_URL}/addhistory`, {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({prompt: prompt, response: k})
                  })

                  const data = await response.json();
                  if(data.success){
                    <PopUpSave show={true} success={data.success} message={data.message} />
                  }
                  else{
                    <PopUpSave show={true} success={data.success} message={data.message} /> 
                  }
                }
                fetchHistory();
              // }, [prompt, k])
            }
            setLoading(false);
          }
        }        
      } catch (err) {
        console.error("Error:", err);
        setAnswer("Error: " + err.message);
      }
    };

    fetchData();
  }, [model, prompt, jsonData]);

  // Get PRODUCT_CATALOG_DATA
  useEffect(() => {
    const fetchCatalog = async () => {
      try{
        const response = await fetch(`${API_URL}/get_product_catalog`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({data: 'Example'})
        })
        const data = await response.json();
        if(data.success){
          setJsonData(data.product_catalog);
        }
      }
      catch(err){
        
      }
    }
    fetchCatalog();
  }, []);

  // console.log(answer.substring(7, answer.length-3));
  // const dataa = convertResponseToJSON(answer);
  useEffect(() => {
    setResponseJsonData(convertResponseToJSON(answer));
  }, [answer]);

  // if (!responseJsonData || (Array.isArray(responseJsonData) && responseJsonData.length === 0)) {
    if(loading && prompt){
      return (
        <div className="p-3">
          <LinearLoading />
          <div>Response Loading...</div>
        </div>
      )
    }
  // }
  // console.log(responseJsonData);

  if (!responseJsonData || (Array.isArray(responseJsonData) && responseJsonData.length === 0)) {
    return (
      <EmptyResponsePage message="Oops! We couldn’t find any products matching your requirements. Please try adjusting your prompt." />
    );
  }
  
  // if(!isJSON(answer)){
  //   return <div>{answer}</div>
  // }
  // console.log("responseJsonData:", responseJsonData);

  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5">
      {Array.isArray(responseJsonData) && responseJsonData.map((card, index) => {
        return (
          <div key={index}>
            <ProductCard product={card} />
          </div>
        )
      })}
    </div>
  );
};

function convertResponseToJSON(str){
  if(!str){
    return null;
  }

  try{
    const match = str.match(/(\[.*\]|\{.*\})/s);
    if(match){
      return JSON.parse(match[0]);
    }
  }
  catch(err){
    console.error("safeJsonParse failed:", err, "Raw:", str);
  }
  return str;
}

export default AIResponse;