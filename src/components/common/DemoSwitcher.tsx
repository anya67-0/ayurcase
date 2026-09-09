import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, RefreshCw, ChevronDown, Sparkles, Shield, User, Stethoscope } from 'lucide-react';
import { authService } from '../../services/authService';
import { storageService } from '../../services/storageService';
import { MOCK_USERS } from '../../data/mockData';

export const DemoSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleSwitchUser = (userId: string) => {
    const target = MOCK_USERS.find(u => u.id === userId);
    if (target) {
      authService.setCurrentUser(target);
      setIsOpen(false);
      if (target.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else if (target.role === 'patient') {
        navigate('/patient/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
      window.location.reload();
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo data (patients, cases, appointments) back to original state?')) {
      storageService.resetToDefaults();
      window.location.reload();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-[#1B4332] text-white px-3.5 py-2 rounded-full shadow-elevated border border-emerald-600/40 hover:bg-[#143828] transition-all text-xs font-medium"
          title="Demo Quick Switcher for SIH Jury"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>SIH Demo Role: <strong>{currentUser.name.split(' ')[1] || currentUser.name}</strong></span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute bottom-12 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 text-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-ayur-forest uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>SIH 2026 Evaluation Hub</span>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                SIH26047
              </span>
            </div>

            <p className="text-xs text-slate-500 my-2">
              Switch role instantly to test end-to-end clinical and patient workflows:
            </p>

            <div className="space-y-1.5">
              <button
                onClick={() => handleSwitchUser('DOC-001')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs border transition-all ${
                  currentUser.role === 'doctor'
                    ? 'border-emerald-500 bg-emerald-50/60 font-semibold text-emerald-950'
                    : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Dr. Ananya Sharma</p>
                    <p className="text-[10px] text-slate-500">Doctor (BAMS, MD - AIIA)</p>
                  </div>
                </div>
                {currentUser.role === 'doctor' && <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded">Active</span>}
              </button>

              <button
                onClick={() => handleSwitchUser('PAT-001')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs border transition-all ${
                  currentUser.role === 'patient'
                    ? 'border-sky-500 bg-sky-50/60 font-semibold text-sky-950'
                    : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Rahul Sharma</p>
                    <p className="text-[10px] text-slate-500">Patient (42M, ABHA Verified)</p>
                  </div>
                </div>
                {currentUser.role === 'patient' && <span className="text-[10px] bg-sky-600 text-white px-1.5 py-0.5 rounded">Active</span>}
              </button>

              <button
                onClick={() => handleSwitchUser('ADM-001')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs border transition-all ${
                  currentUser.role === 'admin'
                    ? 'border-amber-500 bg-amber-50/60 font-semibold text-amber-950'
                    : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-700 text-white flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Dr. Vikramaditya Varma</p>
                    <p className="text-[10px] text-slate-500">Admin (AIIA Academic Council)</p>
                  </div>
                </div>
                {currentUser.role === 'admin' && <span className="text-[10px] bg-amber-700 text-white px-1.5 py-0.5 rounded">Active</span>}
              </button>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <button
                onClick={handleResetData}
                className="flex items-center gap-1.5 text-slate-500 hover:text-rose-600 transition-colors"
                title="Reset test records back to original defaults"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Demo Records</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
