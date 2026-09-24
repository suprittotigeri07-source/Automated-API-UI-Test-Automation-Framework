import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide your account email.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#172033]">Forgot your password?</h2>
        <p className="text-xs text-[#5F6B85] mt-1">
          Enter your email and we&apos;ll send you instructions to reset your password.
        </p>
      </div>

      {submitted ? (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#22A06B]/10 border border-[#22A06B]/20 text-xs text-[#22A06B] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Reset link dispatched</p>
              <p className="mt-1 text-[#172033]">
                If an account exists for <span className="font-semibold">{email}</span>, you will receive password reset instructions shortly.
              </p>
            </div>
          </div>

          <Link to="/login" className="block pt-2">
            <Button variant="outline" className="w-full gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-[#D64545]/10 border border-[#D64545]/20 flex items-start gap-2.5 text-xs text-[#D64545]">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            loading={loading}
          >
            Send Reset Link
          </Button>

          <div className="pt-4 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5F6B85] hover:text-[#3D52A0] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
