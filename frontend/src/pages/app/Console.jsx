import React, { useState } from 'react';
import { Terminal, Trash2, Filter, Copy, Search } from 'lucide-react';
import { Button } from '../../components/common/Button';

export function Console() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const logs = [
    { type: 'ERROR', message: 'Failed to load resource: the server responded with a status of 500 (Internal Server Error) at /api/v1/products', timestamp: '13:30:14.218', source: 'products.js:42' },
    { type: 'WARNING', message: 'Deprecated API detected: requestAnimationFrame fallback detected on viewport resize listener', timestamp: '13:30:14.012', source: 'layout.js:108' },
    { type: 'INFO', message: 'Application initialized successfully in production mode [build v2.4.1]', timestamp: '13:30:13.882', source: 'main.js:14' },
    { type: 'INFO', message: 'Analytics session dispatched with 12 interaction telemetry nodes', timestamp: '13:30:13.910', source: 'telemetry.js:31' },
    { type: 'WARNING', message: 'Cookie "session_id" does not have "SameSite" attribute set to "Strict" or "Lax"', timestamp: '13:30:13.955', source: 'auth.js:88' },
  ];

  const filteredLogs = logs.filter((l) => {
    if (filter !== 'ALL' && l.type !== filter) return false;
    if (search && !l.message.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">Console & Runtime Errors</h1>
          <p className="text-xs sm:text-sm text-[#5F6B85] mt-1">
            Unhandled JavaScript exceptions, browser deprecations, and diagnostic logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(JSON.stringify(logs, null, 2))} className="gap-1.5 text-xs">
            <Copy className="w-3.5 h-3.5" />
            <span>Copy All Logs</span>
          </Button>
        </div>
      </div>

      <div className="rounded-2xl bg-[#172033] text-[#EDE8F5] p-6 shadow-xl border border-[#5F6B85]/20 space-y-4">
        {/* Terminal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#5F6B85]/30">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#7091E6]" />
            <span className="font-bold text-sm text-[#EDE8F5]">Browser Console Stdout / Stderr</span>
          </div>

          <div className="flex items-center gap-2">
            {['ALL', 'ERROR', 'WARNING', 'INFO'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`py-1 px-2.5 rounded text-[11px] font-mono font-bold transition-all ${
                  filter === f
                    ? 'bg-[#7091E6] text-white'
                    : 'bg-white/10 text-[#8697C4] hover:bg-white/15'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8697C4]" />
          <input
            type="text"
            placeholder="Filter logs by message or source..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/5 border border-[#5F6B85]/30 text-xs text-[#EDE8F5] outline-none font-mono focus:border-[#7091E6]"
          />
        </div>

        {/* Log Entries */}
        <div className="space-y-2 pt-2 font-mono text-xs">
          {filteredLogs.map((log, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                log.type === 'ERROR'
                  ? 'bg-[#D64545]/15 border border-[#D64545]/30 text-[#EDE8F5]'
                  : log.type === 'WARNING'
                  ? 'bg-[#D99A24]/15 border border-[#D99A24]/30 text-[#EDE8F5]'
                  : 'bg-white/5 text-[#EDE8F5]'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                    log.type === 'ERROR'
                      ? 'bg-[#D64545] text-white'
                      : log.type === 'WARNING'
                      ? 'bg-[#D99A24] text-white'
                      : 'bg-[#7091E6] text-white'
                  }`}
                >
                  {log.type}
                </span>
                <span className="leading-relaxed">{log.message}</span>
              </div>

              <div className="flex items-center gap-3 text-[10px] text-[#8697C4] shrink-0 self-end sm:self-auto">
                <span className="underline decoration-[#5F6B85]">{log.source}</span>
                <span>{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
