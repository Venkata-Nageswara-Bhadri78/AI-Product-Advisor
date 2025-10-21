// import * as React from 'react';
// import Box from '@mui/joy/Box';
// import FormControl from '@mui/joy/FormControl';
// import Textarea from '@mui/joy/Textarea';

// import AIResponse from './AIResponse';
// import InitialPage from './InitialPage';

// import { FaCircleArrowUp } from "react-icons/fa6";
// import { TfiReload } from "react-icons/tfi";
// import { GoSingleSelect } from "react-icons/go";
// import ShowmoreButton from '../ui/ShowmoreButton';
// import MenuBar from '../ui/MenuBar';
// import SaveChat from '../ui/SaveChat';
// import PopUpSave from '../ui/PopUpSave';


// export default function AdvisorControls() {
  
//   const [prompt, setPrompt] = React.useState("");
//   const [model, setModel] = React.useState("gemini");
//   const [isAI, setIsAI] = React.useState(false);
//   const [inputPrompt, setInputPrompt] = React.useState("");

//   const [isOn, setIsOn] = React.useState(false);

  
//   const [displayResponse, setDisplayResponse] = React.useState(false);
//   const handleSubmit = () => {
//     setPrompt(inputPrompt)
//     setDisplayResponse(true);
//     // console.log(model);
//   }

//   const [clearResponse, setClearResponse] = React.useState(false);
//   const handleClear = () => {
//     window.location.reload();
//     setPrompt("");
//     setInputPrompt("");
//     setDisplayResponse(false)
//     setClearResponse(true);
//   }

// //   const selectStyling = `outline-none border border-blue-300 bg-blue-50 text-lg text-blue-900 px-5 py-2 rounded-full cursor-pointer`;
//    const selectStyling = `flex items-center justify-between w-30 md:w-40 p-2 rounded-full border bg-blue-100
//    border-blue-300 bg-white shadow-sm outline-none text-gray-700 appearance-none`;
//   return (
//     <div className="min-h-screen flex justify-center bg-white md:w-[90%] mx-auto">
//         <div className="z-50 gap-5 p-5 mx-auto w-[90%] fixed bottom-7">

//             <div className='flex w-full justify-between shadow-2xl items-center gap-3'>
//                 <div className="py-3 flex flex-row items-center">
//                     <div className='flex items-center gap-4'>
//                         <div className="relative">
//                             <select
//                             onChange={(e) => setModel(e.target.value)}
//                             defaultValue="gemini"
//                             className="w-full appearance-none px-4 py-2 pr-10 rounded-full border border-blue-300 bg-blue-50 shadow-sm outline-none text-blue-700"
//                             >
//                                 <option value="chatgpt">✨ GPT</option>
//                                 <option value="gemini">Gemini</option>
//                             </select>
//                             <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none">
//                                 <GoSingleSelect />
//                             </div>
//                         </div>

//                         <div className=''>
//                             <SaveChat isOn={isOn} setIsOn={setIsOn} />
//                         </div>

//                         <div className='border bg-blue-100 border-blue-400 rounded-full'>
//                             <MenuBar />
//                         </div>
//                     </div>

//                 </div>

//                 <div className='flex flex-row gap-5 justify-end items-center'>
//                     <div className='p-1.5 flex items-center gap-2 bg-black rounded-full text-white' onClick={handleClear}><TfiReload size={27}/></div>
//                     <div className='flex items-center gap-2 bg-white rounded-full text-black' onClick={handleSubmit}><FaCircleArrowUp size={35} /></div>
//                 </div>
//             </div>
//             <FormControl>
//             <Textarea
//                 value={inputPrompt}
//                 onChange={(e) => {setInputPrompt(e.target.value)}}
//                 placeholder="Type your prompt here…"
//                 minRows={3}
//                 endDecorator={
//                 <Box
//                     sx={{
//                     display: 'flex',
//                     gap: 'var(--Textarea-paddingBlock)',
//                     pt: 'var(--Textarea-paddingBlock)',
//                     borderTop: '1px solid',
//                     borderColor: 'divider',
//                     flex: 'auto',
//                     }}
//                 >
//                 </Box>
//                 }
//             />
//             </FormControl>
//         </div>
//         <div className='p-4 pb-35'>
//             {displayResponse ? <AIResponse isOn={isOn} model={model} prompt={prompt} setPrompt={setPrompt} clearResponse={clearResponse} setClearResponse={setClearResponse} /> : <InitialPage />}
//         </div>
//     </div>
//   );
// }
import * as React from 'react';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';

