import React from 'react';

const BinderStrip = ({ area = 'calendar' }) => {
  const isImageArea = area === 'image';
  const bindingColor = isImageArea ? 'bg-white/60 border-white/40' : 'bg-neutral-700 border-neutral-600';
  
  return (
    <div className="w-full flex justify-center gap-4 py-2 opacity-50 z-10 select-none">
      {[...Array(22)].map((_, i) => (
        <div key={i} className={`w-3 h-3 rounded-full ${bindingColor} shadow-inner`} />
      ))}
    </div>
  );
};

export default BinderStrip;
