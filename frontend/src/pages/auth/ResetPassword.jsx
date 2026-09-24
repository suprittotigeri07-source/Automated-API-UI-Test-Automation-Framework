import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword && newPassword === confirmPassword) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 500);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#172033]">Reset Password</h2>
        <p className="text-xs text-[#5F6B85] mt-1">Enter your new account password below.</p>
      </div>

      {success ? (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#22A06B]/10 border border-[#22A06B]/20 text-xs text-[#22A06B] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className="font-medium text-sm">Your password has been successfully updated.</span>
          </div>
          <Link to="/login" className="block pt-2">
            <Button variant="primary" className="w-full">
              Proceed to Sign In
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="New Password"
            type="password"
            placeholder="At least 8 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            icon={Lock}
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={Lock}
            required
          />

          <Button type="submit" variant="primary" className="w-full" loading={loading}>
            Update Password
          </Button>

          <div className="pt-2 text-center">
            <Link to="/login" className="text-xs font-semibold text-[#5F6B85] hover:text-[#3D52A0]">
              Cancel & Return to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
