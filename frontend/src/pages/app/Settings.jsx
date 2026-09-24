import React, { useState } from 'react';
import { Shield, Key, Bell, Sliders, Lock, CheckCircle2, Copy } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export function Settings() {
  const [activeSection, setActiveSection] = useState('general');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sections = [
    { id: 'general', label: 'General', icon: Sliders },
    { id: 'testing', label: 'Testing Defaults', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security & Auth', icon: Lock },
    { id: 'api_keys', label: 'API Keys', icon: Key },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">Platform Settings</h1>
        <p className="text-xs sm:text-sm text-[#5F6B85] mt-1">
          Configure test automation runners, alert thresholds, and security parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Navigation sidebar */}
        <div className="md:col-span-3 space-y-1">
          {sections.map((s) => {
            const Icon = s.icon;
            const isSelected = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                  isSelected
                    ? 'bg-[#3D52A0] text-white shadow-sm'
                    : 'text-[#5F6B85] hover:bg-[#EDE8F5] hover:text-[#172033]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Content */}
        <div className="md:col-span-9 bg-white rounded-2xl border border-[#ADBBDA]/40 p-6 sm:p-8 shadow-sm">
          {saved && (
            <div className="mb-6 p-3 rounded-xl bg-[#22A06B]/10 border border-[#22A06B]/20 text-xs text-[#22A06B] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings updated successfully.</span>
            </div>
          )}

          {activeSection === 'general' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-base font-bold text-[#172033] mb-4">General Configuration</h3>
              <Input label="Workspace Name" defaultValue="Acme Engineering QA" />
              <Input label="Default Target Domain" defaultValue="https://example.com" />
              <Button type="submit" variant="primary" size="sm" className="mt-2">
                Save Changes
              </Button>
            </form>
          )}

          {activeSection === 'testing' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-base font-bold text-[#172033] mb-4">Default Test Parameters</h3>
              <Input label="Playwright Selector Timeout (ms)" type="number" defaultValue="4000" />
              <Input label="Max Network Asset Threshold (KB)" type="number" defaultValue="2500" />
              <Input label="Core Web Vitals LCP Threshold (s)" type="number" defaultValue="2.5" />
              <Button type="submit" variant="primary" size="sm" className="mt-2">
                Save Defaults
              </Button>
            </form>
          )}

          {activeSection === 'notifications' && (
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <h3 className="text-base font-bold text-[#172033] mb-4">Notification Channels</h3>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#3D52A0]" />
                <span className="text-[#172033]">Send instant Slack alert on any HTTP 500 error</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#3D52A0]" />
                <span className="text-[#172033]">Daily executive health score digest</span>
              </label>
              <Button type="submit" variant="primary" size="sm" className="mt-4">
                Update Preferences
              </Button>
            </form>
          )}

          {activeSection === 'security' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-base font-bold text-[#172033] mb-4">Security & Authentication</h3>
              <Input label="Enforce TLS Version" defaultValue="TLS 1.3" disabled />
              <label className="flex items-center gap-2 text-xs text-[#172033]">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#3D52A0]" />
                <span>Mask sensitive bearer tokens in report exports</span>
              </label>
              <Button type="submit" variant="primary" size="sm">
                Save Security Settings
              </Button>
            </form>
          )}

          {activeSection === 'api_keys' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#172033] mb-2">API Keys & Tokens</h3>
              <p className="text-xs text-[#5F6B85]">Use keys to trigger headless test executions via CI/CD runners.</p>
              <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#ADBBDA]/40 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#172033]">CI_TESTPILOT_KEY</div>
                  <div className="text-xs font-mono text-[#5F6B85] mt-0.5">tp_live_••••••••••••••••••••••••98af</div>
                </div>
                <Button size="sm" variant="outline" onClick={() => alert('Token copied to clipboard!')} className="text-xs gap-1.5">
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
