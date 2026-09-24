import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#ADBBDA]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-[#3D52A0] bg-[#EDE8F5]'
                    : 'text-[#5F6B85] hover:text-[#172033] hover:bg-[#EDE8F5]/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="sm" variant="primary" icon={ArrowRight}>
                  Open Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-[#3D52A0] hover:text-[#7091E6] px-3 py-1.5">
                  Sign In
                </Link>
                <Link to="/register">
                  <Button size="sm" variant="outline">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" variant="primary" icon={ArrowRight}>
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[#5F6B85] hover:text-[#172033] hover:bg-[#EDE8F5]"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-[#ADBBDA]/30 bg-white px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                isActive(link.path)
                  ? 'text-[#3D52A0] bg-[#EDE8F5]'
                  : 'text-[#5F6B85] hover:text-[#172033] hover:bg-[#EDE8F5]/50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#EDE8F5] flex flex-col gap-2">
            {isAuthenticated ? (
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                <Button className="w-full" size="sm">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-center text-sm font-semibold text-[#3D52A0] py-2">
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full" size="sm">Get Started / Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
