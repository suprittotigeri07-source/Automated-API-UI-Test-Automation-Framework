import React, { useState } from 'react';
import { User, Mail, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'Demo Engineer');
  const [email, setEmail] = useState(user?.email || 'demo@testpilot.dev');
  const [saved, setSaved] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">User Profile</h1>
        <p className="text-xs sm:text-sm text-[#5F6B85] mt-1">
          Personal credentials and organization membership.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#ADBBDA]/40 p-6 sm:p-8 space-y-6 shadow-sm">
        {saved && (
          <div className="p-3 rounded-xl bg-[#22A06B]/10 border border-[#22A06B]/20 text-xs text-[#22A06B] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile updated successfully.</span>
          </div>
        )}

        <div className="flex items-center gap-4 pb-6 border-b border-[#ADBBDA]/30">
          <div className="w-16 h-16 rounded-2xl bg-[#3D52A0] text-white flex items-center justify-center font-bold text-xl shadow-md">
            {name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#172033]">{name}</h3>
            <span className="text-xs text-[#5F6B85] font-mono">{email}</span>
            <div className="mt-1">
              <span className="text-[10px] font-bold text-[#3D52A0] uppercase bg-[#EDE8F5] px-2 py-0.5 rounded">
                Lead QA Automation Engineer
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={User}
          />

          <Input
            label="Work Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
          />

          <div className="pt-2">
            <Button type="submit" variant="primary" size="sm">
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
