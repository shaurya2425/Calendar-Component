import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  format
} from 'date-fns';

/**
 * Generates the full 42-day grid for a given month (6 rows)
 * to ensure zero layout shift.
 */
export const getCalendarGrid = (currentDate) => {
  const start = startOfWeek(startOfMonth(currentDate));
  const end = endOfWeek(endOfMonth(currentDate));
  
  const days = eachDayOfInterval({ start, end });
  
  // Pad to 42 days (6 full weeks) if necessary to ensure 6-row height
  while (days.length < 42) {
    const lastDay = days[days.length - 1];
    const nextDay = new Date(lastDay);
    nextDay.setDate(nextDay.getDate() + 1);
    days.push(nextDay);
  }
  
  return days;
};

export const formatDateKey = (date) => format(date, 'yyyy-MM-dd');
export const formatMonthKey = (date) => format(date, 'yyyy-MM');
export const formatDisplayDate = (date) => format(date, 'MMM d');
export const formatDisplayMonth = (date) => format(date, 'MMMM');
