import React from 'react'
import ProductCard from './ProductCard'

import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';

const ChatHistory = ({ chat }) => {
    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate(-1);
    }
    // console.log(chat);
  return (
    <div className='md:w-[90%] mx-auto min-h-screen bg-white'>
        <div className='z-50 fixed top-4 left-10 p-2' onClick={handleBackButton}>
            <div className='bg-red-400 p-3 text-white rounded-full'><MdOutlineArrowBack size={20}/></div>
        </div>
        <div className='bg-blue-300 text-3xl text-white text-center p-2'>SAVED CHAT HISTORY</div>
        {chat && chat.length > 0 ? (chat.map((card, index) => {
            return (
                <div key={index}>
                    {/* PROMPT */}
                    <div className='flex justify-end p-2'>
                        <div className='bg-white w-[85%] md:w-auto border-gray-400 border p-2 rounded-md'>{card.prompt}</div>
                    </div>
                    {/* RESPONSE */}
                    <div className='p-2'>
                        <div className='font-bold px-0 underline py-1'>Product Advisor Response: </div>
                        <div className="flex gap-4 overflow-x-auto py-2">
                            {card.response && card.response.length > 0 ? (
                                card.response.map((cardInfo, index) => (
                                <div key={index} className="flex-shrink-0 w-64 sm:w-64 md:w-72 lg:w-80">
                                    <ProductCard product={cardInfo} />
                                </div>
                                ))
                            ) : (
                                <div className="text-gray-500 p-4">No data found suitable for your Response</div>
                            )}
                        </div>
                    </div>
                </div>
            )
        })) : (
            <div className='flex justify-center items-center min-h-screen'>
                <div className='bg-red-200 rounded-full p-2 text-gray-700 inline-block'>
                    No chat history available. Turn on <strong className='text-black'>Save Mode</strong> to start chatting with your product advisor to save chat
                </div>
            </div>
        )
        }
    </div>
  )
}
/*
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
          }
    ]
}
*/
export default ChatHistory
