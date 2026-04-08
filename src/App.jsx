import React, { useState, useEffect } from 'react';
import CalendarContainer from './components/Calendar/CalendarContainer';

const BinderStrip = () => {
  const binders = Array(32).fill(null);
  const containerWidth = 1240;
  const leftSectionEnd = containerWidth * 0.45;
  
  return (
    <div className="absolute top-[-14px] left-12 right-12 z-50 flex justify-between px-6 pointer-events-none">
      {binders.map((_, i) => {
        const binderPosition = (i / binders.length) * (containerWidth - 96);
        const isLeftSection = binderPosition < leftSectionEnd - 96;
        const bindingColor = isLeftSection ? 'border-white/60' : 'border-neutral-600';
        const bindingBg = isLeftSection ? 'from-white/40 via-white/20 to-white/40' : 'from-[#2A2A2A] via-[#1A1A1A] to-[#2A2A2A]';
        
        return (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-[3px] h-9 bg-gradient-to-b ${bindingBg} rounded-full shadow-2xl border-x ${bindingColor}`} />
            <div className={`w-[1px] h-4 ${isLeftSection ? 'bg-white/20' : 'bg-white/5'} opacity-10`} />
          </div>
        );
      })}
    </div>
  );
};

const HangingSystem = () => {
  return (
    <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[400px] h-[100px] pointer-events-none z-0 hidden lg:block">
      <svg width="400" height="100" viewBox="0 0 400 100" className="opacity-15 overflow-visible">
         {/* Central Pin */}
         <circle cx="200" cy="10" r="4" fill="white" />
         {/* Subtle Strings to Calendar Corners */}
         <line x1="200" y1="10" x2="30" y2="90" stroke="white" strokeWidth="0.5" />
         <line x1="200" y1="10" x2="370" y2="90" stroke="white" strokeWidth="0.5" />
      </svg>
    </div>
  );
};

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen min-h-dvh w-full bg-[#0D0D0D] flex items-start lg:items-center justify-center relative overflow-x-hidden overflow-y-auto p-4 py-6 lg:p-12">
      {/* 🌌 Solid Matte Wall */}
      <div className="absolute inset-0 bg-[#0D0D0D] z-[-2]" />
      
      {/* Visual Cursor Glow */}
      <div 
        className="cursor-glow hidden md:block opacity-30 pointer-events-none" 
        style={{ left: mousePos.x, top: mousePos.y }} 
      />

      {/* Main Binder Card */}
      <div className="relative w-full max-w-[1240px] lg:h-[780px]">
         {/* 🧷 Hanging System - hidden on mobile */}
         <HangingSystem />

         {/* 📖 Top Binder Strip */}
         <BinderStrip />
         
         <CalendarContainer />
      </div>
    </div>
  );
}

export default App;
