import React, { useState } from 'react';
import { FileText, Printer, Download, ShieldCheck, Lock } from 'lucide-react';
import { storageService } from '../../services/storageService';
import { PrintCaseSheetModal } from '../../components/common/PrintCaseSheetModal';

export const PatientRecordsPage: React.FC = () => {
  const cases = storageService.getCases();
  const [selectedCase, setSelectedCase] = useState(cases[0]);
  const [printOpen, setPrintOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">Approved Medical Records</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified electronic case sheets issued by All India Institute of Ayurveda.
          </p>
        </div>
      </div>

      <div className="p-3 bg-amber-50 text-amber-900 rounded-xl border border-amber-200 text-xs flex items-center gap-2">
        <Lock className="w-4 h-4 text-amber-700 shrink-0" />
        <span>
          <strong>Patient Read-Only Notice:</strong> Clinical diagnoses, Ashtavidha observations, and prescription regimens entered by authorized medical practitioners cannot be modified.
        </span>
      </div>

      <div className="space-y-4">
        {cases.map((c) => (
          <div key={c.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">{c.diagnosis.ayurvedicDiagnosis.join(', ')}</h3>
                <p className="text-xs text-slate-500">Record ID: {c.id} • Date: {c.date} • {c.doctorName}</p>
              </div>

              <button
                onClick={() => { setSelectedCase(c); setPrintOpen(true); }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1B4332] text-white rounded-xl text-xs font-semibold hover:bg-[#143828] transition-colors self-start"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Copy</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2 bg-slate-50 rounded-lg"><span className="text-slate-400 block text-[10px]">Prakriti:</span> <strong>{c.prakriti.dominantPrakriti}</strong></div>
              <div className="p-2 bg-slate-50 rounded-lg"><span className="text-slate-400 block text-[10px]">Agni:</span> <strong>{c.agni}</strong></div>
              <div className="p-2 bg-slate-50 rounded-lg"><span className="text-slate-400 block text-[10px]">Koshtha:</span> <strong>{c.koshtha}</strong></div>
              <div className="p-2 bg-slate-50 rounded-lg"><span className="text-slate-400 block text-[10px]">Status:</span> <strong className="text-emerald-700">{c.status}</strong></div>
            </div>
          </div>
        ))}
      </div>

      <PrintCaseSheetModal
        caseSheet={selectedCase}
        isOpen={printOpen}
        onClose={() => setPrintOpen(false)}
      />
    </div>
  );
};
