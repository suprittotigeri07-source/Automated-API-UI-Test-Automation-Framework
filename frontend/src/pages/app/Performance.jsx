import React from 'react';
import { Zap, Activity, Clock, Cpu } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { HealthScore } from '../../components/testing/HealthScore';

export function Performance() {
  const perfData = [
    { time: '0s', cpu: 12, memory: 45, latency: 45 },
    { time: '0.5s', cpu: 74, memory: 52, latency: 120 },
    { time: '1.0s', cpu: 65, memory: 58, latency: 280 },
    { time: '1.5s', cpu: 42, memory: 61, latency: 342 },
    { time: '2.0s', cpu: 22, memory: 62, latency: 110 },
    { time: '2.5s', cpu: 15, memory: 62, latency: 60 },
  ];

  const metrics = [
    { name: 'Page Load', value: '1.82s', benchmark: '< 2.5s', status: 'Good' },
    { name: 'First Contentful Paint (FCP)', value: '0.92s', benchmark: '< 1.8s', status: 'Good' },
    { name: 'Largest Contentful Paint (LCP)', value: '2.1s', benchmark: '< 2.5s', status: 'Moderate' },
    { name: 'DOM Load', value: '1.4s', benchmark: '< 2.0s', status: 'Good' },
    { name: 'Average API Response', value: '342ms', benchmark: '< 500ms', status: 'Good' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">Performance & Core Web Vitals</h1>
        <p className="text-xs sm:text-sm text-[#5F6B85] mt-1">
          Detailed metrics evaluating page responsiveness, resource loading, and runtime throughput.
        </p>
      </div>

      {/* Score Hero Card */}
      <div className="bg-white rounded-2xl border border-[#ADBBDA]/40 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#7091E6] uppercase tracking-wider">Audit Result</span>
          <h2 className="text-2xl font-bold text-[#172033]">Performance Score: 78 / 100</h2>
          <p className="text-xs text-[#5F6B85] max-w-lg leading-relaxed">
            The target application demonstrates good initial paint times and low DOM blocking. LCP metric can be further optimized by pre-loading primary hero assets.
          </p>
        </div>
        <div className="shrink-0">
          <HealthScore score={78} size={110} strokeWidth={9} />
        </div>
      </div>

      {/* 5 Core Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-white border border-[#ADBBDA]/40 shadow-sm space-y-1">
            <span className="text-[11px] text-[#5F6B85] block truncate">{m.name}</span>
            <div className="text-2xl font-extrabold text-[#172033]">{m.value}</div>
            <div className="pt-2 flex items-center justify-between text-[10px] border-t border-[#ADBBDA]/20">
              <span className={`font-semibold ${m.status === 'Good' ? 'text-[#22A06B]' : 'text-[#D99A24]'}`}>
                {m.status}
              </span>
              <span className="text-[#5F6B85] mono">{m.benchmark}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recharts Performance Visualizer */}
      <div className="bg-white rounded-2xl border border-[#ADBBDA]/40 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-[#ADBBDA]/30">
          <h3 className="text-sm font-bold text-[#172033]">CPU Load & Request Latency Timeline</h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-[#3D52A0]">
              <span className="w-3 h-3 rounded-full bg-[#3D52A0]"></span> CPU (%)
            </span>
            <span className="flex items-center gap-1.5 text-[#7091E6]">
              <span className="w-3 h-3 rounded-full bg-[#7091E6]"></span> Latency (ms)
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={perfData}>
              <defs>
                <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3D52A0" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3D52A0" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7091E6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7091E6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ADBBDA" strokeOpacity={0.3} />
              <XAxis dataKey="time" stroke="#5F6B85" fontSize={11} />
              <YAxis stroke="#5F6B85" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#ADBBDA',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                }}
              />
              <Area type="monotone" dataKey="cpu" stroke="#3D52A0" strokeWidth={2} fillOpacity={1} fill="url(#cpuGradient)" />
              <Area type="monotone" dataKey="latency" stroke="#7091E6" strokeWidth={2} fillOpacity={1} fill="url(#latencyGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