import AIResponse from './AIResponse';
import InitialPage from './InitialPage';

import { FaCircleArrowUp } from "react-icons/fa6";
import { TfiReload } from "react-icons/tfi";
import { GoSingleSelect } from "react-icons/go";
import MenuBar from '../ui/MenuBar';
import SaveChat from '../ui/SaveChat';

export default function AdvisorControls() {
  
  const [prompt, setPrompt] = React.useState("");
  const [model, setModel] = React.useState("gemini");
  const [inputPrompt, setInputPrompt] = React.useState("");
  const [isOn, setIsOn] = React.useState(false); // For SaveChat
  
  const [displayResponse, setDisplayResponse] = React.useState(false);
  const [clearResponse, setClearResponse] = React.useState(false);

  const handleSubmit = () => {
    if (inputPrompt.trim()) {
      setPrompt(inputPrompt);
      setDisplayResponse(true);
      setClearResponse(false);
    }
  };

  const handleClear = () => {
    setPrompt("");
    setInputPrompt("");
    setDisplayResponse(false);
    setClearResponse(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    // Main container uses flex-column layout
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.body',
      }}
    >
      {/* Content Area */}
      <Box
        component="main"
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: { xs: 2, md: 4 },
          pb: { xs: '24rem', md: '20rem' }, 
        }}
      >
        <Box sx={{ width: { xs: '100%', md: '90%' }, margin: '0 auto' }}>
          {displayResponse ? (
            <AIResponse 
              isOn={isOn} 
              model={model} 
              prompt={prompt} 
              setPrompt={setPrompt} 
              clearResponse={clearResponse} 
              setClearResponse={setClearResponse} 
            />
          ) : (
            <InitialPage />
          )}
        </Box>
      </Box>

      {/* Floating Controls Footer */}
      <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          zIndex: 100,
          width: '100%',
          // Add padding around the floating pill
          p: { xs: 1.5, md: 3 }, 
        }}
      >
        {/* The "Pill" itself */}
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: '1024px',
            margin: '0 auto',
            borderRadius: 'xl',
            boxShadow: 'lg', // Prominent shadow for the "floating" look
            bgcolor: 'background.surface',
            p: { xs: 1, md: 1.5 },
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          {/* Top row: Model, Save, Menu, Clear */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', // Allows controls to stack on small screens
              gap: 1, 
              alignItems: 'center',
            }}
          >
            <Select
              value={model}
              onChange={(e, newValue) => setModel(newValue)}
              size="sm"
              variant="soft" // Softer look, blends into the pill
              color="primary"
              indicator={<GoSingleSelect />}
              sx={{
                minWidth: 120,
                borderRadius: 'lg',
              }}
            >
              <Option value="chatgpt">✨ GPT</Option>
              <Option value="gemini">Gemini</Option>
            </Select>
            
            <SaveChat isOn={isOn} setIsOn={setIsOn} />
            
            <MenuBar />
            
            {/* Clear button pushed to the far right */}
            <IconButton 
              variant="plain" // Less prominent
              color="neutral"
              onClick={handleClear}
              title="Clear chat"
              size="lg"
              sx={{ ml: 'auto', borderRadius: '50%' }}
            >
              <TfiReload />
            </IconButton>
          </Box>
          
          {/* Bottom row: Text Input */}
          <FormControl>
            <Textarea
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your product advisor..."
              minRows={2}
              maxRows={5}
              variant="soft" // Blends into the pill
              color="neutral"
              sx={{
                borderRadius: 'lg',
                // Add a subtle bg to differentiate from the pill's bg
                bgcolor: 'background.level1',
                '--Textarea-focusedThickness': '2px',
              }}
              endDecorator={
                <IconButton
                  onClick={handleSubmit}
                  disabled={!inputPrompt.trim()}
                  variant="solid"
                  color="primary"
                  title="Submit prompt"
                  sx={{
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    mr: 0.5, // Margin from the edge
                  }}
                >
                  <FaCircleArrowUp size={20} />
                </IconButton>
              }
            />
          </FormControl>
        </Sheet>
      </Box>
    </Sheet>
  );
}