import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export function Logo({ variant = 'dark', className = '' }) {
  const isLight = variant === 'light';

  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3D52A0] to-[#7091E6] flex items-center justify-center text-white shadow-sm shadow-[#3D52A0]/20 group-hover:scale-105 transition-transform duration-200">
        <ShieldCheck className="w-5 h-5 text-white" />
      </div>
      <div className="flex flex-col">
        <span className={`text-xl font-bold tracking-tight leading-none ${isLight ? 'text-white' : 'text-[#3D52A0]'}`}>
          TestPilot
        </span>
        <span className={`text-[10px] font-medium tracking-wide mt-0.5 ${isLight ? 'text-[#ADBBDA]' : 'text-[#8697C4]'}`}>
          TEST SMARTER
        </span>
      </div>
    </Link>
  );
}
