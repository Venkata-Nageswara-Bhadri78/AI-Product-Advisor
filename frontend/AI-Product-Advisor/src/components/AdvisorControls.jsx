import * as React from 'react';
import Textarea from '@mui/joy/Textarea';
import AIResponse from './AIResponse';
import InitialPage from './InitialPage';
import { GoSingleSelect } from "react-icons/go";
import MenuBar from '../ui/MenuBar';
import SaveChat from '../ui/SaveChat';
import { BiSend } from "react-icons/bi";

export default function AdvisorControls() {
  
  const [prompt, setPrompt] = React.useState("");
  const [model, setModel] = React.useState("gemini");
  const [inputPrompt, setInputPrompt] = React.useState("");
  const [isOn, setIsOn] = React.useState(false);
  const [displayResponse, setDisplayResponse] = React.useState(false);
  const handleSubmit = () => {
    setPrompt(inputPrompt)
    setDisplayResponse(true);
  }

  const [clearResponse, setClearResponse] = React.useState(false);
  const handleClear = () => {
    window.location.reload();
    setPrompt("");
    setInputPrompt("");
    setDisplayResponse(false)
    setClearResponse(true);
  }

   const selectStyling = `flex items-center justify-between w-30 md:w-40 p-2 rounded-full border bg-blue-100
   border-blue-300 bg-white shadow-sm outline-none text-gray-700 appearance-none`;
  return (
    <div className="min-h-screen flex justify-center bg-white md:w-[90%] mx-auto">
        <div className="z-50 gap-5 px-5 py-3 mx-auto w-[80%] bg-white border border-blue-500 rounded-md fixed bottom-7">
            <div className='flex w-full justify-between shadow-2xl items-center gap-3'>
                <div className="py-2 flex flex-row items-center">
                    <div className='flex items-center gap-4'>
                        <div className="relative">
                            <select
                            onChange={(e) => setModel(e.target.value)}
                            defaultValue="gemini"
                            className="w-full appearance-none px-2 py-0.5 pr-10 rounded-full border border-blue-300 bg-blue-50 shadow-sm outline-none text-blue-700"
                            >
                                <option value="chatgpt">✨ GPT</option>
                                <option value="gemini">Gemini</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none">
                                <GoSingleSelect />
                            </div>
                        </div>

                        <div className=''>
                            <SaveChat isOn={isOn} setIsOn={setIsOn} />
                        </div>

                        {/* <div className='border bg-blue-100 border-blue-400 rounded-full'> */}
                            <MenuBar />
                        {/* </div> */}
                    </div>

                </div>

                <div className='flex flex-row gap-3 justify-end items-center'>
                    {/* <div className='p-1.5 flex items-center gap-2 bg-black rounded-full text-white' onClick={handleClear}><TfiReload size={17}/></div> */}
                    <div className='flex items-center bg-blue-600 p-1.5 text-white rounded-full' onClick={handleSubmit}><BiSend size={20} /></div>
                </div>
            </div>

            <Textarea
                value={inputPrompt}
                onChange={(e) => {setInputPrompt(e.target.value)}}
                placeholder="Ask your AI Product Advisor about products (e.g., 'A lightweight laptop for travel with long battery life')..."
                minRows={2}
            />
        </div>
        <div className='p-11 pb-40'>
            {displayResponse ? <AIResponse isOn={isOn} model={model} prompt={prompt} setPrompt={setPrompt} clearResponse={clearResponse} setClearResponse={setClearResponse} /> : <InitialPage />}
        </div>
    </div>
  );
}