import React from 'react';
import ProductCard from './ProductCard';
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const ChatHistory = ({ chat }) => {
    const navigate = useNavigate();

    const handleBackButton = () => {
        navigate(-1);
    };

    return (
        <div className="md:w-[70%] p-2 mx-auto min-h-screen bg-white">

            {/* HEADER */}
            <div
                className="fixed z-50 rounded-md flex items-center gap-3 w-[70%] md:p-3 bg-gray-200"
                onClick={handleBackButton}
            >
                <div className="flex items-center justify-center bg-red-500 hover:bg-red-600 transition-colors text-white rounded-full p-2 shadow-md">
                    <MdOutlineArrowBack size={20} />
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-500 group-hover:text-blue-600 transition-colors">
                    Saved Chat History
                </h1>
            </div>

            {/* Add top padding to avoid overlap */}
            <div className="pt-20">
                {chat && chat.length > 0 ? (
                    chat.map((card, index) => {

                        // ---- Make response ALWAYS an array ----
                        const responseArray = Array.isArray(card.response)
                            ? card.response
                            : card.response === "Loading..."
                            ? [] // no crash
                            : card.response
                            ? [card.response] // wrap single object/string
                            : [];

                        return (
                            <div key={index} className="pb-6">

                                {/* PROMPT */}
                                <div className="flex justify-end p-2">
                                    <div className="w-[85%] md:w-auto border-blue-300 bg-blue-50 border p-2 rounded-t-2xl rounded-l-2xl">
                                        {card.prompt}
                                    </div>
                                </div>

                                {/* RESPONSE */}
                                <div className="p-2">
                                    <div className="font-bold px-0 underline py-1">
                                        Product Advisor Response:
                                    </div>

                                    <div className="flex gap-4 overflow-x-auto py-2">
                                        {responseArray.length > 0 ? (
                                            responseArray.map((cardInfo, i) => (
                                                <div
                                                    key={i}
                                                    className="flex-shrink-0 w-64 sm:w-64 md:w-72 lg:w-80"
                                                >
                                                    <ProductCard product={cardInfo} />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-gray-500 p-4">
                                                No data found suitable for your response
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        );
                    })
                ) : (
                    <div className="flex justify-center items-center min-h-screen">
                        <div className="bg-red-200 rounded-full p-2 text-gray-700 inline-block">
                            No chat history available. Turn on{" "}
                            <strong className="text-black">Save Mode</strong> to save chats.
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default ChatHistory;
