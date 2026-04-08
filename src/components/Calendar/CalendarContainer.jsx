import React, { useState, useEffect, useMemo } from 'react';
import HeroSection from './HeroSection';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import { getCalendarGrid } from '../../utils/dateUtils';
import { addMonths, subMonths, isSameDay } from 'date-fns';

const CalendarContainer = () => {
  // Rule 1: Today Default Highlight
  const today = useMemo(() => new Date(), []);
  const [currentDate, setCurrentDate] = useState(today);
  const [selection, setSelection] = useState({ start: null, end: null });
  const [activeDate, setActiveDate] = useState(today);
  
  const [hoverDate, setHoverDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [isSaved, setIsSaved] = useState(true);

  // Rule 3: Local Storage (Load on Mount)
  useEffect(() => {
    const data = localStorage.getItem('calendar-notes');
    if (data) setNotes(JSON.parse(data));
  }, []);

  // Rule 3: Local Storage (Debounced Save)
  useEffect(() => {
    setIsSaved(false);
    const timeout = setTimeout(() => {
      localStorage.setItem('calendar-notes', JSON.stringify(notes));
      setIsSaved(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [notes]);

  // Centralized grid logic
  const days = useMemo(() => getCalendarGrid(currentDate), [currentDate]);

  // Rule 6: Range Selection (Strict 2-Click Instant)
  const handleDateClick = (date) => {
    const isToday = isSameDay(date, today);
    const isCurrentSelectionStart = selection.start && isSameDay(date, selection.start);
    const isCurrentSelectionEnd = selection.end && isSameDay(date, selection.end);

    if (isCurrentSelectionStart || isCurrentSelectionEnd) {
      setSelection({ start: null, end: null });
      setActiveDate(isToday ? today : date);
      return;
    }

    setActiveDate(date);

    if (!selection.start || (selection.start && selection.end)) {
      setSelection({ start: date, end: null });
    } else if (isSameDay(date, selection.start)) {
      setSelection({ start: date, end: null });
    } else {
      if (date < selection.start) {
        setSelection({ start: date, end: selection.start });
      } else {
        setSelection({ start: selection.start, end: date });
      }
    }
  };

  const handleMonthChange = (direction) => {
    setCurrentDate(direction === 'next' ? addMonths(currentDate, 1) : subMonths(currentDate, 1));
  };

  return (
    <div className="relative w-full flex flex-col lg:flex-row lg:h-[780px] bg-[#0D0D0D] backdrop-blur-3xl rounded-[2.5rem] border border-white/5 shadow-[0_60px_120px_-30px_rgba(0,0,0,1)] overflow-hidden">
      {/* LEFT: Hero Section — stacks on top on mobile, 45% width on desktop */}
      <div className="w-full h-[280px] lg:w-[45%] lg:h-full shrink-0">
         <HeroSection currentDate={currentDate} />
      </div>

      {/* RIGHT: Functional Panel */}
      <div className="flex-1 p-14 lg:p-16 lg:pb-12 flex flex-col overflow-hidden">
        <CalendarGrid 
          days={days} 
          currentDate={currentDate}
          selection={selection}
          hoverDate={hoverDate}
          onDateClick={handleDateClick}
          onDateHover={setHoverDate}
          onPrev={() => handleMonthChange('prev')}
          onNext={() => handleMonthChange('next')}
        />
        
        <NotesPanel 
          selection={selection}
          activeDate={activeDate}
          currentDate={currentDate}
          notes={notes}
          setNotes={setNotes}
          isSaved={isSaved}
        />
      </div>
    </div>
  );
};

export default CalendarContainer;
