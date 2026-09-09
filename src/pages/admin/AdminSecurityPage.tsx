import React from 'react';
import { ShieldCheck, Lock, Activity, Eye } from 'lucide-react';
import { storageService } from '../../services/storageService';

export const AdminSecurityPage: React.FC = () => {
  const auditLogs = storageService.getAuditLogs();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold font-serif text-slate-900">Security & Audit Logs</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          EHR cryptographic audit trail compliant with Ministry of Ayush / ABDM security standards.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-soft">
          <p className="text-xs font-bold text-slate-400 uppercase">Role-Based Access</p>
          <p className="text-sm font-bold text-emerald-800 mt-1">✓ Active & Enforced</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-soft">
          <p className="text-xs font-bold text-slate-400 uppercase">ABDM Consent Engine</p>
          <p className="text-sm font-bold text-emerald-800 mt-1">✓ Cryptographically Signed</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-soft">
          <p className="text-xs font-bold text-slate-400 uppercase">Data Encryption</p>
          <p className="text-sm font-bold text-emerald-800 mt-1">✓ AES-256 At Rest</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Live System Access Logs</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-500">
              <tr>
                <th className="p-2.5">Timestamp</th>
                <th className="p-2.5">User</th>
                <th className="p-2.5">Role</th>
                <th className="p-2.5">Action</th>
                <th className="p-2.5">Resource Target</th>
                <th className="p-2.5">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {auditLogs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50">
                  <td className="p-2.5 text-slate-500">{l.timestamp}</td>
                  <td className="p-2.5 font-sans font-bold text-slate-900">{l.user}</td>
                  <td className="p-2.5 font-sans">{l.role}</td>
                  <td className="p-2.5 text-emerald-800 font-bold">{l.action}</td>
                  <td className="p-2.5 font-sans text-slate-700">{l.resource}</td>
                  <td className="p-2.5 text-slate-400">{l.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
