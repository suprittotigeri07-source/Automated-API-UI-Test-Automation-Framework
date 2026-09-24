import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Globe, 
  Settings, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Activity, 
  Monitor, 
  Database, 
  Zap, 
  ArrowRight,
  ArrowLeft,
  Lock
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { testService } from '../../services/testService';

export function NewTest() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefillUrl = searchParams.get('url') || '';

  const [step, setStep] = useState(1);
  const [targetUrl, setTargetUrl] = useState(prefillUrl || 'https://example.com');
  const [environment, setEnvironment] = useState('production');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Test configuration groups
  const [config, setConfig] = useState({
    // Website Health
    health_availability: true,
    health_dns: true,
    health_https: true,
    health_page_load: true,
    // UI
    ui_rendering: true,
    ui_navigation: true,
    ui_forms: true,
    ui_interactive: true,
    ui_console: true,
    // API
    api_requests: true,
    api_status: true,
    api_validation: true,
    api_failures: true,
    // Performance
    perf_page_load: true,
    perf_response_time: true,
    perf_resource_timing: true,
    // Security
    sec_ssl: true,
    sec_headers: true,
    sec_mixed_content: true,
  });

  const handleCheckboxToggle = (key) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleStartTest = async (e) => {
    e.preventDefault();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      setError('Please provide a valid URL starting with http:// or https://');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const run = await testService.startTest({
        url: targetUrl,
        environment,
        config,
      });
      // Navigate to live test execution page
      navigate(`/test/${run.id}?target=${encodeURIComponent(targetUrl)}`);
    } catch (err) {
      setError(err.message || 'Failed to start automated test.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">Configure New Test</h1>
        <p className="text-xs sm:text-sm text-[#5F6B85] mt-1">
          Define target URLs and select automated QA suites to run against your environment.
        </p>
      </div>

      {/* Multi-step progress bar */}
      <div className="grid grid-cols-4 gap-2 border-b border-[#ADBBDA]/30 pb-4">
        {[
          { num: 1, label: 'Target' },
          { num: 2, label: 'Configure' },
          { num: 3, label: 'Run' },
          { num: 4, label: 'Results' },
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step >= s.num
                  ? 'bg-[#3D52A0] text-white'
                  : 'bg-[#EDE8F5] text-[#8697C4]'
              }`}
            >
              {s.num}
            </div>
            <span
              className={`text-xs font-semibold hidden sm:inline ${
                step >= s.num ? 'text-[#172033]' : 'text-[#8697C4]'
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-[#D64545]/10 border border-[#D64545]/20 text-xs text-[#D64545]">
          {error}
        </div>
      )}

      {/* Step 1: Target Definition */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-[#ADBBDA]/40 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-[#172033]">Target Website or API URL</h2>
            <p className="text-xs text-[#5F6B85] mt-1">
              Provide the root domain or specific endpoint to evaluate.
            </p>
          </div>

          <div className="space-y-4">
            <Input
              label="Target Endpoint / Domain"
              type="url"
              placeholder="https://example.com"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              icon={Globe}
              required
            />

            <div>
              <label className="block text-xs font-semibold text-[#172033] mb-1.5">Environment Tag</label>
              <div className="grid grid-cols-3 gap-3">
                {['production', 'staging', 'development'].map((env) => (
                  <button
                    key={env}
                    type="button"
                    onClick={() => setEnvironment(env)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-all ${
                      environment === env
                        ? 'border-[#3D52A0] bg-[#EDE8F5] text-[#3D52A0]'
                        : 'border-[#ADBBDA]/50 text-[#5F6B85] hover:bg-[#F8F9FC]'
                    }`}
                  >
                    {env}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              variant="primary"
              onClick={() => {
                if (targetUrl) setStep(2);
                else setError('Please provide a URL.');
              }}
              className="gap-2"
            >
              <span>Next: Configure Suites</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Configure Suites Checkbox Groups */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-[#ADBBDA]/40 p-6 sm:p-8 space-y-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#172033]">Test Category Configuration</h2>
              <p className="text-xs text-[#5F6B85] mt-0.5">
                Targeting: <span className="font-semibold text-[#3D52A0] mono">{targetUrl}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const allTrue = {};
                  Object.keys(config).forEach((k) => (allTrue[k] = true));
                  setConfig(allTrue);
                }}
              >
                Select All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Website Health */}
            <div className="p-5 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/40 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#172033]">
                <Activity className="w-4 h-4 text-[#7091E6]" />
                <span>Website Health</span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { id: 'health_availability', label: 'Availability / Uptime Ping' },
                  { id: 'health_dns', label: 'DNS Resolution Latency' },
                  { id: 'health_https', label: 'HTTPS & SSL Certificate' },
                  { id: 'health_page_load', label: 'Page Load Thresholds' },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-2.5 cursor-pointer text-[#172033]">
                    <input
                      type="checkbox"
                      checked={config[item.id]}
                      onChange={() => handleCheckboxToggle(item.id)}
                      className="w-4 h-4 rounded border-[#ADBBDA] text-[#3D52A0] focus:ring-[#7091E6]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* UI Tests */}
            <div className="p-5 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/40 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#172033]">
                <Monitor className="w-4 h-4 text-[#7091E6]" />
                <span>Playwright UI Checks</span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { id: 'ui_rendering', label: 'DOM Page Rendering' },
                  { id: 'ui_navigation', label: 'Top Navigation & Routing' },
                  { id: 'ui_forms', label: 'Form Input Elements' },
                  { id: 'ui_interactive', label: 'Interactive Buttons & Modals' },
                  { id: 'ui_console', label: 'Console Runtime Error Trap' },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-2.5 cursor-pointer text-[#172033]">
                    <input
                      type="checkbox"
                      checked={config[item.id]}
                      onChange={() => handleCheckboxToggle(item.id)}
                      className="w-4 h-4 rounded border-[#ADBBDA] text-[#3D52A0] focus:ring-[#7091E6]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* API Tests */}
            <div className="p-5 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/40 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#172033]">
                <Database className="w-4 h-4 text-[#7091E6]" />
                <span>API & Network Requests</span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { id: 'api_requests', label: 'All XHR/Fetch Network Requests' },
                  { id: 'api_status', label: 'HTTP Status 2xx/3xx Validation' },
                  { id: 'api_validation', label: 'Response JSON Schema Validation' },
                  { id: 'api_failures', label: 'Trace 4xx/5xx Failed Requests' },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-2.5 cursor-pointer text-[#172033]">
                    <input
                      type="checkbox"
                      checked={config[item.id]}
                      onChange={() => handleCheckboxToggle(item.id)}
                      className="w-4 h-4 rounded border-[#ADBBDA] text-[#3D52A0] focus:ring-[#7091E6]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Performance & Security */}
            <div className="p-5 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/40 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#172033]">
                <Zap className="w-4 h-4 text-[#7091E6]" />
                <span>Performance & Security</span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { id: 'perf_page_load', label: 'FCP / LCP Core Web Vitals' },
                  { id: 'perf_response_time', label: 'TTFB & Latency Metrics' },
                  { id: 'sec_ssl', label: 'SSL/TLS Handshake Check' },
                  { id: 'sec_headers', label: 'Strict Security Headers (HSTS, CSP)' },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-2.5 cursor-pointer text-[#172033]">
                    <input
                      type="checkbox"
                      checked={config[item.id]}
                      onChange={() => handleCheckboxToggle(item.id)}
                      className="w-4 h-4 rounded border-[#ADBBDA] text-[#3D52A0] focus:ring-[#7091E6]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#ADBBDA]/30">
            <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>

            <Button
              variant="primary"
              onClick={handleStartTest}
              loading={loading}
              className="gap-2 px-6"
            >
              <Play className="w-4 h-4" />
              <span>Start Automated Test</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
