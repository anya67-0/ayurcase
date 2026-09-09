import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { DoctorVerification } from '../../types';
import { Badge } from '../../components/common/Badge';

export const AdminVerificationPage: React.FC = () => {
  const [verifications, setVerifications] = useState<DoctorVerification[]>(storageService.getVerifications());

  const handleApprove = (id: string) => {
    storageService.updateVerificationStatus(id, 'Approved', 'Verified by AIIA Academic Registrar.');
    setVerifications(storageService.getVerifications());
    alert('Practitioner registration approved!');
  };

  const handleReject = (id: string) => {
    storageService.updateVerificationStatus(id, 'Rejected', 'Document discrepancy detected.');
    setVerifications(storageService.getVerifications());
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold font-serif text-slate-900">Doctor Verification Desk</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Review practitioner degrees, state board registrations, and identity verification.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-500">
              <tr>
                <th className="p-3">Doctor</th>
                <th className="p-3">Medical Registration No</th>
                <th className="p-3">Qualification</th>
                <th className="p-3">Attached Documents</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {verifications.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">
                    <div>{v.doctorName}</div>
                    <div className="text-[11px] text-slate-400 font-normal">{v.hospital}</div>
                  </td>
                  <td className="p-3 font-mono">{v.regNumber}</td>
                  <td className="p-3">{v.qualification}</td>
                  <td className="p-3 text-emerald-800 font-medium">
                    {v.documents.regCertName}
                  </td>
                  <td className="p-3">
                    <Badge variant={v.status === 'Approved' ? 'green' : v.status === 'Pending' ? 'amber' : 'red'} size="sm">
                      {v.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">
                    {v.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleApprove(v.id)}
                          className="px-3 py-1 bg-[#1B4332] text-white rounded-lg text-xs font-bold hover:bg-[#143828]"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(v.id)}
                          className="px-3 py-1 text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-semibold"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
