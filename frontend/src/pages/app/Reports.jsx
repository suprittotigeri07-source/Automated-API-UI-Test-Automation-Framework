import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Filter, Calendar, CheckCircle2, AlertTriangle, XCircle, ArrowUpRight } from 'lucide-react';
import { Button } from '../../components/common/Button';

export function Reports() {
  const reportsList = [
    { id: 'rep_1042', target: 'https://example.com', runId: 'run_1042', passRate: '96.4%', tests: 28, passed: 27, failed: 0, warnings: 1, date: '2 min ago', format: 'PDF & JSON' },
    { id: 'rep_1041', target: 'https://shop.example.com', runId: 'run_1041', passRate: '85.7%', tests: 35, passed: 30, failed: 1, warnings: 4, date: '1 hour ago', format: 'PDF & CSV' },
    { id: 'rep_1040', target: 'https://api.example.com', runId: 'run_1040', passRate: '66.7%', tests: 18, passed: 12, failed: 4, warnings: 2, date: '3 hours ago', format: 'PDF & JSON' },
    { id: 'rep_1039', target: 'https://the-internet.herokuapp.com', runId: 'run_1039', passRate: '100%', tests: 18, passed: 18, failed: 0, warnings: 0, date: 'Yesterday', format: 'PDF & CSV' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">Test Reports</h1>
          <p className="text-xs sm:text-sm text-[#5F6B85] mt-1">
            Archived test run evaluations, compliance exports, and QA summaries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => alert('Exporting consolidated CSV archive...')} className="gap-1.5 text-xs">
            <Download className="w-3.5 h-3.5" />
            <span>Export All (CSV)</span>
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#ADBBDA]/40 shadow-sm">
          <span className="text-xs text-[#5F6B85]">Total Reports</span>
          <div className="text-2xl font-bold text-[#172033] mt-1">142</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#ADBBDA]/40 shadow-sm">
          <span className="text-xs text-[#22A06B] font-semibold">Average Pass Rate</span>
          <div className="text-2xl font-bold text-[#22A06B] mt-1">93.2%</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#ADBBDA]/40 shadow-sm">
          <span className="text-xs text-[#D64545] font-semibold">Flagged Regressions</span>
          <div className="text-2xl font-bold text-[#D64545] mt-1">5</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#ADBBDA]/40 shadow-sm">
          <span className="text-xs text-[#7091E6] font-semibold">Average Latency</span>
          <div className="text-2xl font-bold text-[#3D52A0] mt-1">284ms</div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-2xl border border-[#ADBBDA]/40 shadow-sm overflow-hidden">
        <div className="p-4 bg-[#F8F9FC] border-b border-[#ADBBDA]/30 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#172033]">Generated Reports Archive</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F9FC] text-[#5F6B85] uppercase tracking-wider border-b border-[#ADBBDA]/30">
              <tr>
                <th className="py-3 px-6">Report ID</th>
                <th className="py-3 px-6">Target Website</th>
                <th className="py-3 px-6">Pass Rate</th>
                <th className="py-3 px-6">Checks</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ADBBDA]/20">
              {reportsList.map((rep) => (
                <tr key={rep.id} className="hover:bg-[#EDE8F5]/30 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-[#3D52A0]">{rep.id}</td>
                  <td className="py-4 px-6 font-semibold text-[#172033]">{rep.target}</td>
                  <td className="py-4 px-6 font-bold text-[#22A06B]">{rep.passRate}</td>
                  <td className="py-4 px-6 text-[#5F6B85]">{rep.passed}/{rep.tests} passed</td>
                  <td className="py-4 px-6 text-[#5F6B85]">{rep.date}</td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <Link to={`/results/${rep.runId}`}>
                      <Button variant="ghost" size="sm" className="text-xs text-[#3D52A0]">
                        <span>View</span>
                        <ArrowUpRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alert(`Downloading PDF report for ${rep.target}...`)}
                      className="text-xs"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
