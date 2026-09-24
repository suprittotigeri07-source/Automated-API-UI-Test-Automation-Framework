import React from 'react';
import { ShieldCheck, Target, Award, Users } from 'lucide-react';

export function About() {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-[#3D52A0] uppercase">Our Mission</span>
          <h1 className="text-4xl font-extrabold text-[#172033] tracking-tight sm:text-5xl mt-2">
            Built for Engineers Who Care About Quality
          </h1>
          <p className="mt-4 text-base text-[#5F6B85] leading-relaxed">
            TestPilot was created to remove the friction between rapid code deployment and dependable, battle-tested software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="p-6 rounded-2xl bg-[#F8F9FC] border border-[#ADBBDA]/40 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#EDE8F5] text-[#3D52A0] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#172033]">Precision Testing</h3>
            <p className="text-xs text-[#5F6B85] leading-relaxed">
              We leverage Playwright, PyTest, and modern browser standards to eliminate flaky test runs and false positives.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8F9FC] border border-[#ADBBDA]/40 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#EDE8F5] text-[#3D52A0] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#172033]">Holistic Health</h3>
            <p className="text-xs text-[#5F6B85] leading-relaxed">
              A website is more than just HTML. We inspect network waterfalls, console warnings, Core Web Vitals, and backend APIs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8F9FC] border border-[#ADBBDA]/40 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#EDE8F5] text-[#3D52A0] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#172033]">Developer Velocity</h3>
            <p className="text-xs text-[#5F6B85] leading-relaxed">
              Fast diagnostics mean less time combing through logs and more time building high-value user features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
