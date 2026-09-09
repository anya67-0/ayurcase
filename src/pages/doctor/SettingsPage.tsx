import React from 'react';
import { User, ShieldCheck, Lock, Bell, CheckCircle2 } from 'lucide-react';
import { authService } from '../../services/authService';

export const SettingsPage: React.FC = () => {
  const user = authService.getCurrentUser();

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold font-serif text-slate-900">Settings & Security</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Practitioner credentials, cryptographic session keys, and institutional preferences
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Medical Practitioner Profile</h3>
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
          />
          <div>
            <h4 className="text-base font-bold text-slate-900">{user.name}</h4>
            <p className="text-slate-500">{user.qualification}</p>
            <span className="inline-block mt-1 font-mono text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Registration No: {user.registrationNo || 'AYU-2026-001'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 text-slate-600">
          <div><span className="text-slate-400 block">Institution:</span> <strong>{user.hospital || 'AIIA, New Delhi'}</strong></div>
          <div><span className="text-slate-400 block">Specialization:</span> <strong>{user.specialization || 'Kayachikitsa'}</strong></div>
          <div><span className="text-slate-400 block">Email Address:</span> <strong>{user.email}</strong></div>
          <div><span className="text-slate-400 block">Contact Phone:</span> <strong>{user.phone || '+91 98765 43210'}</strong></div>
        </div>
      </div>

      {/* Security & Audit Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Security & Access Management</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <p className="font-bold text-slate-800">Two-Factor Authentication (2FA)</p>
              <p className="text-slate-500 text-[11px]">Protected via ABDM Aadhaar OTP gateway</p>
            </div>
            <span className="text-emerald-700 font-bold bg-emerald-100/60 px-2 py-0.5 rounded text-[11px]">Active</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <p className="font-bold text-slate-800">Audit Trail Logging</p>
              <p className="text-slate-500 text-[11px]">Every case modification cryptographically timestamped</p>
            </div>
            <span className="text-emerald-700 font-bold bg-emerald-100/60 px-2 py-0.5 rounded text-[11px]">Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};
