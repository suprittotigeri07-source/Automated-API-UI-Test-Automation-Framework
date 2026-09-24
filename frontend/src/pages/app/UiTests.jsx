import React, { useState } from 'react';
import { Monitor, CheckCircle2, XCircle, Camera, Play, ExternalLink } from 'lucide-react';
import { Button } from '../../components/common/Button';

export function UiTests() {
  const [modalOpen, setModalOpen] = useState(false);

  const uiTests = [
    { id: 1, title: 'Homepage loads', status: 'PASS', duration: '1.2s', browser: 'Chromium Headless' },
    { id: 2, title: 'Navigation works', status: 'PASS', duration: '0.8s', browser: 'Chromium Headless' },
    { id: 3, title: 'Login page renders', status: 'PASS', duration: '1.4s', browser: 'Chromium Headless' },
    { id: 4, title: 'Buttons visible', status: 'PASS', duration: '0.9s', browser: 'Chromium Headless' },
    { id: 5, title: 'Forms render', status: 'PASS', duration: '1.1s', browser: 'Chromium Headless' },
    {
      id: 6,
      title: 'Login button interaction',
      status: 'FAIL',
      duration: '4.8s',
      browser: 'Chromium Headless',
      error: 'TimeoutError: locator.click: Timeout 4000ms exceeded waiting for element "button#login-submit".',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">UI Automation Tests</h1>
          <p className="text-xs sm:text-sm text-[#5F6B85] mt-1">
            Playwright headless browser execution against DOM selectors, interactions, and forms.
          </p>
        </div>

        <Button variant="primary" size="sm" className="gap-1.5 text-xs">
          <Play className="w-3.5 h-3.5" />
          <span>Run All UI Tests</span>
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-[#ADBBDA]/40 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#ADBBDA]/30 text-xs">
          <span className="font-bold text-[#172033]">Executed Assertions (6)</span>
          <span className="text-[#22A06B] font-semibold">5 Passed • 1 Failed</span>
        </div>

        <div className="space-y-3">
          {uiTests.map((test) => (
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
                    <h3 className="text-sm font-bold text-[#172033]">{test.title}</h3>
                    <p className="text-xs text-[#5F6B85] mt-0.5">
                      {test.browser} • Duration: {test.duration}
                    </p>
                    {test.error && (
                      <div className="mt-2 p-2.5 rounded bg-white border border-[#D64545]/30 text-xs text-[#D64545] font-mono leading-relaxed">
                        {test.error}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {test.status === 'FAIL' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs gap-1.5"
                      onClick={() => setModalOpen(true)}
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>View Screenshot</span>
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" className="text-xs text-[#5F6B85]">
                    View Trace
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#ADBBDA]/30">
              <h4 className="text-sm font-bold text-[#172033]">Playwright Failure Screenshot</h4>
              <Button size="sm" variant="ghost" onClick={() => setModalOpen(false)}>
                Close
              </Button>
            </div>
            <div className="h-64 rounded-xl bg-[#EDE8F5] border border-[#ADBBDA]/30 flex flex-col items-center justify-center p-6 text-center">
              <Camera className="w-8 h-8 text-[#8697C4] mb-2" />
              <span className="text-xs font-semibold text-[#172033]">Failure at locator: button#login-submit</span>
              <span className="text-[11px] text-[#5F6B85] mt-1">Viewport: 1920x1080 (Desktop Chromium)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
