import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isSameDay } from 'date-fns';
import { formatDisplayDate, formatMonthKey, formatDateKey } from '../../utils/dateUtils';

const NotesPanel = ({ selection, activeDate, currentDate, notes, setNotes, isSaved }) => {
  const [localValue, setLocalValue] = useState('');
  const timeoutRef = useRef(null);

  // 🧠 Rule 8: Notes Context Switch (Instant)
  const hasRangeSelection = selection.start && selection.end && !isSameDay(selection.start, selection.end);
  const activeNoteDate = selection.start && (!selection.end || isSameDay(selection.start, selection.end)) ? selection.start : activeDate;

  const contextKey = useMemo(() => {
    if (hasRangeSelection) {
      const [d1, d2] = [selection.start, selection.end].sort((a, b) => a - b);
      return `range-${formatDateKey(d1)}_${formatDateKey(d2)}`;
    }
    if (activeNoteDate) return `date-${formatDateKey(activeNoteDate)}`;
    return `month-${formatMonthKey(currentDate)}`;
  }, [selection, activeDate, currentDate, hasRangeSelection]);

  const contextLabel = useMemo(() => {
    if (hasRangeSelection) {
      const [d1, d2] = [selection.start, selection.end].sort((a, b) => a - b);
      return `${formatDisplayDate(d1)} – ${formatDisplayDate(d2)}`;
    }
    if (activeNoteDate) return formatDisplayDate(activeNoteDate);
    return `Journal Entry`;
  }, [selection, activeDate, currentDate, hasRangeSelection]);

  useEffect(() => {
    setLocalValue(notes[contextKey] || '');
  }, [contextKey, notes]);

  const handleNoteChange = (e) => {
    const newVal = e.target.value.slice(0, 280);
    setLocalValue(newVal);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setNotes(prev => ({ ...prev, [contextKey]: newVal }));
    }, 500);
  };

  return (
    <div className="mt-auto pt-10 border-t border-white/5 flex flex-col gap-5">
      {/* 🧭 Rule 2: Section Header (Small Caps + Low Opacity Orange) */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
           <span className="font-headline text-[11px] tracking-[0.4em] uppercase text-neon-orange/40 font-black mb-1">Journal Nodes</span>
           <h3 className="text-white/60 font-headline text-[12px] tracking-[0.2em] uppercase font-black italic">{contextLabel}</h3>
        </div>
        
        {/* Rule 3: "Saved" Indicator (Grey Default -> Green Save) */}
        <div className="flex items-center gap-6 text-[11px] tracking-[0.3em] font-black uppercase">
           <span className="text-neutral-700">{localValue.length} / 280</span>
           <div className="flex items-center gap-2">
              <AnimatePresence mode="wait">
                <motion.div 
                   key={isSaved ? 'saved' : 'saving'}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ duration: 0.2 }}
                   className={`flex items-center gap-2 ${isSaved ? 'text-[#22c55e]' : 'text-neutral-600'}`}
                >
                  <span className="material-symbols-outlined text-[12px]">{isSaved ? 'cloud_done' : 'cloud_upload'}</span>
                  <span>{isSaved ? 'Saved' : 'Saving...'}</span>
                </motion.div>
              </AnimatePresence>
           </div>
        </div>
      </div>

      <div className="relative min-h-[140px]">
        {/* 📏 Ruled Lines */}
        <div className="absolute inset-0 flex flex-col pointer-events-none opacity-5">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="h-[32px] border-b border-white/40 w-full" />
           ))}
        </div>

        {/* Rule 2: Visibility Fix (High contrast text) */}
        <textarea
          value={localValue}
          onChange={handleNoteChange}
          placeholder="Start recording your reflections..."
          className="relative z-10 w-full min-h-[140px] bg-transparent border-none outline-none resize-none font-headline font-medium italic text-sm leading-[32px] text-white/80 placeholder:text-white/40 custom-scrollbar"
        />
      </div>

      <div className="flex items-center justify-start gap-8 opacity-30 mt-2">
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-orange" />
            <span className="text-[8px] tracking-[0.4em] uppercase font-black text-white">Focus Period</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span className="text-[8px] tracking-[0.4em] uppercase font-black text-white">Archives</span>
         </div>
      </div>
    </div>
  );
};

export default NotesPanel;
