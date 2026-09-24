import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Play, 
  CheckCircle2, 
  XCircle, 
  Percent, 
  Calendar, 
  ArrowUpRight, 
  Filter, 
  ExternalLink,
  Clock,
  Layers,
  Search,
  Plus
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { StatCard } from '../../components/dashboard/StatCard';
import { MainTestCard } from '../../components/dashboard/MainTestCard';
import { StatusBadge } from '../../components/testing/StatusBadge';
import { testService } from '../../services/testService';
import { formatDuration, formatRelativeTime } from '../../utils/formatters';

export function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentRuns, setRecentRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7d');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [dashStats, runs] = await Promise.all([
          testService.getDashboardStats(),
          testService.getRecentRuns(),
        ]);
        setStats(dashStats);
        setRecentRuns(runs);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header with Title & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">Dashboard</h1>
          <p className="text-xs sm:text-sm text-[#5F6B85] mt-1">
            Monitor your website quality and automated test health.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date range selector */}
          <div className="flex items-center bg-white border border-[#ADBBDA]/60 rounded-xl px-3 py-1.5 shadow-sm text-xs text-[#172033]">
            <Calendar className="w-3.5 h-3.5 text-[#8697C4] mr-2" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent outline-none cursor-pointer font-medium text-[#172033]"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last Quarter</option>
            </select>
          </div>

          <Link to="/new-test">
            <Button variant="primary" className="gap-2 shadow-sm">
              <Plus className="w-4 h-4" />
              <span>New Test</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tests"
          value={stats ? stats.totalTests.toLocaleString() : '1,248'}
          icon={Layers}
          trend={{ direction: 'up', label: '+12% from last week' }}
          loading={loading}
        />
        <StatCard
          title="Passed"
          value={stats ? stats.passed.toLocaleString() : '1,163'}
          icon={CheckCircle2}
          trend={{ direction: 'up', label: '+8% positive trend' }}
          loading={loading}
        />
        <StatCard
          title="Failed"
          value={stats ? stats.failed.toLocaleString() : '54'}
          icon={XCircle}
          trend={{ direction: 'down', label: '-4% fewer failures' }}
          loading={loading}
        />
        <StatCard
          title="Success Rate"
          value={stats ? `${stats.successRate}%` : '93.2%'}
          icon={Percent}
          trend={{ direction: 'up', label: '+1.4% quality gain' }}
          loading={loading}
        />
      </div>

      {/* Main Test Card: Prominent "Test a Website" banner */}
      <MainTestCard />

      {/* Recent Test Runs Section */}
      <div className="bg-white rounded-2xl border border-[#ADBBDA]/40 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#ADBBDA]/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#172033]">Recent Test Runs</h2>
            <p className="text-xs text-[#5F6B85] mt-0.5">Execution logs and status metrics from automated test runs.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/reports">
              <Button variant="outline" size="sm" className="text-xs">
                View All Reports
              </Button>
            </Link>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#ADBBDA]/30 text-[#5F6B85] font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-6">Website / Target</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Tests</th>
                <th className="py-3.5 px-6">Passed</th>
                <th className="py-3.5 px-6">Failed</th>
                <th className="py-3.5 px-6">Duration</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ADBBDA]/20">
              {recentRuns.map((run) => (
                <tr key={run.id} className="hover:bg-[#EDE8F5]/30 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#172033] hover:text-[#3D52A0]">
                        {run.targetUrl.replace('https://', '')}
                      </span>
                      <a
                        href={run.targetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#8697C4] hover:text-[#3D52A0] opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <span className="text-[11px] text-[#5F6B85] mono">{run.id}</span>
                  </td>

                  <td className="py-4 px-6">
                    <StatusBadge status={run.status} />
                  </td>

                  <td className="py-4 px-6 font-semibold text-[#172033]">
                    {run.passed}/{run.totalTests}
                  </td>

                  <td className="py-4 px-6 font-semibold text-[#22A06B]">
                    {run.passed}
                  </td>

                  <td className="py-4 px-6 font-semibold text-[#D64545]">
                    {run.failed}
                  </td>

                  <td className="py-4 px-6 text-[#5F6B85] mono">
                    {formatDuration(run.duration)}
                  </td>

                  <td className="py-4 px-6 text-[#5F6B85]">
                    {formatRelativeTime(run.createdAt)}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <Link to={`/results/${run.id}`}>
                      <Button variant="ghost" size="sm" className="text-xs text-[#3D52A0] hover:bg-[#EDE8F5]">
                        <span>View Results</span>
                        <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
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
