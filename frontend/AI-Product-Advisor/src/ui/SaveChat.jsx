import React, { useState } from 'react';

function ToggleButton({isOn, setIsOn}) {
  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className='flex flex-row gap-2 p-1.5 rounded-full border border-blue-300 bg-blue-50 shadow-sm outline-none text-blue-700'>
        <div>Save Chat</div>
        <button
        onClick={handleToggle}
        className={`px-[2px] text-white rounded-full border-none cursor-pointer ${isOn ? 'bg-green-500' : 'bg-red-500'}`}
        >
        {isOn ? 'ON' : 'OFF'}
        </button>
    </div>
  );
}

export default ToggleButton;
