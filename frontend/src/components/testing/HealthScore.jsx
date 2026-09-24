import React from 'react';

export function HealthScore({ score = 90, size = 'md' }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = '#22A06B';
  let statusText = 'Excellent Health';

  if (score < 60) {
    strokeColor = '#D64545';
    statusText = 'Critical Failures';
  } else if (score < 85) {
    strokeColor = '#D99A24';
    statusText = 'Needs Attention';
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-[#EDE8F5]"
            strokeWidth="9"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={strokeColor}
            strokeWidth="9"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-[#172033] tracking-tighter leading-none">
            {score}
          </span>
          <span className="text-[10px] font-semibold text-[#8697C4] uppercase">Score</span>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#8697C4]">Website Quality</p>
        <h4 className="text-base font-bold text-[#172033]">{statusText}</h4>
        <p className="text-xs text-[#5F6B85] mt-0.5">Based on UI, API and Network probes</p>
      </div>
    </div>
  );
}
