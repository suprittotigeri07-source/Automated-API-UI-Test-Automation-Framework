import React from 'react';

export function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`bg-white rounded-xl border border-[#ADBBDA]/30 shadow-xs p-6 ${
        hover ? 'hover:border-[#7091E6]/50 hover:shadow-md transition-all duration-200' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`flex items-start justify-between pb-4 border-b border-[#EDE8F5] mb-5 ${className}`}>
      <div>
        {title && <h3 className="text-base font-bold text-[#172033] tracking-tight">{title}</h3>}
        {subtitle && <p className="text-xs text-[#5F6B85] mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
