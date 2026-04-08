import React from 'react';
import { format, isSameMonth, isSameDay, isWithinInterval } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { getHoliday } from '../../utils/holidays';
import { formatDateKey } from '../../utils/dateUtils';

const DateCell = ({ 
  date, 
  currentDate, 
  selection, 
  hoverDate,
  onDateClick, 
  onDateHover 
}) => {
  const isCurrentMonth = isSameMonth(date, currentDate);
  const isToday = isSameDay(date, new Date());
  
  const isSelectedStart = selection.start && isSameDay(date, selection.start);
  const isSelectedEnd = selection.end && isSameDay(date, selection.end);
  const isActiveStart = selection.start && !selection.end && isSelectedStart;
  const effectiveEnd = selection.end || hoverDate;
  const isInRange = selection.start && effectiveEnd && isWithinInterval(date, {
    start: selection.start < effectiveEnd ? selection.start : effectiveEnd,
    end: selection.start < effectiveEnd ? effectiveEnd : selection.start
  });
  const isSelectedRangeNode = selection.start && selection.end && (isSelectedStart || isSelectedEnd);
  const isSingleSelectedDay = selection.start && selection.end && isSameDay(selection.start, selection.end) && isSelectedStart;

  const dateKey = formatDateKey(date);
  const holiday = getHoliday(dateKey);

  return (
    <div 
      className={`relative w-full h-14 flex items-center justify-center group ${isCurrentMonth ? 'opacity-100 cursor-pointer' : 'opacity-[0.03] pointer-events-none'}`}
      onClick={() => onDateClick(date)}
      onMouseEnter={() => onDateHover(date)}
      onMouseLeave={() => onDateHover(null)}
    >
      {/* 🎯 1. TODAY DEFAULT HIGHLIGHT (Strict SPEC) */}
      {isToday && !isActiveStart && !isSelectedRangeNode && (
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.25 }}
           className="absolute inset-0 rounded-2xl z-0"
           style={{ 
             background: 'rgba(255, 140, 0, 0.18)',
             boxShadow: '0 0 20px rgba(255,140,0,0.08)'
           }}
        />
      )}

      {/* Clicked start node before range completes */}
      {isActiveStart && (
        <div 
          className="absolute inset-1 rounded-full bg-neon-orange shadow-neon z-0"
        />
      )}

      {/* Single-day selected range */}
      {isSingleSelectedDay && (
        <div 
          className="absolute inset-1 rounded-full bg-neon-orange shadow-neon z-0"
        />
      )}

      {/* Date Text */}
      <span className={`relative z-10 text-xs font-headline transition-colors duration-200 ${(isSelectedStart || isSelectedEnd || isInRange || isToday) ? 'text-white font-black' : 'text-neutral-500 hover:text-white'}`}>
        {format(date, 'd')}
      </span>

      {/* 🇮🇳 2. HOLIDAY SYSTEM (Cleanup Spec) */}
      {holiday && (
        <div className="absolute top-2 right-2 z-20">
           {/* 4px small-dot pointer */}
           <div className="w-1 h-1 rounded-full bg-[#FF8C00]" />
           
           {/* Tooltip on instant hover */}
           <AnimatePresence>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 pointer-events-none z-50">
                 <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.12 }}
                    className="bg-black/95 backdrop-blur-md border border-white/5 rounded-lg px-3 py-1.5 whitespace-nowrap shadow-2xl"
                 >
                    <span className="font-headline text-[9px] tracking-[0.2em] uppercase text-white font-medium">{holiday.name}</span>
                 </motion.div>
              </div>
           </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default DateCell;
