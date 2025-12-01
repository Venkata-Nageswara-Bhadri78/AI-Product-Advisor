import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import LinearLoading from "../ui/LinearLoading";
import EmptyResponsePage from "../ui/EmptyResponsePage";
import PopUpSave from "../ui/PopUpSave";

const API_URL = import.meta.env.VITE_API_URL;

const AIResponse = ({ isOn, model, prompt, setPrompt, clearResponse, setClearResponse }) => {
  const [answer, setAnswer] = useState("Loading...");

  const [jsonData, setJsonData] = useState([]);
  const [responseJsonData, setResponseJsonData] = useState([]);
  const [loading, setLoading] = useState(true);

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
            body: JSON.stringify({ userPrompt: prompt }),
          });

          console.log("Haiiii");
        
          const data = await response.json();
          if (data.success) {
            setAnswer(data.response)
 
            if(isOn){
              const k = convertResponseToJSON(responseJsonData)

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

  
  useEffect(() => {
    setResponseJsonData(convertResponseToJSON(answer));
  }, [answer]);


  if(loading && prompt){
      return (
        <div className="p-3">
          <LinearLoading />
          <div>Response Loading...</div>
        </div>
      )
    }

  if (!responseJsonData || (Array.isArray(responseJsonData) && responseJsonData.length === 0)) {
    return (
      <EmptyResponsePage message="Oops! We couldn’t find any products matching your requirements. Please try adjusting your prompt." />
    );
  }
  
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