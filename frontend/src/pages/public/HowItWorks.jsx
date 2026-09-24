import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Sliders, Play, LineChart, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';

export function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Target Endpoint or Website',
      desc: 'Enter the target URL. TestPilot handles SSL negotiation, DNS resolution, and staging credentials if required.',
      icon: Globe,
      details: [
        'Supports staging, production, and localhost tunnels',
        'Automatic protocol validation and canonical redirect checks',
        'Custom header injection (Bearer tokens, basic auth, cookies)'
      ]
    },
    {
      num: '02',
      title: 'Configure Your Test Matrix',
      desc: 'Choose the exact test categories suited for your audit: Playwright UI, REST endpoints, network tracing, and Core Web Vitals.',
      icon: Sliders,
      details: [
        'Toggle UI tests: Navigation, forms, responsive viewports',
        'Toggle API checks: Response status, latency SLA, JSON payload integrity',
        'Toggle Console & Network: Capture uncaught exceptions and slow assets'
      ]
    },
    {
      num: '03',
      title: 'Distributed Headless Execution',
      desc: 'TestPilot spins up high-performance headless Chromium runners with PyTest running in containerized cloud sandboxes.',
      icon: Play,
      details: [
        'Real-time streaming status of each pipeline stage',
        'Automatic screenshot capture on selector timeout or assertion failure',
        'Completely isolated clean session without persistent cache pollution'
      ]
    },
    {
      num: '04',
      title: 'Actionable Diagnostics & AI Analysis',
      desc: 'Get an instant health score out of 100, inspect failed steps down to the line of code or network packet, and read AI explanations.',
      icon: LineChart,
      details: [
        'Visual health score breakdown with categorical scores',
        'AI root-cause diagnostics explaining why endpoints or buttons failed',
        'One-click export to QA reports and CI/CD webhook triggers'
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-[#3D52A0] uppercase">The TestPilot Workflow</span>
          <h1 className="text-4xl font-extrabold text-[#172033] tracking-tight sm:text-5xl mt-2">
            How TestPilot Automates Testing
          </h1>
          <p className="mt-4 text-base text-[#5F6B85] leading-relaxed">
            From entering a URL to reviewing deep technical telemetry, our platform streamlines regression testing into four automated phases.
          </p>
        </div>

        <div className="space-y-12 max-w-4xl mx-auto">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                className="p-8 rounded-2xl bg-[#F8F9FC] border border-[#ADBBDA]/40 shadow-sm flex flex-col md:flex-row gap-6 items-start"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#3D52A0] text-white flex items-center justify-center font-mono font-bold text-lg shrink-0 shadow-md">
                  {step.num}
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[#7091E6]" />
                    <h3 className="text-xl font-bold text-[#172033]">{step.title}</h3>
                  </div>
                  <p className="text-sm text-[#5F6B85] leading-relaxed">{step.desc}</p>
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#172033]">
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#22A06B] shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link to="/new-test">
            <Button size="lg" variant="primary" className="gap-2">
              <span>Try it with your website</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
