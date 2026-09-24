import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Monitor, 
  Database, 
  Activity, 
  Terminal, 
  Zap, 
  Camera, 
  FileText, 
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export function Features() {
  const featureList = [
    {
      id: 'ui',
      icon: Monitor,
      title: 'Automated Playwright UI Testing',
      desc: 'Simulate realistic human interactions across Chromium, Firefox and WebKit engines with headless execution.',
      points: [
        'Locator assertions for buttons, forms, dropdowns, and dynamic modals',
        'Automatic waiting and smart retries for asynchronous elements',
        'Visual layout verification across viewport sizes',
        'Zero-configuration Playwright runner in isolated cloud containers'
      ]
    },
    {
      id: 'api',
      icon: Database,
      title: 'Deep API Endpoint Verification',
      desc: 'Execute robust HTTP/REST assertions against your staging or production microservices with payload checking.',
      points: [
        'Status code, headers and latency benchmarks',
        'JSON schema validation with strict path assertions',
        'Authentication tokens, headers and cookie injection',
        'Detailed request and response payload debugging'
      ]
    },
    {
      id: 'performance',
      icon: Zap,
      title: 'Core Web Vitals & Performance',
      desc: 'Analyze page load performance using the modern Chrome User Experience standards.',
      points: [
        'First Contentful Paint (FCP) and Largest Contentful Paint (LCP)',
        'Cumulative Layout Shift (CLS) and Interaction to Next Paint (INP)',
        'Resource timing breakdowns for scripts, styles, and assets',
        'Performance score graded 0–100 with actionable tips'
      ]
    },
    {
      id: 'network',
      icon: Activity,
      title: 'Network Traffic & Asset Audit',
      desc: 'Monitor all HTTP/HTTPS network requests fired during full browser rendering cycles.',
      points: [
        'Immediate alerts on 4xx/5xx network failures and timeouts',
        'Heavy assets, uncompressed images, and slow API dependencies',
        'Mixed-content and insecure third-party script detection',
        'Full waterfall breakdown of DNS, SSL and content transfer'
      ]
    },
    {
      id: 'console',
      icon: Terminal,
      title: 'Browser Console & Runtime Logs',
      desc: 'Capture unhandled errors and warnings emitted during page evaluation.',
      points: [
        'JavaScript uncaught syntax and runtime exceptions',
        'Deprecated browser API calls and framework warnings',
        'CORS and Content Security Policy (CSP) violations',
        'Real-time filter by Error, Warning, and Info logs'
      ]
    },
    {
      id: 'ai',
      icon: Sparkles,
      title: 'AI Root-Cause Failure Diagnostics',
      desc: 'Save engineering hours by letting AI pinpoint the root cause of automated test failures.',
      points: [
        'Cross-correlates API failures with UI DOM states and console stack traces',
        'Delivers concise explanations in plain developer terminology',
        'Suggests specific fix recommendations and test assertions',
        'Maintains failure history to detect flaky regression patterns'
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-[#7091E6] uppercase">Platform Capabilities</span>
          <h1 className="text-4xl font-extrabold text-[#172033] tracking-tight sm:text-5xl mt-2">
            Engineered for Modern Testing
          </h1>
          <p className="mt-4 text-base text-[#5F6B85] leading-relaxed">
            TestPilot combines headless browser automation, HTTP assertion engines, Core Web Vitals profiling, and AI diagnostics into a cohesive platform.
          </p>
        </div>

        <div className="space-y-16">
          {featureList.map((item, index) => {
            const Icon = item.icon;
            const isReversed = index % 2 !== 0;
            return (
              <div 
                key={item.id} 
                id={item.id}
                className={`flex flex-col lg:flex-row gap-10 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EDE8F5] text-[#3D52A0] flex items-center justify-center border border-[#ADBBDA]/40">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#172033]">{item.title}</h2>
                  <p className="text-sm text-[#5F6B85] leading-relaxed">{item.desc}</p>
                  <ul className="space-y-2 pt-2">
                    {item.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#172033]">
                        <CheckCircle2 className="w-4 h-4 text-[#22A06B] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1 w-full p-6 rounded-2xl bg-[#F8F9FC] border border-[#ADBBDA]/50 shadow-sm">
                  <div className="p-4 rounded-xl bg-white border border-[#ADBBDA]/30 space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-[#ADBBDA]/20 text-xs">
                      <span className="font-semibold text-[#3D52A0] uppercase tracking-wider">{item.title} Demo</span>
                      <span className="text-[11px] font-mono text-[#22A06B] bg-[#22A06B]/10 px-2 py-0.5 rounded">STATUS: READY</span>
                    </div>
                    <div className="font-mono text-xs bg-[#172033] text-[#EDE8F5] p-3 rounded-lg overflow-x-auto">
                      <div className="text-[#8697C4]">// Automated verification routine</div>
                      <div>const suite = await testpilot.run(&apos;{item.id}&apos;);</div>
                      <div className="text-[#22A06B]">✓ suite.assertSuccess(); // Completed in 410ms</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 p-10 rounded-2xl bg-[#3D52A0] text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Start Testing Your Application Today</h2>
          <p className="text-sm text-[#EDE8F5]/80 max-w-xl mx-auto mb-6">
            Get instant visibility into API latencies, UI broken states, and runtime errors.
          </p>
          <Link to="/new-test">
            <Button size="lg" className="bg-[#7091E6] hover:bg-[#8697C4] text-white font-bold">
              Run Free Automation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
