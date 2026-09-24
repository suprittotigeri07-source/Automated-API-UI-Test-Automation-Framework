import React from 'react';

export function StatusBadge({ status, size = 'md' }) {
  const norm = (status || '').toLowerCase();

  let bg = 'bg-[#EDE8F5] text-[#3D52A0] border-[#ADBBDA]/50';
  let dot = 'bg-[#7091E6]';
  let label = status || 'Unknown';

  if (norm === 'healthy' || norm === 'pass' || norm === 'passed' || norm === 'success') {
    bg = 'bg-[#22A06B]/10 text-[#22A06B] border-[#22A06B]/30';
    dot = 'bg-[#22A06B] shadow-[0_0_6px_#22A06B]';
    label = norm === 'pass' || norm === 'passed' ? 'PASS' : 'Healthy';
  } else if (norm === 'warning' || norm === 'warn' || norm === 'moderate') {
    bg = 'bg-[#D99A24]/10 text-[#D99A24] border-[#D99A24]/30';
    dot = 'bg-[#D99A24] shadow-[0_0_6px_#D99A24]';
    label = 'Warning';
  } else if (norm === 'failed' || norm === 'fail' || norm === 'error') {
    bg = 'bg-[#D64545]/10 text-[#D64545] border-[#D64545]/30';
    dot = 'bg-[#D64545] shadow-[0_0_6px_#D64545]';
    label = norm === 'fail' || norm === 'failed' ? 'FAIL' : 'Failed';
  } else if (norm === 'running' || norm === 'in_progress') {
    bg = 'bg-[#7091E6]/15 text-[#3D52A0] border-[#7091E6]/40';
    dot = 'bg-[#7091E6] animate-pulse';
    label = 'Running';
  }

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold tracking-wide ${bg} ${
        sizes[size] || sizes.md
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`}></span>
      <span>{label}</span>
    </span>
  );
}
