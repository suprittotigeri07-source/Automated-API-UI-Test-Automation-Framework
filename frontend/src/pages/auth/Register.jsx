import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'bg-gray-200' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    switch (score) {
      case 1:
        return { score: 25, label: 'Weak', color: 'bg-[#D64545]' };
      case 2:
        return { score: 50, label: 'Fair', color: 'bg-[#D99A24]' };
      case 3:
        return { score: 75, label: 'Good', color: 'bg-[#7091E6]' };
      case 4:
        return { score: 100, label: 'Strong', color: 'bg-[#22A06B]' };
      default:
        return { score: 10, label: 'Too short', color: 'bg-[#D64545]' };
    }
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreed) {
      setError('Please accept the Terms of Service and Privacy Policy to proceed.');
      return;
    }

    try {
      setLoading(true);
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Top Toggle Tabs */}
      <div className="flex rounded-xl bg-[#EDE8F5]/60 p-1 mb-6 border border-[#ADBBDA]/30">
        <Link
          to="/login"
          className="flex-1 py-2 text-xs font-semibold rounded-lg text-[#5F6B85] hover:text-[#172033] text-center transition-all"
        >
          Sign In
        </Link>
        <button
          type="button"
          className="flex-1 py-2 text-xs font-bold rounded-lg bg-white text-[#3D52A0] shadow-sm transition-all"
        >
          Sign Up
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#172033]">Create your account</h2>
        <p className="text-xs text-[#5F6B85] mt-1">Start running automated web & API tests in minutes.</p>
      </div>

      {error && (
        <div className="mb-5 p-3 rounded-lg bg-[#D64545]/10 border border-[#D64545]/20 flex items-start gap-2.5 text-xs text-[#D64545]">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <Input
          label="Full Name"
          type="text"
          placeholder="Jane Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={User}
          required
        />

        <Input
          label="Work Email"
          type="email"
          placeholder="jane@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
          required
        />

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            required
          />

          {/* Password strength indicator */}
          {password && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-[11px] text-[#5F6B85] mb-1">
                <span>Password strength</span>
                <span className="font-semibold">{strength.label}</span>
              </div>
              <div className="w-full h-1.5 bg-[#EDE8F5] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${strength.color}`}
                  style={{ width: `${strength.score}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          icon={Lock}
          required
        />

        <div className="pt-1">
          <label className="flex items-start gap-2 cursor-pointer text-xs text-[#5F6B85]">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-[#ADBBDA] text-[#3D52A0] focus:ring-[#7091E6]"
            />
            <span>
              I agree to the{' '}
              <a href="#" className="text-[#3D52A0] font-semibold underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#3D52A0] font-semibold underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-2"
          loading={loading}
        >
          <span>Create Account & Start Testing</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-[#ADBBDA]/30 text-center text-xs text-[#5F6B85]">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-[#3D52A0] hover:text-[#7091E6]">
          Sign In
        </Link>
      </div>
    </div>
  );
}
