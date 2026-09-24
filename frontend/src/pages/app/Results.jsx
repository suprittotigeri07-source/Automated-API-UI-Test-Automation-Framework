import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Globe, 
  ArrowLeft, 
  Download, 
  RotateCw, 
  Share2, 
  Sparkles, 
  Copy, 
  Terminal, 
  ExternalLink,
  ChevronRight,
  Eye,
  FileCode,
  Layers,
  Activity,
  Monitor,
  Database,
  Zap,
  ShieldCheck,
  Camera
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/testing/StatusBadge';
import { HealthScore } from '../../components/testing/HealthScore';
import { testService } from '../../services/testService';
import { formatDuration, formatRelativeTime } from '../../utils/formatters';

export function Results() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedApiTest, setSelectedApiTest] = useState(null);
  const [screenshotModal, setScreenshotModal] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadResults() {
      try {
        setLoading(true);
        const result = await testService.getRunById(id || 'run_1042');
        setData(result);
        if (result.apiTests && result.apiTests.length > 2) {
          // Pre-select the failing API test for inspection
          setSelectedApiTest(result.apiTests[2]);
        }
      } catch (err) {
        console.error('Failed to load test results:', err);
      } finally {
        setLoading(false);
      }
    }
    loadResults();
  }, [id]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#7091E6] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-semibold text-[#5F6B85]">Assembling Test Telemetry...</span>
        </div>
      </div>
    );
  }

  if (!data) return <div>Test results not found.</div>;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'api', label: 'API Tests', count: data.apiTests?.length },
    { id: 'ui', label: 'UI Tests', count: data.uiTests?.length },
    { id: 'performance', label: 'Performance' },
    { id: 'network', label: 'Network', count: data.network?.length },
    { id: 'console', label: 'Console', count: data.consoleLogs?.length },
    { id: 'screenshots', label: 'Screenshots' },
    { id: 'logs', label: 'Logs' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="text-[#5F6B85] hover:text-[#3D52A0] p-1 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5F6B85]">
              <span>Runs</span>
              <ChevronRight className="w-3 h-3" />
              <span className="mono font-semibold text-[#172033]">{data.id}</span>
            </div>
            <div className="flex items-center gap-3 mt-0.5">
              <h1 className="text-2xl font-extrabold text-[#172033] tracking-tight">Test Results</h1>
              <StatusBadge status={data.status} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(window.location.href)} className="gap-1.5 text-xs">
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share Run'}</span>
          </Button>

          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </Button>

          <Link to={`/new-test?url=${encodeURIComponent(data.targetUrl)}`}>
            <Button variant="primary" size="sm" className="gap-1.5 text-xs">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Rerun Test</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Target & Score Hero Header Card */}
      <div className="bg-white rounded-2xl border border-[#ADBBDA]/40 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Target Info */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-[#7091E6]" />
              <a
                href={data.targetUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#172033] hover:text-[#3D52A0] flex items-center gap-1.5 text-lg"
              >
                <span>{data.targetUrl}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8697C4]" />
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2">
              <div className="p-3 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/30">
                <span className="text-[#5F6B85] block">Execution Duration</span>
                <span className="font-semibold text-sm text-[#172033] mono">{formatDuration(data.duration)}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/30">
                <span className="text-[#5F6B85] block">Executed At</span>
                <span className="font-semibold text-sm text-[#172033]">{formatRelativeTime(data.createdAt)}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/30">
                <span className="text-[#22A06B] block font-medium">Passed Checks</span>
                <span className="font-bold text-sm text-[#22A06B]">{data.passed}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/30">
                <span className="text-[#D64545] block font-medium">Failed Checks</span>
                <span className="font-bold text-sm text-[#D64545]">{data.failed}</span>
              </div>
            </div>
          </div>

          {/* Large Health Score Gauge */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 border-t lg:border-t-0 lg:border-l border-[#ADBBDA]/30">
            <HealthScore score={data.score} size={130} strokeWidth={10} />
            <div className="text-center mt-3">
              <div className="text-xs font-semibold text-[#5F6B85]">Overall Health Score</div>
              <div className="text-[11px] text-[#22A06B] font-medium mt-0.5">
                {data.score >= 80 ? 'Within Enterprise SLA Standard' : 'Action Required on Failures'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Category Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-white border border-[#ADBBDA]/40 shadow-sm text-center">
          <Activity className="w-5 h-5 mx-auto text-[#7091E6] mb-1.5" />
          <div className="text-[11px] text-[#5F6B85]">Website Health</div>
          <div className="text-sm font-bold text-[#22A06B] mt-0.5">Healthy</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#ADBBDA]/40 shadow-sm text-center">
          <Database className="w-5 h-5 mx-auto text-[#7091E6] mb-1.5" />
          <div className="text-[11px] text-[#5F6B85]">API Health</div>
          <div className="text-sm font-bold text-[#D64545] mt-0.5">1 Failed (500)</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#ADBBDA]/40 shadow-sm text-center">
          <Monitor className="w-5 h-5 mx-auto text-[#7091E6] mb-1.5" />
          <div className="text-[11px] text-[#5F6B85]">UI Testing</div>
          <div className="text-sm font-bold text-[#D99A24] mt-0.5">1 Warning</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#ADBBDA]/40 shadow-sm text-center">
          <Zap className="w-5 h-5 mx-auto text-[#7091E6] mb-1.5" />
          <div className="text-[11px] text-[#5F6B85]">Performance</div>
          <div className="text-sm font-bold text-[#22A06B] mt-0.5">78 / 100 (Fast)</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#ADBBDA]/40 shadow-sm text-center">
          <ShieldCheck className="w-5 h-5 mx-auto text-[#7091E6] mb-1.5" />
          <div className="text-[11px] text-[#5F6B85]">Security</div>
          <div className="text-sm font-bold text-[#22A06B] mt-0.5">Grade A (TLS 1.3)</div>
        </div>
      </div>

      {/* AI Root-Cause Failure Analysis Card */}
      {data.aiAnalysis && (
        <div className="p-6 rounded-2xl bg-[#EDE8F5]/60 border border-[#8697C4]/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#8697C4]/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#3D52A0] text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#EDE8F5]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#172033]">AI Test Analysis</h2>
                <span className="text-[11px] text-[#5F6B85]">Root-cause diagnosis & triage recommendations</span>
              </div>
            </div>
            <span className="text-[11px] font-mono text-[#3D52A0] bg-white px-2 py-0.5 rounded border border-[#ADBBDA]/50">
              Confidence: 94%
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="font-bold text-[#D64545] uppercase tracking-wide text-[10px] block">Problem Detected</span>
              <p className="text-[#172033] font-semibold text-sm mt-0.5">{data.aiAnalysis.problemDetected}</p>
            </div>

            <div>
              <span className="font-bold text-[#5F6B85] uppercase tracking-wide text-[10px] block">AI Explanation</span>
              <p className="text-[#5F6B85] leading-relaxed mt-0.5">{data.aiAnalysis.explanation}</p>
            </div>

            <div>
              <span className="font-bold text-[#5F6B85] uppercase tracking-wide text-[10px] block">Possible Causes</span>
              <ul className="mt-1 space-y-1 list-disc list-inside text-[#172033]">
                {data.aiAnalysis.possibleCauses.map((cause, cIdx) => (
                  <li key={cIdx}>{cause}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#ADBBDA]/40">
              <span className="font-bold text-[#3D52A0] uppercase tracking-wide text-[10px] block">Recommendation</span>
              <p className="text-xs text-[#172033] mt-0.5">{data.aiAnalysis.recommendation}</p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Button
                size="sm"
                variant="primary"
                onClick={() => setActiveTab('api')}
                className="text-xs gap-1.5"
              >
                <span>View Failed Test</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs gap-1.5 bg-white"
                onClick={() => alert('AI Diagnostic Assistant ready: Ask questions regarding query timeouts.')}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#7091E6]" />
                <span>Ask AI</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs Navigation Bar */}
      <div className="border-b border-[#ADBBDA]/30 flex overflow-x-auto gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all shrink-0 flex items-center gap-2 ${
              activeTab === tab.id
                ? 'border-[#3D52A0] text-[#3D52A0] bg-[#EDE8F5]/30'
                : 'border-transparent text-[#5F6B85] hover:text-[#172033] hover:border-[#ADBBDA]'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === tab.id ? 'bg-[#3D52A0] text-white' : 'bg-[#EDE8F5] text-[#5F6B85]'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick API status list */}
          <div className="bg-white rounded-2xl border border-[#ADBBDA]/40 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#ADBBDA]/30">
              <h3 className="text-sm font-bold text-[#172033]">API Endpoints Summary</h3>
              <Button variant="ghost" size="sm" onClick={() => setActiveTab('api')} className="text-xs text-[#7091E6]">
                View All
              </Button>
            </div>
            <div className="space-y-2 text-xs">
              {data.apiTests?.map((api) => (
                <div key={api.id} className="p-3 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                      api.method === 'GET' ? 'bg-[#7091E6]/20 text-[#3D52A0]' : 'bg-[#EDE8F5] text-[#172033]'
                    }`}>
                      {api.method}
                    </span>
                    <span className="font-semibold text-[#172033] mono">{api.endpoint}</span>
                  </div>
                  <span className={`font-mono font-bold ${api.result === 'PASS' ? 'text-[#22A06B]' : 'text-[#D64545]'}`}>
                    {api.status} {api.result}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick UI status list */}
          <div className="bg-white rounded-2xl border border-[#ADBBDA]/40 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#ADBBDA]/30">
              <h3 className="text-sm font-bold text-[#172033]">UI Suite Summary</h3>
              <Button variant="ghost" size="sm" onClick={() => setActiveTab('ui')} className="text-xs text-[#7091E6]">
                View All
              </Button>
            </div>
            <div className="space-y-2 text-xs">
              {data.uiTests?.map((ui) => (
                <div key={ui.id} className="p-3 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/30 flex items-center justify-between">
                  <span className="text-[#172033] font-medium flex items-center gap-2">
                    {ui.status === 'PASS' ? (
                      <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                    ) : (
                      <XCircle className="w-4 h-4 text-[#D64545]" />
                    )}
                    <span>{ui.title}</span>
                  </span>
                  <span className="mono text-[#5F6B85]">{ui.duration}s</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: API TESTS WITH DETAIL PANEL */}
      {activeTab === 'api' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Table */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#ADBBDA]/40 overflow-hidden shadow-sm">
            <div className="p-4 bg-[#F8F9FC] border-b border-[#ADBBDA]/30">
              <h3 className="text-sm font-bold text-[#172033]">Validated Endpoints</h3>
            </div>
            <div className="divide-y divide-[#ADBBDA]/20 text-xs">
              {data.apiTests?.map((api) => {
                const isSelected = selectedApiTest?.id === api.id;
                return (
                  <div
                    key={api.id}
                    onClick={() => setSelectedApiTest(api)}
                    className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#EDE8F5]' : 'hover:bg-[#F8F9FC]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        api.method === 'GET' ? 'bg-[#7091E6]/20 text-[#3D52A0]' :
                        api.method === 'POST' ? 'bg-[#EDE8F5] text-[#3D52A0]' :
                        api.method === 'PUT' ? 'bg-gray-100 text-gray-700' : 'bg-red-50 text-red-600'
                      }`}>
                        {api.method}
                      </span>
                      <div>
                        <div className="font-semibold text-[#172033] mono">{api.endpoint}</div>
                        <div className="text-[11px] text-[#5F6B85] mono">{api.duration}ms latency</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
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

          {/* Detail Panel */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#ADBBDA]/40 p-6 space-y-4 shadow-sm">
            {selectedApiTest ? (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-[#ADBBDA]/30">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs uppercase px-2 py-0.5 rounded bg-[#EDE8F5] text-[#3D52A0]">
                      {selectedApiTest.method}
                    </span>
                    <span className="font-mono text-sm font-bold text-[#172033]">{selectedApiTest.endpoint}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(JSON.stringify(selectedApiTest.response, null, 2))}>
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#F8F9FC] border border-[#ADBBDA]/30">
                    <span className="text-[#5F6B85] block text-[10px]">Expected</span>
                    <span className="font-mono font-bold text-[#22A06B]">{selectedApiTest.expected || 200}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#F8F9FC] border border-[#ADBBDA]/30">
                    <span className="text-[#5F6B85] block text-[10px]">Actual</span>
                    <span className={`font-mono font-bold ${selectedApiTest.result === 'PASS' ? 'text-[#22A06B]' : 'text-[#D64545]'}`}>
                      {selectedApiTest.status}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#F8F9FC] border border-[#ADBBDA]/30">
                    <span className="text-[#5F6B85] block text-[10px]">Duration</span>
                    <span className="font-mono font-bold text-[#172033]">{selectedApiTest.duration}ms</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#5F6B85] uppercase tracking-wider block mb-1.5">
                    Response JSON Body
                  </span>
                  <pre className="p-4 rounded-xl bg-[#172033] text-[#EDE8F5] text-xs font-mono overflow-x-auto max-h-64 leading-relaxed">
                    {JSON.stringify(selectedApiTest.response, null, 2)}
                  </pre>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <Button size="sm" variant="primary" className="text-xs">
                    Retry Test
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(selectedApiTest.endpoint)} className="text-xs">
                    Copy Request
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-[#5F6B85] text-xs">
                Select an endpoint from the table to inspect details.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: UI TESTS */}
      {activeTab === 'ui' && (
        <div className="bg-white rounded-2xl border border-[#ADBBDA]/40 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#ADBBDA]/30">
            <div>
              <h3 className="text-sm font-bold text-[#172033]">Playwright Browser UI Test Suite</h3>
              <p className="text-xs text-[#5F6B85]">Executed across Chromium engine in 1920x1080 viewport</p>
            </div>
          </div>

          <div className="space-y-3">
            {data.uiTests?.map((test) => (
              <div
                key={test.id}
                className={`p-4 rounded-xl border transition-all ${
                  test.status === 'PASS'
                    ? 'bg-white border-[#ADBBDA]/40'
                    : 'bg-[#D64545]/5 border-[#D64545]/30'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {test.status === 'PASS' ? (
                      <CheckCircle2 className="w-5 h-5 text-[#22A06B] shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-[#D64545] shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-[#172033]">{test.title}</h4>
                      <p className="text-xs text-[#5F6B85] mt-0.5">
                        Browser: {test.browser} • Duration: {test.duration}s
                      </p>
                      {test.error && (
                        <div className="mt-2 p-2.5 rounded bg-white border border-[#D64545]/30 text-xs text-[#D64545] font-mono">
                          {test.error}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {test.screenshotUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs gap-1.5"
                        onClick={() => setScreenshotModal(test.screenshotUrl)}
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>View Screenshot</span>
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-xs">
                      View Trace
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PERFORMANCE */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {data.performance?.metrics?.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-[#ADBBDA]/40 shadow-sm">
                <span className="text-[11px] text-[#5F6B85] block">{m.name}</span>
                <div className="text-2xl font-bold text-[#172033] mt-1">{m.value}</div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#ADBBDA]/20 text-[10px]">
                  <span className="text-[#22A06B] font-semibold uppercase">{m.status}</span>
                  <span className="text-[#5F6B85] mono">{m.benchmark}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-[#ADBBDA]/40 p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-[#172033]">Resource Consumption & Response Profiling</h3>
            <p className="text-xs text-[#5F6B85]">Timeline analysis of CPU utilization, memory pressure, and network throughput</p>

            <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/30">
              <div className="grid grid-cols-6 gap-2 text-center text-xs font-mono">
                {data.performance?.chartData?.map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white border border-[#ADBBDA]/30">
                    <div className="text-[#3D52A0] font-bold">{item.time}</div>
                    <div className="text-[11px] text-[#5F6B85] mt-1">CPU: {item.cpu}%</div>
                    <div className="text-[11px] text-[#5F6B85]">RAM: {item.memory}MB</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: NETWORK */}
      {activeTab === 'network' && (
        <div className="bg-white rounded-2xl border border-[#ADBBDA]/40 overflow-hidden shadow-sm">
          <div className="p-4 bg-[#F8F9FC] border-b border-[#ADBBDA]/30 flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#172033]">Network Waterfall Requests</h3>
            <span className="text-xs text-[#5F6B85] mono">5 Requests Captured</span>
          </div>
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
                {data.network?.map((req, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#EDE8F5]/30">
                    <td className="py-3 px-4 font-bold text-[#3D52A0]">{req.method}</td>
                    <td className="py-3 px-4 text-[#172033] max-w-xs truncate">{req.url}</td>
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
      )}

      {/* TAB 6: CONSOLE */}
      {activeTab === 'console' && (
        <div className="rounded-2xl bg-[#172033] text-[#EDE8F5] p-6 shadow-sm font-mono text-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#5F6B85]/30">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#7091E6]" />
              <span className="font-bold text-[#EDE8F5]">Browser Console Stdout / Stderr</span>
            </div>
            <span className="text-[11px] text-[#8697C4]">Isolated Context</span>
          </div>

          <div className="space-y-2 pt-2">
            {data.consoleLogs?.map((log, lIdx) => (
              <div
                key={lIdx}
                className={`p-3 rounded-lg flex items-start gap-3 ${
                  log.type === 'ERROR'
                    ? 'bg-[#D64545]/15 border border-[#D64545]/30 text-[#EDE8F5]'
                    : log.type === 'WARNING'
                    ? 'bg-[#D99A24]/15 border border-[#D99A24]/30 text-[#EDE8F5]'
                    : 'bg-white/5 text-[#EDE8F5]'
                }`}
              >
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                  log.type === 'ERROR' ? 'bg-[#D64545] text-white' :
                  log.type === 'WARNING' ? 'bg-[#D99A24] text-white' : 'bg-[#7091E6] text-white'
                }`}>
                  {log.type}
                </span>
                <span className="flex-1 leading-relaxed">{log.message}</span>
                <span className="text-[10px] text-[#8697C4] shrink-0">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: SCREENSHOTS */}
      {activeTab === 'screenshots' && (
        <div className="bg-white rounded-2xl border border-[#ADBBDA]/40 p-6 space-y-6 shadow-sm">
          <h3 className="text-sm font-bold text-[#172033]">Captured Failure & Transition Screenshots</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/40 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#172033]">Homepage Initial Render</span>
                <span className="mono text-[#5F6B85]">1920x1080</span>
              </div>
              <div className="h-48 rounded-lg bg-[#EDE8F5] flex items-center justify-center border border-[#ADBBDA]/30 text-[#5F6B85] text-xs">
                [Full Page Viewport Rendered - Verified]
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/40 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#D64545]">Failed Selector Modal Snapshot</span>
                <span className="mono text-[#D64545]">Step #5 Failure</span>
              </div>
              <div className="h-48 rounded-lg bg-[#EDE8F5] flex items-center justify-center border border-[#D64545]/30 text-[#D64545] text-xs font-mono">
                [Target button#submit-modal missing from DOM tree]
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: LOGS */}
      {activeTab === 'logs' && (
        <div className="rounded-2xl bg-[#172033] text-[#EDE8F5] p-6 shadow-sm font-mono text-xs space-y-2">
          <div className="text-[#8697C4] pb-2 border-b border-[#5F6B85]/30">PyTest Runner Execution Log</div>
          <div className="pt-2 text-[11px] leading-relaxed opacity-90 space-y-1">
            <div>platform win32 -- Python 3.12.0, pytest-8.3.4, pluggy-1.5.0</div>
            <div>rootdir: /tests, configfile: pytest.ini</div>
            <div>plugins: asyncio-0.25.3, playwright-0.7.0</div>
            <div>collected 18 items</div>
            <div className="text-[#22A06B]">tests/test_api_endpoints.py::test_api_users PASSED [  5%]</div>
            <div className="text-[#22A06B]">tests/test_api_endpoints.py::test_auth_login PASSED [ 11%]</div>
            <div className="text-[#D64545]">tests/test_api_endpoints.py::test_get_products FAILED [ 16%]</div>
            <div className="text-[#22A06B]">tests/test_ui_interactions.py::test_homepage_render PASSED [ 22%]</div>
            <div className="text-[#22A06B]">tests/test_ui_interactions.py::test_navigation_responsive PASSED [ 27%]</div>
            <div className="text-[#D99A24]">=================== 1 failed, 17 passed in 12.40s ====================</div>
          </div>
        </div>
      )}

      {/* Screenshot Modal */}
      {screenshotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#ADBBDA]/30">
              <h4 className="text-sm font-bold text-[#172033]">Captured Failure Screenshot</h4>
              <Button size="sm" variant="ghost" onClick={() => setScreenshotModal(null)}>
                Close
              </Button>
            </div>
            <div className="h-64 rounded-xl bg-[#EDE8F5] flex items-center justify-center text-xs text-[#5F6B85]">
              [Detailed Playwright Failure Screen Capture Preview]
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
