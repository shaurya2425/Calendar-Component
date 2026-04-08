import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroImg from '../../assets/calendar_hero.png';
import { formatDisplayMonth } from '../../utils/dateUtils';

const getMonthSubtext = (monthIdx, year) => {
  const subtexts = {
    0: `WINTER SILENCE / ${year}`,
    1: `GLACIAL PATHS / ${year}`,
    2: `VERNAL ASCENT / ${year}`,
    3: `ALPINE BLOOM / ${year}`,
    4: `SUMMIT DAWN / ${year}`,
    5: `SOLSTICE RIDGE / ${year}`,
    6: `HIGH NOON / ${year}`,
    7: `THERMAL DRIFT / ${year}`,
    8: `EQUINOX CHILL / ${year}`,
    9: `AUTUMN ASCENT / ${year}`,
    10: `FROST LINE / ${year}`,
    11: `PEAK MIDNIGHT / ${year}`
  };
  return subtexts[monthIdx];
};

const HeroSection = ({ currentDate }) => {
  const monthIdx = currentDate.getMonth();
  const dynamicYear = currentDate.getFullYear();
  const monthName = formatDisplayMonth(currentDate).slice(0, 3).toUpperCase();
  const subtext = getMonthSubtext(monthIdx, dynamicYear);

  return (
    <div className="relative w-full h-full overflow-hidden border-r border-white/5 bg-[#0D0D0D]">
      {/* 🖼 Background Image with crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
           key={monthIdx}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.4 }}
           className="absolute inset-0"
        >
          <img 
            src={heroImg} 
            alt="Calendar Hero"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/15 z-10" />
      
    <div className="absolute bottom-16 left-12 z-20 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${monthIdx}-${dynamicYear}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            {/* 🖋 Month Label (Prata - Elite serif for clear 'J') */}
            <h1 
              className="text-[clamp(6rem,12vw,11.5rem)] leading-[0.8] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)] mb-10"
              style={{ 
                fontFamily: "'Prata', serif",
                fontWeight: 400,
                letterSpacing: "0.02em"
              }}
            >
              {monthName}
            </h1>
            
            {/* 🖋 Subtitle (Strict Spec: Inter) */}
            <p 
              className="font-headline text-[10px] tracking-[0.6em] text-white/40 uppercase ml-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {subtext}
            </p>
          </motion.div>
         </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroSection;
