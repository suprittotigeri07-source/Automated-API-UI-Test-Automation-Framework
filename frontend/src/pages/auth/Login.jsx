import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('demo@testpilot.dev');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('demo@testpilot.dev');
    setPassword('password123');
    setError('');
  };

  return (
    <div>
      {/* Top Toggle Tabs */}
      <div className="flex rounded-xl bg-[#EDE8F5]/60 p-1 mb-6 border border-[#ADBBDA]/30">
        <button
          type="button"
          className="flex-1 py-2 text-xs font-bold rounded-lg bg-white text-[#3D52A0] shadow-sm transition-all"
        >
          Sign In
        </button>
        <Link
          to="/register"
          className="flex-1 py-2 text-xs font-semibold rounded-lg text-[#5F6B85] hover:text-[#172033] text-center transition-all"
        >
          Sign Up
        </Link>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#172033]">Welcome back</h2>
        <p className="text-xs text-[#5F6B85] mt-1">Sign in to your TestPilot account.</p>
      </div>

      {location.state?.from && (
        <div className="mb-4 p-3 rounded-xl bg-[#7091E6]/15 border border-[#7091E6]/30 flex items-center gap-2 text-xs text-[#3D52A0]">
          <CheckCircle2 className="w-4 h-4 text-[#3D52A0] shrink-0" />
          <span>Please sign in or use the demo account below to access your dashboard.</span>
        </div>
      )}

      {/* Quick Demo Helper Banner */}
      <div className="mb-5 p-3 rounded-xl bg-[#EDE8F5]/70 border border-[#8697C4]/30 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#3D52A0]" />
          <span className="text-[11px] text-[#172033] font-medium">Demo tester credentials available</span>
        </div>
        <button
          type="button"
          onClick={handleFillDemo}
          className="text-[11px] font-bold text-[#3D52A0] bg-white px-2.5 py-1 rounded-md border border-[#ADBBDA]/50 hover:bg-[#3D52A0] hover:text-white transition-all shadow-xs"
        >
          Auto-fill Demo
        </button>
      </div>

      {error && (
        <div className="mb-5 p-3 rounded-lg bg-[#D64545]/10 border border-[#D64545]/20 flex items-start gap-2.5 text-xs text-[#D64545]">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Work Email"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
          required
        />

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            required
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-[#5F6B85]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-[#ADBBDA] text-[#3D52A0] focus:ring-[#7091E6]"
            />
            <span>Remember me</span>
          </label>

          <Link
            to="/forgot-password"
            className="text-xs font-semibold text-[#7091E6] hover:text-[#3D52A0] transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-2"
          loading={loading}
        >
          <span>Sign In to Dashboard</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-[#ADBBDA]/30 text-center text-xs text-[#5F6B85]">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-[#3D52A0] hover:text-[#7091E6]">
          Create one now
        </Link>
      </div>
    </div>
  );
}
