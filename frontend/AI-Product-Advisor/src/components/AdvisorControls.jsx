import * as React from 'react';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';

import AIResponse from './AIResponse';
import InitialPage from './InitialPage';

import { FaCircleArrowUp } from "react-icons/fa6";
import { TfiReload } from "react-icons/tfi";
import { GoSingleSelect } from "react-icons/go";
import ShowmoreButton from '../ui/ShowmoreButton';
import MenuBar from '../ui/MenuBar';


export default function AdvisorControls() {
  
  const [prompt, setPrompt] = React.useState("");
  const [model, setModel] = React.useState("gemini");
  const [isAI, setIsAI] = React.useState(false);
  const [inputPrompt, setInputPrompt] = React.useState("");
  
  const [displayResponse, setDisplayResponse] = React.useState(false);
  const handleSubmit = () => {
    setPrompt(inputPrompt)
    setDisplayResponse(true);
    // console.log(model);
  }

  const [clearResponse, setClearResponse] = React.useState(false);
  const handleClear = () => {
    window.location.reload();
    setPrompt("");
    setInputPrompt("");
    setDisplayResponse(false)
    setClearResponse(true);
  }

//   const selectStyling = `outline-none border border-blue-300 bg-blue-50 text-lg text-blue-900 px-5 py-2 rounded-full cursor-pointer`;
   const selectStyling = `flex items-center justify-between w-30 md:w-40 p-2 rounded-full border bg-blue-100
   border-blue-300 bg-white shadow-sm outline-none text-gray-700 appearance-none`;
  return (
    <div className="min-h-screen flex justify-center bg-white md:w-[90%] mx-auto">
        <div className="z-50 gap-5 p-5 mx-auto w-[90%] fixed bottom-7">

            <div className='flex w-full justify-between shadow-2xl items-center gap-3'>
                <div className="py-3 flex flex-row items-center">
                    <div className='flex  items-center gap-4'>
                        <div className="relative w-full">
                            <select
                            onChange={(e) => setModel(e.target.value)}
                            defaultValue="gemini"
                            className="w-full appearance-none px-4 py-2 pr-10 rounded-full border border-blue-300 bg-blue-50 shadow-sm outline-none text-blue-700"
                            >
                                <option value="chatgpt">✨ GPT</option>
                                <option value="gemini">Gemini</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none">
                                <GoSingleSelect />
                            </div>
                        </div>

                        <div className=''>
                            <MenuBar />
                        </div>
                    </div>

                </div>

                <div className='flex flex-row gap-5 justify-end items-center'>
                    <div className='p-1.5 flex items-center gap-2 bg-black rounded-full text-white' onClick={handleClear}><TfiReload size={27}/></div>
                    <div className='flex items-center gap-2 bg-white rounded-full text-black' onClick={handleSubmit}><FaCircleArrowUp size={35} /></div>
                </div>
            </div>
            <FormControl>
            <Textarea
                value={inputPrompt}
                onChange={(e) => {setInputPrompt(e.target.value)}}
                placeholder="Type your prompt here…"
                minRows={3}
                endDecorator={
                <Box
                    sx={{
                    display: 'flex',
                    gap: 'var(--Textarea-paddingBlock)',
                    pt: 'var(--Textarea-paddingBlock)',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    flex: 'auto',
                    }}
                >

                {/* <div className='flex w-full flex-row gap-5 justify-end items-center'>
                    <div className='p-1.5 flex items-center gap-2 bg-blue-500 rounded-sm text-white' onClick={handleClear}><IoMdCloseCircleOutline size={20} /> Clear</div>
                    <div className='p-1.5 flex items-center gap-2 bg-blue-500 rounded-sm text-white' onClick={handleSubmit}>SEND <FaCircleArrowUp size={20} /></div>
                </div> */}

                {/* <div className='flex flex-col gap-2 w-full justify-between'>
                    <div className='flex items-center gap-3'>
                        <div>
                            <select onChange={(e) => setModel(e.target.value)} className={selectStyling} defaultValue="gemini">
                                <option value="chatgpt">GPT</option>
                                <option value="gemini"> Gemini</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='p-1.5 flex items-center gap-2 bg-blue-500 rounded-sm text-white' onClick={handleClear}><IoMdCloseCircleOutline size={20} /> Clear</div>
                        <div className='p-1.5 flex items-center gap-2 bg-blue-500 rounded-sm text-white' onClick={handleSubmit}>SEND <FaCircleArrowUp size={20} /></div>
                    </div>
                </div> */}
                </Box>
                }
            />
            </FormControl>
        </div>
        <div className='p-4 pb-35'>
            {/* {displayResponse && <div className="p-3 bg-blue-500 rounded-xl flex justify-center items-center text-lg md:text-xl font-semibold text-white shadow-md tracking-wide">
            HERE ARE THE PRODUCT SUGGESTIONS
            </div>} */}
            {displayResponse ? <AIResponse model={model} prompt={prompt} setPrompt={setPrompt} clearResponse={clearResponse} setClearResponse={setClearResponse} /> : <InitialPage />}
        </div>
    </div>
  );
}
