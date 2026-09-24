import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export function PublicFooter() {
  return (
    <footer className="bg-white border-t border-[#ADBBDA]/30 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand info */}
          <div className="col-span-2">
            <Logo />
            <p className="text-sm text-[#5F6B85] mt-3 max-w-sm leading-relaxed">
              Automated UI, API and performance testing platform for engineering and QA teams who value speed, accuracy, and confidence.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#3D52A0] bg-[#EDE8F5] px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#22A06B]"></span>
              All Testing Engines Operational
            </div>
          </div>

          {/* Column: Product */}
          <div>
            <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm text-[#5F6B85]">
              <li><Link to="/features" className="hover:text-[#3D52A0] transition-colors">Features</Link></li>
              <li><Link to="/how-it-works" className="hover:text-[#3D52A0] transition-colors">Testing Engine</Link></li>
              <li><Link to="/dashboard" className="hover:text-[#3D52A0] transition-colors">Test Reports</Link></li>
              <li><Link to="/pricing" className="hover:text-[#3D52A0] transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Column: Resources */}
          <div>
            <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm text-[#5F6B85]">
              <li><a href="#docs" className="hover:text-[#3D52A0] transition-colors">Documentation</a></li>
              <li><a href="#api" className="hover:text-[#3D52A0] transition-colors">API Reference</a></li>
              <li><a href="#guides" className="hover:text-[#3D52A0] transition-colors">Playwright Guides</a></li>
              <li><a href="#cli" className="hover:text-[#3D52A0] transition-colors">FastAPI Specs</a></li>
            </ul>
          </div>

          {/* Column: Company & Account */}
          <div>
            <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-4">Account</h4>
            <ul className="space-y-2.5 text-sm text-[#5F6B85]">
              <li><Link to="/login" className="hover:text-[#3D52A0] transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-[#3D52A0] transition-colors">Create Account</Link></li>
              <li><Link to="/about" className="hover:text-[#3D52A0] transition-colors">About Us</Link></li>
              <li><Link to="/settings" className="hover:text-[#3D52A0] transition-colors">Workspace Settings</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#EDE8F5] flex flex-col sm:flex-row items-center justify-between text-xs text-[#5F6B85] gap-4">
          <p>© 2026 TestPilot. All rights reserved.</p>
          <p className="font-medium text-[#3D52A0]">"Test smarter. Ship confidently."</p>
        </div>
      </div>
    </footer>
  );
}
