import React, { useState } from 'react';
import { Database, Search, Filter, Copy, RotateCw, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';

export function ApiTests() {
  const [selectedApi, setSelectedApi] = useState({
    id: 'api_3',
    method: 'GET',
    endpoint: '/api/v1/products',
    status: 500,
    expected: 200,
    duration: 623,
    result: 'FAIL',
    response: {
      error: 'InternalServerError',
      code: 'DB_CONNECTION_TIMEOUT',
      message: 'Database connection pool timeout while acquiring client after 5000ms',
      timestamp: '2026-09-24T14:02:18.421Z',
    },
  });

  const apiList = [
    { id: 'api_1', method: 'GET', endpoint: '/api/v1/users', status: 200, expected: 200, duration: 182, result: 'PASS', response: { total: 42, users: [{ id: 1, name: 'Alice Smith' }] } },
    { id: 'api_2', method: 'POST', endpoint: '/api/v1/auth/login', status: 200, expected: 200, duration: 421, result: 'PASS', response: { token: 'jwt_secure_session_token_xyz', expires_in: 3600 } },
    { id: 'api_3', method: 'GET', endpoint: '/api/v1/products', status: 500, expected: 200, duration: 623, result: 'FAIL', response: { error: 'InternalServerError', message: 'Database connection pool timeout' } },
    { id: 'api_4', method: 'PUT', endpoint: '/api/v1/users/1', status: 200, expected: 200, duration: 215, result: 'PASS', response: { id: 1, updated: true } },
    { id: 'api_5', method: 'DELETE', endpoint: '/api/v1/cache/flush', status: 204, expected: 204, duration: 98, result: 'PASS', response: null },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">API Testing</h1>
        <p className="text-xs sm:text-sm text-[#5F6B85] mt-1">
          Validate endpoint availability, status codes, payload contracts, and response latency.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Column */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#ADBBDA]/40 shadow-sm overflow-hidden">
          <div className="p-4 bg-[#F8F9FC] border-b border-[#ADBBDA]/30 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#172033]">Endpoints Under Test</h2>
            <span className="text-xs font-mono text-[#5F6B85]">4 Passed • 1 Failed</span>
          </div>

          <div className="divide-y divide-[#ADBBDA]/20 text-xs">
            {apiList.map((api) => {
              const isSelected = selectedApi?.id === api.id;
              return (
                <div
                  key={api.id}
                  onClick={() => setSelectedApi(api)}
                  className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#EDE8F5]' : 'hover:bg-[#F8F9FC]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold ${
                      api.method === 'GET' ? 'bg-[#7091E6]/20 text-[#3D52A0]' :
                      api.method === 'POST' ? 'bg-[#EDE8F5] text-[#3D52A0]' :
                      api.method === 'PUT' ? 'bg-gray-100 text-gray-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {api.method}
                    </span>
                    <div>
                      <div className="font-semibold text-[#172033] mono">{api.endpoint}</div>
                      <div className="text-[11px] text-[#5F6B85] mono">{api.duration}ms</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`font-mono font-bold ${api.result === 'PASS' ? 'text-[#22A06B]' : 'text-[#D64545]'}`}>
                      {api.status}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      api.result === 'PASS' ? 'bg-[#22A06B]/10 text-[#22A06B]' : 'bg-[#D64545]/10 text-[#D64545]'
                    }`}>
                      {api.result}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail Panel Column */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#ADBBDA]/40 p-6 space-y-4 shadow-sm">
          {selectedApi && (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-[#ADBBDA]/30">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs uppercase px-2 py-0.5 rounded bg-[#EDE8F5] text-[#3D52A0]">
                    {selectedApi.method}
                  </span>
                  <span className="font-mono text-sm font-bold text-[#172033]">{selectedApi.endpoint}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(JSON.stringify(selectedApi.response, null, 2))}>
                  <Copy className="w-3.5 h-3.5" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#F8F9FC] border border-[#ADBBDA]/30">
                  <span className="text-[#5F6B85] block text-[10px]">Expected</span>
                  <span className="font-mono font-bold text-[#22A06B]">{selectedApi.expected}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F8F9FC] border border-[#ADBBDA]/30">
                  <span className="text-[#5F6B85] block text-[10px]">Actual</span>
                  <span className={`font-mono font-bold ${selectedApi.result === 'PASS' ? 'text-[#22A06B]' : 'text-[#D64545]'}`}>
                    {selectedApi.status}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F8F9FC] border border-[#ADBBDA]/30">
                  <span className="text-[#5F6B85] block text-[10px]">Duration</span>
                  <span className="font-mono font-bold text-[#172033]">{selectedApi.duration}ms</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#5F6B85] uppercase tracking-wider block mb-1.5">
                  Response Payload JSON
                </span>
                <pre className="p-4 rounded-xl bg-[#172033] text-[#EDE8F5] text-xs font-mono overflow-x-auto max-h-64 leading-relaxed">
                  {JSON.stringify(selectedApi.response, null, 2)}
                </pre>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <Button size="sm" variant="primary" className="text-xs">
                  Retry Test
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  Copy Request
                </Button>
                <Button size="sm" variant="ghost" className="text-xs">
                  View Logs
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
