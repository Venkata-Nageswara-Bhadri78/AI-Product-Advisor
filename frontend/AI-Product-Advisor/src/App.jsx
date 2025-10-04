import { useEffect } from "react";
import DashBoard from './components/DashBoard';
import EmptyResponsePage from "./ui/EmptyResponsePage";

import AdvisorControls from "./components/AdvisorControls";
import { Route, Router, Routes } from "react-router-dom";
import ProductCatalog from "./components/ProductCatalog";
import ChatHistory from "./components/ChatHistory";
const API_URL = import.meta.env.VITE_API_URL;
function App() {
  return (
    <div className="bg-gray-300">
      <Routes>
        <Route path="/" element={<AdvisorControls />} />
        <Route path="/product_catalog" element={<ProductCatalog />} />
        <Route path="/chat_history" element={<ChatHistory chat={chat}/>} />
      </Routes>
    </div>
  )
}

export default App


const chat = [
  {
      prompt: "I want a device to monitor my heart health on the go",
      response: [
          {
            "brand": "spandan",
            "product_name": "Portable ECG Device",
            "price": 7328,
            "category": "Healthtech and Wellness",
            "description": "Monitor your heart health on the go with this portable ECG device, providing accurate readings that can be shared with your doctor."
          }
      ]
  },
  {
      prompt: "Looking for a massage gun to help with sore muscles",
      response: [
          {
            "brand": "caresmith",
            "product_name": "Charge Boost Massage Gun",
            "price": 1499,
            "category": "Healthtech and Wellness",
            "description": "Target sore muscles and improve recovery with this powerful massage gun, equipped with multiple attachments for a customized experience."
          },
          {
            "brand": "REMAXX",
            "product_name": "Neck Massager",
            "price": 1500,
            "category": "Healthtech and Wellness",
            "description": "Relieve tension in your neck and shoulders with this ergonomic massager, featuring multiple modes and heat therapy for ultimate relaxation."
          },
          {
            "brand": "caresmith",
            "product_name": "Revive Foot & Leg Massager",
            "price": 12999,
            "category": "Healthtech and Wellness",
            "description": "Soothe tired feet and legs with this comprehensive massager, featuring air compression and roller technology for a deep and invigorating massage."
          }
      ]
  },
  {
      prompt: "I need a smart lock to secure my home",
      response: [
          {
            "brand": "mygate",
            "product_name": "Door Lock PLUS",
            "price": 14990,
            "category": "Security & Surveillance",
            "description": "Secure your home with the mygate Door Lock PLUS, a smart lock with multiple access options and real-time notifications."
          },
          {
            "brand": "GLAVNA",
            "product_name": "LA5 WF-Glass Door Lock (BLT)",
            "price": 9690,
            "category": "Security & Surveillance",
            "description": "Secure your glass doors with the GLAVNA LA5 WF, a smart lock with a sleek design and advanced security features."
          },
          {
            "brand": "GLAVNA",
            "product_name": "LS10-Cabinet Lock",
            "price": 1190,
            "category": "Security & Surveillance",
            "description": "Keep your valuables safe with the GLAVNA LS10, a smart cabinet lock that can be easily installed and controlled with your smartphone."
          },
          {
            "brand": "GLAVNA",
            "product_name": "LP40-Padlock",
            "price": 1190,
            "category": "Security & Surveillance",
            "description": "The GLAVNA LP40 is a durable and weatherproof smart padlock that provides keyless access and enhanced security for your belongings."
          },
          {
            "brand": "mygate",
            "product_name": "Door Lock SE",
            "price": 9450,
            "category": "Security & Surveillance",
            "description": "The mygate Door Lock SE is a reliable and easy-to-use smart lock that provides keyless entry and enhanced security for your home."
          }
      ]
  },
  {
      prompt: "I want a robot vacuum cleaner with smart navigation",
      response: [
          {
            "brand": "ILIFE",
            "product_name": "T20s Pro",
            "price": 36900,
            "category": "Home Improvement",
            "description": "Experience superior cleaning performance with the ILIFE T20s Pro, a robot vacuum with powerful suction and mopping capabilities."
          },
          {
            "brand": "MecTURING",
            "product_name": "S9 Pro+",
            "price": 23890,
            "category": "Home Improvement",
            "description": "The S9 Pro+ is a powerful and intelligent robot vacuum that provides a thorough and efficient cleaning experience."
          },
          {
            "brand": "ILIFE",
            "product_name": "A20",
            "price": 17900,
            "category": "Home Improvement",
            "description": "The ILIFE A20 is a robotic vacuum cleaner with advanced mapping and scheduling features for a customized cleaning routine."
          },
          {
            "brand": "MecTURING",
            "product_name": "LASERON S9 Pro Plus ADC",
            "price": 37999,
            "category": "Home Improvement",
            "description": "Keep your floors spotless with the LASERON S9 Pro Plus ADC, a smart robot vacuum with advanced navigation and powerful suction."
          },
          {
            "brand": "ILIFE",
            "product_name": "W90 Wet & Dry Cordless Stick Vacuum Cleaner",
            "price": 13900,
            "category": "Home Improvement",
            "description": "Clean up wet and dry messes with ease using the ILIFE W90, a versatile and lightweight cordless stick vacuum cleaner."
          },
          {
            "brand": "JAFANDA",
            "product_name": "Air Purifiers - True H13",
            "price": 5999,
            "category": "Home Improvement",
            "description": "Breathe cleaner air with the JAFANDA True H13 Air Purifier, which captures 99.97% of airborne particles for a healthier home environment."
          }
      ]
  },
  {
      prompt: "Looking for a compact projector for home entertainment",
      response: [
          {
            "brand": "TECSOX",
            "product_name": "Luma-Led Projector",
            "price": 3999,
            "category": "Entertainment",
            "description": "Transform any room into a home theater with this compact and powerful LED projector, offering a bright and vibrant display."
          }
      ]
  }
];
