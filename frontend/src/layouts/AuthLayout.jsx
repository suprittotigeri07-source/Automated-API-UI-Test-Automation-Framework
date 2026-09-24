import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export function AuthLayout() {
  const highlights = [
    'Automated Playwright UI Test Execution',
    'Real-time HTTP & API Response Validation',
    'Full Core Web Vitals & Performance Benchmarks',
    'Root-cause AI Diagnostic Recommendations',
  ];

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* Left side banner */}
      <div className="hidden lg:flex lg:col-span-5 bg-[#3D52A0] p-12 flex-col justify-between relative overflow-hidden text-white">
        {/* Subtle decorative geometric shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#7091E6]/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8697C4]/20 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none"></div>

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-[#7091E6] flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">TestPilot</span>
          </Link>
        </div>

        <div className="relative z-10 my-auto py-8">
          <span className="text-xs font-bold tracking-widest text-[#ADBBDA] uppercase bg-[#7091E6]/30 px-3 py-1 rounded-full inline-block mb-4">
            Next-Gen Testing Platform
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Test smarter. <br />
            <span className="text-[#ADBBDA]">Ship confidently.</span>
          </h1>
          <p className="text-sm text-[#EDE8F5]/80 max-w-sm leading-relaxed mb-8">
            Automate website, API and UI testing from a single unified workspace built for QA engineers and developers.
          </p>

          <div className="space-y-3">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-[#EDE8F5]">
                <CheckCircle2 className="w-4 h-4 text-[#7091E6] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs text-[#ADBBDA]">
          © 2026 TestPilot. Engineered for high-velocity software teams.
        </div>
      </div>

      {/* Right side form view */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 bg-[#F8F9FC]">
        <div className="w-full max-w-md bg-white rounded-2xl border border-[#ADBBDA]/30 shadow-sm p-8 sm:p-10">
          {/* Mobile brand header */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#3D52A0] flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-[#3D52A0]">TestPilot</span>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
