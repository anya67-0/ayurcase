import React from 'react';
import { storageService } from '../../services/storageService';
import { Badge } from '../../components/common/Badge';

export const AdminPatientsPage: React.FC = () => {
  const patients = storageService.getPatients();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold font-serif text-slate-900">Hospital Patient Master Index</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Master registry of patients registered across AIIA clinical OPD and IPD units.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-500">
              <tr>
                <th className="p-3">Patient ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">ABHA ID</th>
                <th className="p-3">Prakriti</th>
                <th className="p-3">Registered Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-emerald-900">{p.id}</td>
                  <td className="p-3 font-bold text-slate-900">{p.name}</td>
                  <td className="p-3 font-mono">{p.abhaId}</td>
                  <td className="p-3 font-semibold text-emerald-800">{p.prakriti}</td>
                  <td className="p-3 text-slate-500">{p.createdAt}</td>
                  <td className="p-3">
                    <Badge variant={p.status === 'Active' ? 'green' : 'amber'} size="sm">
                      {p.status}
                    </Badge>
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
