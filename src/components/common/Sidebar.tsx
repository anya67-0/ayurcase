import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileSpreadsheet,
  Calendar,
  FileText,
  Mic,
  ScanLine,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ShieldCheck,
  UserCheck,
  Activity,
  HeartPulse
} from 'lucide-react';
import { authService } from '../../services/authService';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const doctorNav = [
    { to: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/doctor/patients', label: 'Patients', icon: Users },
    { to: '/doctor/patients/new', label: 'New Patient', icon: UserPlus },
    { to: '/doctor/case/new', label: 'Case Taking', icon: FileSpreadsheet },
    { to: '/doctor/appointments', label: 'Appointments', icon: Calendar },
    { to: '/doctor/voice-case', label: 'Voice Case', icon: Mic },
    { to: '/doctor/scan', label: 'Scan Document', icon: ScanLine },
    { to: '/doctor/reports', label: 'Reports & Analytics', icon: FileText },
    { to: '/doctor/notifications', label: 'Notifications', icon: Bell },
    { to: '/doctor/settings', label: 'Settings', icon: Settings },
  ];

  const patientNav = [
    { to: '/patient/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/patient/records', label: 'My Records', icon: FileText },
    { to: '/patient/appointments', label: 'Appointments', icon: Calendar },
    { to: '/patient/documents', label: 'Documents & Lab', icon: ScanLine },
    { to: '/patient/profile', label: 'ABHA & Profile', icon: ShieldCheck },
    { to: '/patient/settings', label: 'Settings', icon: Settings },
  ];

  const adminNav = [
    { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/admin/verification', label: 'Doctor Verification', icon: UserCheck },
    { to: '/admin/doctors', label: 'Registered Doctors', icon: Users },
    { to: '/admin/patients', label: 'Patient Registry', icon: Activity },
    { to: '/admin/security', label: 'Security & Audit Logs', icon: ShieldCheck },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const navItems = user.role === 'patient' 
    ? patientNav 
    : user.role === 'admin' 
    ? adminNav 
    : doctorNav;

  return (
    <aside className="w-64 bg-[#143828] text-white flex flex-col h-screen fixed top-0 left-0 z-40 select-none border-r border-emerald-900/50">
      {/* Brand Header */}
      <div className="p-5 border-b border-emerald-800/40 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-[#52B788] flex items-center justify-center shadow-md">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white font-serif">AyurCase</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-400/20 text-amber-300 font-semibold rounded border border-amber-400/30">
                AIIA
              </span>
            </div>
            <p className="text-[10px] text-emerald-200/70 tracking-wide font-sans">Ministry of Ayush</p>
          </div>
        </NavLink>
      </div>

      {/* Role Pill */}
      <div className="px-5 py-2.5 bg-[#0F2D1F]/70 border-b border-emerald-800/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] text-emerald-200 uppercase tracking-wider font-semibold">
            {user.role === 'doctor' ? 'Clinical Portal' : user.role === 'patient' ? 'Patient Portal' : 'Admin Authority'}
          </span>
        </div>
        <span className="text-[10px] text-slate-300 bg-white/10 px-1.5 py-0.5 rounded">
          v2.6
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#2D6A4F] text-white shadow-sm font-semibold'
                    : 'text-emerald-100/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4 text-emerald-300/80" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Info & Footer */}
      <div className="p-4 border-t border-emerald-800/40 bg-[#0F2D1F]/50">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256'}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover border border-emerald-600/50"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">{user.name}</p>
            <p className="text-[10px] text-emerald-300/70 truncate">
              {user.registrationNo || user.abhaId || user.email}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-emerald-200/60 pt-2 border-t border-white/5">
          <button
            onClick={() => navigate('/about')}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 hover:text-rose-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
