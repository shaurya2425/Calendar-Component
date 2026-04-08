import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isSameDay } from 'date-fns';
import DateCell from './DateCell';

const CalendarGrid = ({
  days,
  currentDate,
  selection,
  hoverDate,
  onDateClick,
  onDateHover,
  onPrev,
  onNext
}) => {
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const rangeSegments = useMemo(() => {
    if (!selection.start) return [];

    const effectiveEnd = selection.end || hoverDate;
    if (!effectiveEnd) return [];
    if (isSameDay(selection.start, effectiveEnd)) return [];

    const startDate = selection.start < effectiveEnd ? selection.start : effectiveEnd;
    const endDate = selection.start < effectiveEnd ? effectiveEnd : selection.start;

    const startIdx = days.findIndex(d => isSameDay(d, startDate));
    const endIdx = days.findIndex(d => isSameDay(d, endDate));
    if (startIdx === -1 || endIdx === -1) return [];

    const startRow = Math.floor(startIdx / 7);
    const endRow = Math.floor(endIdx / 7);
    const segments = [];

    for (let row = startRow; row <= endRow; row += 1) {
      const rowStart = row * 7;
      const rowEnd = rowStart + 6;
      const segStart = row === startRow ? startIdx : rowStart;
      const segEnd = row === endRow ? endIdx : rowEnd;
      segments.push({
        row,
        segStart,
        segEnd,
        isFirst: row === startRow,
        isLast: row === endRow
      });
    }

    return segments;
  }, [selection.start, selection.end, hoverDate, days]);

  return (
    <div className="flex flex-col flex-1 relative">
      {/* 🧭 Header Section: Nav Top-Left (Reference Style) */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex gap-4">
          <button 
            onClick={onPrev}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-neon-orange/20 hover:border-neon-orange/30 transition-all active:scale-95 group"
          >
            <span className="material-symbols-outlined text-sm text-neutral-500 group-hover:text-white transition-colors">chevron_left</span>
          </button>
          <button 
            onClick={onNext}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-neon-orange/20 hover:border-neon-orange/30 transition-all active:scale-95 group"
          >
            <span className="material-symbols-outlined text-sm text-neutral-500 group-hover:text-white transition-colors">chevron_right</span>
          </button>
        </div>
      </div>

      <div className="mt-2">
        {/* Week Day Header (Ultra-Thin) */}
        <div className="grid grid-cols-7 mb-6">
          {weekDays.map((wd, i) => (
            <div key={`${wd}-${i}`} className="text-center text-[10px] uppercase tracking-[0.4em] font-black text-neutral-500">
              {wd}
            </div>
          ))}
        </div>

        {/* 📅 Grid of Days (Strict 6-row layout) */}
        <div className="relative min-h-[380px]">
          {/* Range Selection Overlay */}
          <AnimatePresence>
            {rangeSegments.map((segment, index) => (
              <motion.div
                key={`range-segment-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`absolute z-0 bg-neon-orange shadow-neon ${segment.isFirst && segment.isLast ? 'rounded-full' : segment.isFirst ? 'rounded-l-full' : segment.isLast ? 'rounded-r-full' : ''}`}
                style={{
                  top: `${segment.row * 60}px`,
                  left: `${(segment.segStart % 7) * (100 / 7)}%`,
                  width: `calc(${(segment.segEnd - segment.segStart + 1) * (100 / 7)}%)`,
                  height: `${segment.isFirst && segment.isLast ? 56 : 60}px`
                }}
              />
            ))}
          </AnimatePresence>

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentDate.toString()}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-7 gap-y-1 relative z-10"
            >
              {days.map((day) => (
                <DateCell 
                  key={day.toString()}
                  date={day}
                  currentDate={currentDate}
                  selection={selection}
                  hoverDate={hoverDate}
                  onDateClick={onDateClick}
                  onDateHover={onDateHover}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
