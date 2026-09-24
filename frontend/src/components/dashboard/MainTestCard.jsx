import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Check, Globe } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

export function MainTestCard() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const quickChecks = [
    'Availability & DNS',
    'UI & Playwright Automation',
    'API & HTTP Responses',
    'Network Payloads',
    'Console Error Detection',
    'Performance & Core Web Vitals',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    let target = url.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = 'https://' + target;
    }

    // Direct to live execution
    navigate('/test/run_new', { state: { url: target } });
  };

  return (
    <Card className="p-6 md:p-8 border-2 border-[#7091E6]/40 bg-gradient-to-br from-white via-white to-[#EDE8F5]/40 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#7091E6]/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>

      <div className="max-w-3xl relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8F5] text-[#3D52A0] text-xs font-bold tracking-wide uppercase mb-3">
          <span className="w-2 h-2 rounded-full bg-[#7091E6] animate-ping"></span>
          Instant Quality Audit
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-[#172033] tracking-tight">
          Test a Website
        </h2>
        <p className="text-sm text-[#5F6B85] mt-1.5 mb-6">
          Enter a website URL and run automated UI, API, and performance checks in seconds.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-stretch">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8697C4]">
              <Globe className="w-5 h-5" />
            </div>
            <input
              type="text"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#ADBBDA] focus:border-[#7091E6] focus:ring-4 focus:ring-[#7091E6]/15 text-sm font-medium text-[#172033] placeholder-[#8697C4] shadow-xs outline-none transition-all"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            variant="primary"
            loading={loading}
            icon={Play}
            className="px-7 py-3 text-sm shrink-0"
          >
            Run Test
          </Button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#ADBBDA]/30 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="text-xs font-bold text-[#8697C4] uppercase tracking-wider">
            Automated Checks:
          </span>
          {quickChecks.map((check, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-xs font-medium text-[#3D52A0]">
              <Check className="w-3.5 h-3.5 text-[#22A06B]" />
              <span>{check}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
