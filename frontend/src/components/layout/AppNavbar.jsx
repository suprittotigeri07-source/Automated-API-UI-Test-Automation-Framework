import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, HelpCircle, Menu, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

export function AppNavbar({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-[#ADBBDA]/30 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile hamburger & Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onMenuClick}
          className="p-1.5 rounded-lg text-[#5F6B85] hover:text-[#172033] hover:bg-[#EDE8F5] md:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#8697C4] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects, tests, or URLs..."
            className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-[#F8F9FC] border border-[#ADBBDA]/40 rounded-lg text-[#172033] placeholder-[#8697C4] focus:outline-none focus:border-[#7091E6] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right: Quick Action, Alerts & Avatar */}
      <div className="flex items-center gap-3">
        <Link to="/new-test" className="hidden sm:inline-flex">
          <Button size="sm" variant="primary" icon={Plus}>
            New Test
          </Button>
        </Link>

        <div className="h-5 w-[1px] bg-[#EDE8F5] mx-1 hidden sm:block"></div>

        <button
          className="p-2 text-[#5F6B85] hover:text-[#3D52A0] hover:bg-[#EDE8F5] rounded-lg transition-colors relative"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="w-1.5 h-1.5 bg-[#7091E6] rounded-full absolute top-2 right-2"></span>
        </button>

        <Link
          to="/how-it-works"
          className="p-2 text-[#5F6B85] hover:text-[#3D52A0] hover:bg-[#EDE8F5] rounded-lg transition-colors"
          title="Help & Guides"
        >
          <HelpCircle className="w-4 h-4" />
        </Link>

        <Link to="/profile" className="flex items-center gap-2 pl-2">
          <div className="w-7 h-7 rounded-full bg-[#EDE8F5] text-[#3D52A0] border border-[#ADBBDA]/60 flex items-center justify-center font-bold text-xs">
            {user?.name ? user.name.charAt(0) : 'E'}
          </div>
        </Link>
      </div>
    </header>
  );
}
