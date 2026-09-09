import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  ShieldCheck, 
  Activity, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { DoctorVerification } from '../../types';
import { Badge } from '../../components/common/Badge';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [verifications, setVerifications] = useState<DoctorVerification[]>(storageService.getVerifications());
  const [selectedVer, setSelectedVer] = useState<DoctorVerification | null>(null);

  const pendingCount = verifications.filter(v => v.status === 'Pending').length;
  const approvedCount = verifications.filter(v => v.status === 'Approved').length;

  const handleApprove = (id: string) => {
    storageService.updateVerificationStatus(id, 'Approved', 'Approved by AIIA Administrative Academic Council.');
    setVerifications(storageService.getVerifications());
    setSelectedVer(null);
    alert('Practitioner credentials approved successfully!');
  };

  const handleReject = (id: string) => {
    storageService.updateVerificationStatus(id, 'Rejected', 'Insufficient registration proof.');
    setVerifications(storageService.getVerifications());
    setSelectedVer(null);
  };

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">AIIA Administrative & Oversight Authority</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Ministry of Ayush Practitioner Credentialing & Institutional Clinical Governance
          </p>
        </div>

        <span className="text-xs bg-amber-50 text-amber-900 px-3 py-1 rounded-full border border-amber-200 font-bold self-start">
          Admin Session • Council Member
        </span>
      </div>

      {/* Admin Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Doctors</span>
          <span className="text-xl font-bold text-slate-900 font-serif">142</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Verified Doctors</span>
          <span className="text-xl font-bold text-emerald-800 font-serif">{140 + approvedCount}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-[10px] text-amber-600 font-bold uppercase block">Pending Verification</span>
          <span className="text-xl font-bold text-amber-700 font-serif">{pendingCount}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Patients</span>
          <span className="text-xl font-bold text-slate-900 font-serif">1,248</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Active Cases</span>
          <span className="text-xl font-bold text-slate-900 font-serif">892</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Today Consults</span>
          <span className="text-xl font-bold text-slate-900 font-serif">48</span>
        </div>
      </div>

      {/* Doctor Verification Queue */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">Doctor Credential Verification Queue</h2>
            <p className="text-xs text-slate-500">Review council registration numbers and certificates prior to granting clinical access</p>
          </div>
          <span className="text-xs font-semibold text-emerald-800">{pendingCount} Action Required</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-3">Doctor</th>
                <th className="p-3">Council Reg No</th>
                <th className="p-3">Qualification</th>
                <th className="p-3">Submitted Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Review Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {verifications.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">
                    <div>{v.doctorName}</div>
                    <div className="text-[11px] text-slate-400 font-normal">{v.hospital}</div>
                  </td>
                  <td className="p-3 font-mono font-semibold">{v.regNumber}</td>
                  <td className="p-3">{v.qualification}</td>
                  <td className="p-3 text-slate-500">{v.submittedDate}</td>
                  <td className="p-3">
                    <Badge variant={v.status === 'Approved' ? 'green' : v.status === 'Pending' ? 'amber' : 'red'} size="sm">
                      {v.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedVer(v)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-[11px]"
                      >
                        Review Docs
                      </button>
                      {v.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(v.id)}
                            className="px-2.5 py-1 bg-[#1B4332] text-white hover:bg-[#143828] rounded-lg font-bold text-[11px]"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(v.id)}
                            className="px-2.5 py-1 text-rose-700 hover:bg-rose-50 rounded-lg text-[11px]"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Documents Modal */}
      {selectedVer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b pb-2">
              Credentials Dossier: {selectedVer.doctorName}
            </h3>

            <div className="space-y-2 text-xs">
              <div><span className="text-slate-400">Registration Number:</span> <strong className="font-mono">{selectedVer.regNumber}</strong></div>
              <div><span className="text-slate-400">Hospital:</span> <strong>{selectedVer.hospital}</strong></div>
              <div><span className="text-slate-400">Attached Certificate:</span> <strong className="text-emerald-800">{selectedVer.documents.regCertName}</strong></div>
              <div><span className="text-slate-400">Identity Document:</span> <strong className="text-emerald-800">{selectedVer.documents.idProofName}</strong></div>
              <div><span className="text-slate-400">Administrative Remarks:</span> <p className="text-slate-600 mt-0.5">{selectedVer.remarks}</p></div>
            </div>

            <div className="pt-4 border-t flex justify-end gap-2">
              <button
                onClick={() => setSelectedVer(null)}
                className="px-4 py-2 border rounded-xl text-xs font-semibold"
              >
                Close
              </button>
              {selectedVer.status === 'Pending' && (
                <button
                  onClick={() => handleApprove(selectedVer.id)}
                  className="px-4 py-2 bg-[#1B4332] text-white rounded-xl text-xs font-bold hover:bg-[#143828]"
                >
                  Approve Registration
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
