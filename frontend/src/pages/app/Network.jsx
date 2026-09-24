import React, { useState } from 'react';
import { Activity, Filter, Search, Download } from 'lucide-react';
import { Button } from '../../components/common/Button';

export function Network() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const rawNetwork = [
    { method: 'GET', url: 'https://example.com/', status: 200, type: 'document', duration: '184ms', size: '24.2 KB' },
    { method: 'GET', url: 'https://example.com/assets/main.css', status: 200, type: 'stylesheet', duration: '42ms', size: '18.4 KB' },
    { method: 'GET', url: 'https://example.com/assets/bundle.js', status: 200, type: 'script', duration: '128ms', size: '142.1 KB' },
    { method: 'GET', url: 'https://example.com/api/v1/products', status: 500, type: 'xhr', duration: '623ms', size: '1.2 KB' },
    { method: 'GET', url: 'https://example.com/api/v1/users', status: 200, type: 'xhr', duration: '182ms', size: '4.8 KB' },
    { method: 'POST', url: 'https://example.com/api/v1/auth/login', status: 200, type: 'xhr', duration: '421ms', size: '2.1 KB' },
    { method: 'GET', url: 'https://example.com/favicon.ico', status: 200, type: 'image', duration: '16ms', size: '4.2 KB' },
    { method: 'GET', url: 'https://example.com/fonts/inter-var.woff2', status: 200, type: 'font', duration: '84ms', size: '38.5 KB' },
  ];

  const filtered = rawNetwork.filter((item) => {
    const matchesSearch = item.url.toLowerCase().includes(search.toLowerCase()) || item.method.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;

    if (filter === 'Successful') return item.status < 400;
    if (filter === 'Failed') return item.status >= 400;
    if (filter === 'Slow') return parseInt(item.duration) > 200;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">Network Activity</h1>
          <p className="text-xs sm:text-sm text-[#5F6B85] mt-1">
            Browser network waterfall inspection, asset timing, and failing dependencies.
          </p>
        </div>

        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <Download className="w-3.5 h-3.5" />
          <span>Export HAR</span>
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-[#ADBBDA]/40 shadow-sm overflow-hidden">
        {/* Controls Bar */}
        <div className="p-4 bg-[#F8F9FC] border-b border-[#ADBBDA]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {['All', 'Successful', 'Failed', 'Slow'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`py-1 px-3 rounded-lg text-xs font-semibold transition-all ${
                  filter === f
                    ? 'bg-[#3D52A0] text-white shadow-sm'
                    : 'bg-white border border-[#ADBBDA]/40 text-[#5F6B85] hover:bg-[#EDE8F5]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8697C4]" />
            <input
              type="text"
              placeholder="Filter by URL or method..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-white border border-[#ADBBDA]/50 rounded-xl text-xs text-[#172033] outline-none focus:border-[#3D52A0] w-64"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F9FC] text-[#5F6B85] uppercase tracking-wider border-b border-[#ADBBDA]/30">
              <tr>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">URL</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ADBBDA]/20 mono">
              {filtered.map((req, rIdx) => (
                <tr key={rIdx} className="hover:bg-[#EDE8F5]/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-[#3D52A0]">{req.method}</td>
                  <td className="py-3 px-4 text-[#172033] max-w-sm truncate">{req.url}</td>
                  <td className="py-3 px-4">
                    <span className={`font-bold ${req.status >= 400 ? 'text-[#D64545]' : 'text-[#22A06B]'}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#5F6B85]">{req.type}</td>
                  <td className="py-3 px-4 text-[#5F6B85]">{req.duration}</td>
                  <td className="py-3 px-4 text-[#5F6B85]">{req.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
