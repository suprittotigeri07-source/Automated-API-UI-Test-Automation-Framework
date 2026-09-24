import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Globe, 
  Cpu, 
  Layers, 
  Activity, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Zap, 
  Monitor, 
  Database, 
  Camera, 
  FileText, 
  Sparkles,
  ChevronRight,
  Play
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export function Welcome() {
  const navigate = useNavigate();
  const [quickUrl, setQuickUrl] = useState('');

  const handleQuickTest = (e) => {
    e.preventDefault();
    if (quickUrl.trim()) {
      navigate(`/new-test?url=${encodeURIComponent(quickUrl.trim())}`);
    } else {
      navigate('/new-test');
    }
  };

  const steps = [
    {
      num: '01',
      title: 'Enter Website',
      desc: 'Provide the website or API URL you want to evaluate.',
    },
    {
      num: '02',
      title: 'Configure Tests',
      desc: 'Choose UI, API, performance, console, and health checks.',
    },
    {
      num: '03',
      title: 'Run Automation',
      desc: 'TestPilot executes automated checks in isolated headless browsers.',
    },
    {
      num: '04',
      title: 'Analyze Results',
      desc: 'Review failures, actionable metrics and AI root-cause diagnostics.',
    },
  ];

  const features = [
    {
      icon: Monitor,
      title: 'Automated UI Testing',
      desc: 'Automate real browser interactions using Playwright headless engine.',
      href: '/features#ui',
    },
    {
      icon: Database,
      title: 'API Testing',
      desc: 'Validate HTTP endpoints, status codes, payload structures and response latencies.',
      href: '/features#api',
    },
    {
      icon: Activity,
      title: 'Network Monitoring',
      desc: 'Trace failed requests, asset payload sizes, slow DNS handshakes and mixed content.',
      href: '/features#network',
    },
    {
      icon: Terminal,
      title: 'Console Error Detection',
      desc: 'Capture unhandled JavaScript exceptions, deprecations and runtime errors.',
      href: '/features#console',
    },
    {
      icon: Zap,
      title: 'Performance Testing',
      desc: 'Measure Core Web Vitals, FCP, LCP, DOM Content Loaded and server response times.',
      href: '/features#performance',
    },
    {
      icon: Camera,
      title: 'Screenshot Capture',
      desc: 'Capture high-resolution screenshots on DOM state transitions and test step failures.',
      href: '/features#screenshots',
    },
    {
      icon: FileText,
      title: 'Test Reports',
      desc: 'Generate executive summaries, compliance exports and engineering-ready reports.',
      href: '/features#reports',
    },
    {
      icon: Sparkles,
      title: 'AI Failure Analysis',
      desc: 'Intelligent root-cause diagnosis that pinpoint why an endpoint or UI element failed.',
      href: '/features#ai',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#ADBBDA]/30 bg-gradient-to-b from-[#EDE8F5]/40 via-white to-white">
        {/* Subtle decorative background blur */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-[#7091E6]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDE8F5] border border-[#ADBBDA]/40 text-[#3D52A0] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#22A06B] animate-pulse"></span>
                Playwright & PyTest Cloud Automation
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#172033] tracking-tight leading-[1.12]">
                Test Your Website.{' '}
                <span className="text-[#3D52A0]">Automatically.</span>
              </h1>

              <p className="text-lg text-[#5F6B85] leading-relaxed max-w-xl">
                Automated UI, API and performance testing for modern web applications. Enter your website URL, run intelligent automated tests and instantly understand what is working, what is failing and why.
              </p>

              {/* Quick test input bar */}
              <form onSubmit={handleQuickTest} className="flex flex-col sm:flex-row gap-2 max-w-lg p-1.5 rounded-xl border border-[#ADBBDA]/70 bg-white shadow-sm focus-within:border-[#3D52A0] focus-within:ring-2 focus-within:ring-[#7091E6]/20 transition-all">
                <div className="flex-1 flex items-center px-3 gap-2">
                  <Globe className="w-5 h-5 text-[#8697C4] shrink-0" />
                  <input
                    type="url"
                    placeholder="https://your-website.com"
                    value={quickUrl}
                    onChange={(e) => setQuickUrl(e.target.value)}
                    className="w-full text-sm text-[#172033] placeholder:text-[#5F6B85]/60 outline-none bg-transparent py-2"
                  />
                </div>
                <Button type="submit" variant="primary" className="shrink-0 flex items-center gap-2">
                  <span>Start Testing</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#5F6B85]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                  <span>Instant headless execution</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                  <span>AI-powered root-cause</span>
                </div>
              </div>
            </div>

            {/* Right Visual Illustration: Website -> Engine -> Tests -> Results */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg p-6 rounded-2xl bg-white border border-[#ADBBDA]/50 shadow-xl shadow-[#3D52A0]/5 space-y-4">
                {/* Node 1: Target Website */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/40">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#3D52A0] text-white flex items-center justify-center">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#5F6B85]">Target Environment</div>
                      <div className="text-sm font-bold text-[#172033] mono">https://example.com</div>
                    </div>
                  </div>
                  <Badge variant="success">Online • HTTP 200</Badge>
                </div>

                {/* Connector line */}
                <div className="flex justify-center">
                  <div className="h-6 w-0.5 bg-[#ADBBDA]/70 border-dashed border-l"></div>
                </div>

                {/* Node 2: Automation Engine */}
                <div className="p-4 rounded-xl bg-[#3D52A0] text-white shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-[#ADBBDA]" />
                      <span className="text-sm font-semibold text-white">TestPilot Engine</span>
                    </div>
                    <span className="text-[11px] font-mono bg-[#7091E6]/40 px-2 py-0.5 rounded text-[#EDE8F5]">
                      PyTest + Playwright
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                    <div className="bg-[#7091E6]/30 p-2 rounded border border-[#8697C4]/30">
                      <div className="font-semibold text-[#EDE8F5]">API Engine</div>
                      <div className="text-[10px] text-[#ADBBDA]">HTTP / REST</div>
                    </div>
                    <div className="bg-[#7091E6]/30 p-2 rounded border border-[#8697C4]/30">
                      <div className="font-semibold text-[#EDE8F5]">UI Runner</div>
                      <div className="text-[10px] text-[#ADBBDA]">Chromium DOM</div>
                    </div>
                    <div className="bg-[#7091E6]/30 p-2 rounded border border-[#8697C4]/30">
                      <div className="font-semibold text-[#EDE8F5]">Core Vitals</div>
                      <div className="text-[10px] text-[#ADBBDA]">LCP / FCP</div>
                    </div>
                  </div>
                </div>

                {/* Connector line */}
                <div className="flex justify-center">
                  <div className="h-6 w-0.5 bg-[#ADBBDA]/70 border-dashed border-l"></div>
                </div>

                {/* Node 3: Result Summary Card */}
                <div className="p-4 rounded-xl bg-[#EDE8F5]/60 border border-[#8697C4]/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#3D52A0] uppercase tracking-wide">Test Run Output #1042</span>
                    <span className="text-xs font-bold text-[#22A06B] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 92/100 Health Score
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded bg-white border border-[#ADBBDA]/30">
                      <span className="text-[#172033] font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22A06B]" /> API Endpoints Validated
                      </span>
                      <span className="mono text-[#5F6B85]">5/5 Passed • 182ms</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-white border border-[#ADBBDA]/30">
                      <span className="text-[#172033] font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22A06B]" /> UI Interactive Elements
                      </span>
                      <span className="mono text-[#5F6B85]">Chromium • 0 Errors</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-white border border-[#ADBBDA]/30">
                      <span className="text-[#172033] font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22A06B]" /> Performance & Vitals
                      </span>
                      <span className="mono text-[#5F6B85]">LCP 1.8s (Good)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section: 3 primary capabilities */}
      <section className="py-16 md:py-24 bg-white border-b border-[#ADBBDA]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-[#7091E6] uppercase mb-3">
              Comprehensive QA Architecture
            </h2>
            <h3 className="text-3xl font-extrabold text-[#172033] tracking-tight sm:text-4xl">
              Everything you need to test modern websites.
            </h3>
            <p className="mt-4 text-[#5F6B85] text-base leading-relaxed">
              Validate your web application across every layer—from underlying API endpoints to real browser DOM events and frontend performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: API Testing */}
            <div className="p-8 rounded-2xl bg-[#F8F9FC] border border-[#ADBBDA]/40 hover:border-[#7091E6] hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#EDE8F5] border border-[#ADBBDA]/50 flex items-center justify-center text-[#3D52A0] mb-6 group-hover:bg-[#3D52A0] group-hover:text-white transition-colors">
                <Database className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-[#172033] mb-3">1. API Testing</h4>
              <p className="text-sm text-[#5F6B85] leading-relaxed mb-6">
                Validate HTTP endpoints, status codes, payload structures, headers and latency benchmarks across staging and production.
              </p>
              <div className="space-y-2 text-xs text-[#172033]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                  <span>REST & JSON payload verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                  <span>Response time threshold enforcement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                  <span>Failure payload inspection</span>
                </div>
              </div>
            </div>

            {/* Card 2: UI Testing */}
            <div className="p-8 rounded-2xl bg-[#F8F9FC] border border-[#ADBBDA]/40 hover:border-[#7091E6] hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#EDE8F5] border border-[#ADBBDA]/50 flex items-center justify-center text-[#3D52A0] mb-6 group-hover:bg-[#3D52A0] group-hover:text-white transition-colors">
                <Monitor className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-[#172033] mb-3">2. UI Testing</h4>
              <p className="text-sm text-[#5F6B85] leading-relaxed mb-6">
                Automate real browser interactions using Playwright. Test navigation, button clicks, form fills and verify visual layout integrity.
              </p>
              <div className="space-y-2 text-xs text-[#172033]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                  <span>Cross-browser headless execution</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                  <span>Interactive element assertions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                  <span>Automated failure screenshot capture</span>
                </div>
              </div>
            </div>

            {/* Card 3: Website Health */}
            <div className="p-8 rounded-2xl bg-[#F8F9FC] border border-[#ADBBDA]/40 hover:border-[#7091E6] hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#EDE8F5] border border-[#ADBBDA]/50 flex items-center justify-center text-[#3D52A0] mb-6 group-hover:bg-[#3D52A0] group-hover:text-white transition-colors">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-[#172033] mb-3">3. Website Health</h4>
              <p className="text-sm text-[#5F6B85] leading-relaxed mb-6">
                Detect DNS delays, SSL certificate expiration, network asset failures, console runtime exceptions and Core Web Vitals degradation.
              </p>
              <div className="space-y-2 text-xs text-[#172033]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                  <span>Console error & warning capture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                  <span>Core Web Vitals & FCP/LCP metrics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                  <span>Network waterfall inspection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works: 4-Step Timeline */}
      <section className="py-16 md:py-24 bg-[#F8F9FC] border-b border-[#ADBBDA]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#3D52A0] uppercase">Workflow</span>
            <h3 className="text-3xl font-extrabold text-[#172033] tracking-tight sm:text-4xl mt-2">
              Four steps from URL to comprehensive diagnosis.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-8 left-16 right-16 h-0.5 bg-[#ADBBDA]/60 -z-0"></div>

            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-start bg-white p-6 rounded-xl border border-[#ADBBDA]/40 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#3D52A0] text-white flex items-center justify-center font-mono font-bold text-sm mb-4 shadow-sm">
                  {step.num}
                </div>
                <h4 className="text-lg font-bold text-[#172033] mb-2">{step.title}</h4>
                <p className="text-xs text-[#5F6B85] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section Grid: 8 Cards */}
      <section className="py-16 md:py-24 bg-white border-b border-[#ADBBDA]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#7091E6] uppercase">Capabilities</span>
            <h3 className="text-3xl font-extrabold text-[#172033] tracking-tight sm:text-4xl mt-2">
              Engineered for developer & QA velocity.
            </h3>
            <p className="text-sm text-[#5F6B85] mt-3">
              Everything your team needs to catch regressions before they reach your customers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white border border-[#ADBBDA]/40 hover:border-[#7091E6] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#EDE8F5] text-[#3D52A0] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-[#172033] mb-2">{feat.title}</h4>
                    <p className="text-xs text-[#5F6B85] leading-relaxed mb-4">{feat.desc}</p>
                  </div>
                  <Link
                    to={feat.href}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#7091E6] hover:text-[#3D52A0] transition-colors"
                  >
                    <span>Learn more</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Preview Mockup */}
      <section className="py-16 md:py-24 bg-[#F8F9FC] border-b border-[#ADBBDA]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-[#3D52A0] uppercase">Dashboard Preview</span>
            <h3 className="text-3xl font-extrabold text-[#172033] tracking-tight sm:text-4xl mt-2">
              See exactly what is happening.
            </h3>
            <p className="text-sm text-[#5F6B85] mt-3">
              Real-time insights across test suites with clear indicators for passes, warnings, and root causes.
            </p>
          </div>

          {/* Product Dashboard Frame */}
          <div className="rounded-2xl border border-[#ADBBDA]/50 bg-white shadow-2xl overflow-hidden">
            {/* Mock browser header */}
            <div className="bg-[#EDE8F5] border-b border-[#ADBBDA]/40 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#D64545]"></div>
                <div className="w-3 h-3 rounded-full bg-[#D99A24]"></div>
                <div className="w-3 h-3 rounded-full bg-[#22A06B]"></div>
              </div>
              <div className="mx-auto bg-white px-6 py-1 rounded-md text-xs text-[#5F6B85] border border-[#ADBBDA]/30 font-mono">
                https://app.testpilot.dev/results/run_1042
              </div>
            </div>

            {/* Dashboard Mockup Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Header inside mockup */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ADBBDA]/30">
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="text-xl font-bold text-[#172033]">Target: example.com</h4>
                    <Badge variant="success">Healthy</Badge>
                  </div>
                  <p className="text-xs text-[#5F6B85] mt-1">Run #1042 • Executed via Playwright Headless Chromium</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs text-[#5F6B85]">Health Score</div>
                    <div className="text-2xl font-extrabold text-[#3D52A0]">92 / 100</div>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-[#7091E6] border-t-[#3D52A0] flex items-center justify-center text-xs font-bold text-[#3D52A0]">
                    92%
                  </div>
                </div>
              </div>

              {/* Stats Mockup Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/40">
                  <span className="text-xs text-[#5F6B85]">Total Tests</span>
                  <div className="text-2xl font-bold text-[#172033] mt-1">28</div>
                </div>
                <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/40">
                  <span className="text-xs text-[#22A06B] font-semibold">Passed</span>
                  <div className="text-2xl font-bold text-[#22A06B] mt-1">27</div>
                </div>
                <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/40">
                  <span className="text-xs text-[#D99A24] font-semibold">Warnings</span>
                  <div className="text-2xl font-bold text-[#D99A24] mt-1">1</div>
                </div>
                <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/40">
                  <span className="text-xs text-[#D64545] font-semibold">Failed</span>
                  <div className="text-2xl font-bold text-[#D64545] mt-1">0</div>
                </div>
              </div>

              {/* Mockup Table */}
              <div className="rounded-xl border border-[#ADBBDA]/40 overflow-hidden">
                <div className="bg-[#EDE8F5]/50 px-4 py-2.5 text-xs font-semibold text-[#3D52A0] border-b border-[#ADBBDA]/30">
                  Test Execution Breakdown
                </div>
                <div className="divide-y divide-[#ADBBDA]/20 text-xs">
                  <div className="px-4 py-3 flex items-center justify-between">
                    <span className="font-medium text-[#172033] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#22A06B]" /> GET /api/v1/users (200 OK)
                    </span>
                    <span className="text-[#5F6B85] mono">182ms • PASS</span>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <span className="font-medium text-[#172033] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#22A06B]" /> UI: Homepage Hero Navigation Render
                    </span>
                    <span className="text-[#5F6B85] mono">Chromium • 1.2s</span>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <span className="font-medium text-[#172033] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#22A06B]" /> Core Web Vitals: LCP 1.82s
                    </span>
                    <span className="text-[#5F6B85] mono">Good • PASS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strong Call to Action */}
      <section className="py-20 bg-[#3D52A0] text-white relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7091E6]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8697C4]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Ready to test your website?
          </h2>
          <p className="text-lg text-[#EDE8F5]/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Run your first automated test in minutes. Prevent regressions, ensure API reliability and ship software with total confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/new-test">
              <Button size="lg" className="bg-[#7091E6] hover:bg-[#8697C4] text-white font-bold px-8 shadow-lg shadow-[#3D52A0]/40">
                Start Testing
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-[#EDE8F5]/40 text-white hover:bg-white/10 font-bold px-8">
                Register Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
