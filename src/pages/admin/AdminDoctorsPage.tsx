import React from 'react';
import { MOCK_USERS } from '../../data/mockData';

export const AdminDoctorsPage: React.FC = () => {
  const doctors = MOCK_USERS.filter(u => u.role === 'doctor');

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold font-serif text-slate-900">Registered Medical Faculty</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Practitioners credentialed for clinical case management at AIIA.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctors.map((d) => (
          <div key={d.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-center gap-4">
            <img src={d.avatar} alt={d.name} className="w-14 h-14 rounded-2xl object-cover border" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">{d.name}</h3>
              <p className="text-xs text-slate-500">{d.qualification}</p>
              <p className="text-[11px] text-emerald-800 font-mono font-semibold mt-1">
                {d.registrationNo} • {d.specialization}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
