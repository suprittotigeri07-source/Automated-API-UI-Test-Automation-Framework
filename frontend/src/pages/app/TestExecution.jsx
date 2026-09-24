import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  CheckCircle2, 
  Loader2, 
  Circle, 
  Clock, 
  Terminal, 
  ArrowRight,
  ShieldAlert,
  Cpu
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export function TestExecution() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const targetUrl = searchParams.get('target') || 'https://example.com';

  const [progress, setProgress] = useState(64);
  const [elapsed, setElapsed] = useState(8.2);
  const [currentStepIndex, setCurrentStepIndex] = useState(5);
  const [isCompleted, setIsCompleted] = useState(false);

  const steps = [
    { title: 'Website reachable', desc: 'Handshake completed with target server' },
    { title: 'DNS resolved', desc: 'A & AAAA records verified in 18ms' },
    { title: 'HTTPS validated', desc: 'TLS 1.3 certificate valid' },
    { title: 'Browser launched', desc: 'Chromium headless isolated sandbox container' },
    { title: 'Page loaded', desc: 'DOMContentLoaded and full paint fired' },
    { title: 'Inspecting network requests', desc: 'Auditing 42 outgoing assets and XHR payloads' },
    { title: 'API validation', desc: 'Asserting status codes and JSON schemas' },
    { title: 'UI tests', desc: 'Simulating navigation and button triggers' },
    { title: 'Performance', desc: 'Calculating Core Web Vitals and LCP metric' },
    { title: 'Report generation', desc: 'Compiling AI root-cause diagnostics' },
  ];

  // Simulating live pipeline execution progression
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => +(prev + 0.5).toFixed(1));
    }, 500);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsCompleted(true);
          return 100;
        }
        const next = prev + 6;
        if (next >= 100) {
          setIsCompleted(true);
          return 100;
        }
        return next;
      });
    }, 900);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, []);

  useEffect(() => {
    const idx = Math.min(Math.floor((progress / 100) * steps.length), steps.length - 1);
    setCurrentStepIndex(idx);
  }, [progress, steps.length]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">Live Test Execution</h1>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
              isCompleted 
                ? 'bg-[#22A06B]/10 text-[#22A06B] border border-[#22A06B]/30'
                : 'bg-[#7091E6]/10 text-[#3D52A0] border border-[#7091E6]/30 animate-pulse'
            }`}>
              {isCompleted ? 'COMPLETED' : 'RUNNING'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#5F6B85] mt-1">
            Testing target: <span className="font-semibold text-[#172033] mono">{targetUrl}</span>
          </p>
        </div>

        {isCompleted && (
          <Button
            variant="primary"
            onClick={() => navigate(`/results/${id || 'run_1042'}`)}
            className="gap-2 shadow-sm animate-bounce"
          >
            <span>View Full Results</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Main Execution Card */}
      <div className="bg-white rounded-2xl border border-[#ADBBDA]/40 p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Progress bar and metrics */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#172033]">
              Execution Progress: <span className="text-[#3D52A0] font-mono text-sm">{progress}%</span>
            </span>
            <span className="text-[#5F6B85] flex items-center gap-1.5 mono">
              <Clock className="w-3.5 h-3.5" /> Elapsed: {elapsed}s
            </span>
          </div>

          <div className="w-full h-3 bg-[#EDE8F5] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#3D52A0] to-[#7091E6] transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Current Active Operation */}
        <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#3D52A0] text-white flex items-center justify-center">
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-[#22A06B]" />
              ) : (
                <Loader2 className="w-5 h-5 animate-spin text-[#EDE8F5]" />
              )}
            </div>
            <div>
              <div className="text-[11px] uppercase font-bold text-[#7091E6] tracking-wider">
                {isCompleted ? 'Suite Finalized' : 'Current Operation'}
              </div>
              <div className="text-sm font-bold text-[#172033]">
                {isCompleted ? 'All test vectors validated' : steps[currentStepIndex]?.title}
              </div>
            </div>
          </div>
          <span className="text-xs text-[#5F6B85] mono hidden sm:inline">
            Worker PID #8410 • Container: headless-chromium-v134
          </span>
        </div>

        {/* Execution Pipeline Timeline */}
        <div className="space-y-3 pt-2">
          <h2 className="text-xs font-bold text-[#3D52A0] uppercase tracking-wider">
            Execution Pipeline
          </h2>

          <div className="divide-y divide-[#ADBBDA]/20 border border-[#ADBBDA]/30 rounded-xl overflow-hidden">
            {steps.map((step, idx) => {
              const isPast = idx < currentStepIndex || isCompleted;
              const isCurrent = idx === currentStepIndex && !isCompleted;
              const isFuture = idx > currentStepIndex && !isCompleted;

              return (
                <div
                  key={idx}
                  className={`p-3.5 flex items-center justify-between text-xs transition-colors ${
                    isCurrent
                      ? 'bg-[#EDE8F5]/50'
                      : isPast
                      ? 'bg-white'
                      : 'bg-[#F8F9FC]/60 text-[#5F6B85]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isPast && <CheckCircle2 className="w-4 h-4 text-[#22A06B] shrink-0" />}
                    {isCurrent && <Loader2 className="w-4 h-4 text-[#7091E6] animate-spin shrink-0" />}
                    {isFuture && <Circle className="w-4 h-4 text-[#ADBBDA] shrink-0" />}

                    <div>
                      <span className={`font-semibold ${isPast || isCurrent ? 'text-[#172033]' : 'text-[#8697C4]'}`}>
                        {step.title}
                      </span>
                      <p className="text-[11px] text-[#5F6B85]">{step.desc}</p>
                    </div>
                  </div>

                  <span className="mono text-[11px] text-[#5F6B85]">
                    {isPast ? 'DONE' : isCurrent ? 'IN PROGRESS' : 'QUEUED'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live log streaming emulator */}
        <div className="rounded-xl bg-[#172033] text-[#EDE8F5] p-4 text-xs font-mono space-y-1">
          <div className="text-[#8697C4] flex items-center justify-between pb-2 border-b border-[#5F6B85]/30">
            <span className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#7091E6]" /> Runner Telemetry Log
            </span>
            <span>stdout/live</span>
          </div>
          <div className="pt-2 text-[11px] space-y-1 leading-relaxed opacity-90">
            <div>[00:01.02] CONNECT https://example.com/ &rarr; 200 OK (182ms)</div>
            <div>[00:03.45] PLAYWRIGHT: Chromium context established viewport 1920x1080</div>
            <div>[00:05.12] DISPATCH: 5 UI assertions queued: [nav, hero, buttons, forms, modal]</div>
            <div>[00:07.89] NETWORK: 42 assets transferred (total: 1.4 MB)</div>
            {progress >= 80 && (
              <div className="text-[#22A06B]">[00:08.20] ASSERTION: Core Web Vitals LCP 1.82s (PASS)</div>
            )}
            {isCompleted && (
              <div className="text-[#7091E6] font-bold">[00:09.10] PIPELINE EXECUTION COMPLETE. Redirecting...</div>
            )}
          </div>
        </div>

        {/* Footer controls */}
        <div className="pt-2 flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
            Cancel & Return to Dashboard
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate(`/results/${id || 'run_1042'}`)}
            className="gap-2"
          >
            <span>Skip to Results</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
