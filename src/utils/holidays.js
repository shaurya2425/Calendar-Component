export const HOLIDAYS = [
  // 2026 Dataset (Strict Spec)
  { date: "2026-01-01", name: "New Year's Day" },
  { date: "2026-01-14", name: "Makar Sankranti" },
  { date: "2026-01-26", name: "Republic Day" },
  { date: "2026-02-14", name: "Valentine's Day" },
  { date: "2026-02-19", name: "Shivaji Jayanti" },
  { date: "2026-03-04", name: "Holi" },
  { date: "2026-03-25", name: "Ram Navami" },
  { date: "2026-04-14", name: "Ambedkar Jayanti" },
  { date: "2026-04-18", name: "Good Friday" },
  { date: "2026-05-01", name: "Labour Day" },
  { date: "2026-06-17", name: "Eid al-Adha" },
  { date: "2026-07-29", name: "Muharram" },
  { date: "2026-08-15", name: "Independence Day" },
  { date: "2026-08-28", name: "Raksha Bandhan" },
  { date: "2026-09-05", name: "Teacher's Day" },
  { date: "2026-09-17", name: "Ganesh Chaturthi" },
  { date: "2026-10-02", name: "Gandhi Jayanti" },
  { date: "2026-10-20", name: "Dussehra" },
  { date: "2026-11-01", name: "Diwali" },
  { date: "2026-11-15", name: "Guru Nanak Jayanti" },
  { date: "2026-12-25", name: "Christmas" }
];

export const getHoliday = (dateKey) => HOLIDAYS.find(h => h.date === dateKey);
