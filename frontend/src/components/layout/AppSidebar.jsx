import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  PlusCircle,
  PlaySquare,
  Globe,
  MonitorCheck,
  Gauge,
  Network,
  Terminal,
  FileBarChart,
  Settings,
  BookOpen,
  LogOut,
  User,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function AppSidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/projects', icon: FolderGit2 },
    { name: 'New Test', path: '/new-test', icon: PlusCircle, badge: 'Quick' },
    { name: 'Recent Run', path: '/results/run_1042', icon: PlaySquare },
    { name: 'API Tests', path: '/api-tests', icon: Globe },
    { name: 'UI Tests', path: '/ui-tests', icon: MonitorCheck },
    { name: 'Performance', path: '/performance', icon: Gauge },
    { name: 'Network', path: '/network', icon: Network },
    { name: 'Console', path: '/console', icon: Terminal },
    { name: 'Reports', path: '/reports', icon: FileBarChart },
  ];

  const secondaryNavItems = [
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Documentation', path: '/how-it-works', icon: BookOpen },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[250px] bg-[#3D52A0] text-white flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Logo & workspace */}
        <div>
          <div className="h-16 flex items-center gap-2.5 px-5 border-b border-[#7091E6]/30">
            <div className="w-8 h-8 rounded-lg bg-[#7091E6] flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight">TestPilot</span>
              <span className="block text-[10px] text-[#ADBBDA] tracking-wider uppercase">QA Platform</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-170px)]">
            <div className="px-3 pb-1 text-[11px] font-bold text-[#ADBBDA] uppercase tracking-wider">
              Automation
            </div>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#7091E6] text-white shadow-xs'
                      : 'text-[#EDE8F5] hover:bg-[#7091E6]/30 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className="w-4 h-4 shrink-0 text-[#ADBBDA]" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#EDE8F5] text-[#3D52A0]">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}

            <div className="pt-4 pb-1 px-3 text-[11px] font-bold text-[#ADBBDA] uppercase tracking-wider border-t border-[#7091E6]/20 mt-4">
              Workspace
            </div>
            {secondaryNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#7091E6] text-white'
                      : 'text-[#EDE8F5] hover:bg-[#7091E6]/30 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-4 h-4 shrink-0 text-[#ADBBDA]" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Bottom User Profile Section */}
        <div className="p-3 border-t border-[#7091E6]/30 bg-[#3D52A0]">
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#7091E6]/20">
            <NavLink to="/profile" className="flex items-center gap-2.5 min-w-0" onClick={onClose}>
              <div className="w-8 h-8 rounded-full bg-[#EDE8F5] text-[#3D52A0] flex items-center justify-center font-bold text-xs shrink-0">
                {user?.name ? user.name.charAt(0) : <User className="w-4 h-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold truncate leading-tight text-white">
                  {user?.name || 'Engineer'}
                </p>
                <p className="text-[10px] text-[#ADBBDA] truncate leading-tight mt-0.5">
                  {user?.email || 'user@testpilot.io'}
                </p>
              </div>
            </NavLink>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 rounded text-[#ADBBDA] hover:text-white hover:bg-[#7091E6]/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
