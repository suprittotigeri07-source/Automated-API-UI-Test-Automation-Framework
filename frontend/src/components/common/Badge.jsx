import React from 'react';

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}) {
  const variants = {
    default: 'bg-[#EDE8F5] text-[#3D52A0] border-[#ADBBDA]/40',
    primary: 'bg-[#7091E6]/15 text-[#3D52A0] border-[#7091E6]/30',
    success: 'bg-[#22A06B]/10 text-[#22A06B] border-[#22A06B]/30',
    warning: 'bg-[#D99A24]/10 text-[#D99A24] border-[#D99A24]/30',
    error: 'bg-[#D64545]/10 text-[#D64545] border-[#D64545]/30',
    neutral: 'bg-[#F8F9FC] text-[#5F6B85] border-[#ADBBDA]/50',
    dark: 'bg-[#172033] text-white border-transparent',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
  };

  const dotColors = {
    default: 'bg-[#3D52A0]',
    primary: 'bg-[#7091E6]',
    success: 'bg-[#22A06B]',
    warning: 'bg-[#D99A24]',
    error: 'bg-[#D64545]',
    neutral: 'bg-[#5F6B85]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || dotColors.default}`}
        ></span>
      )}
      {children}
    </span>
  );
}
