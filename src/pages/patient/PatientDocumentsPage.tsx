import React from 'react';
import { Upload, FileText, CheckCircle2 } from 'lucide-react';

export const PatientDocumentsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold font-serif text-slate-900">My Health Documents & Lab Reports</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Secure document repository connected with your ABHA ID.
        </p>
      </div>

      <div className="p-6 bg-white rounded-2xl border-2 border-dashed border-slate-200 text-center space-y-2 hover:bg-slate-50 transition-colors cursor-pointer">
        <Upload className="w-8 h-8 text-emerald-700 mx-auto" />
        <h3 className="text-sm font-bold text-slate-900">Upload Medical File (PDF / Images)</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Upload outside diagnostic reports or previous Ayurvedic prescriptions for clinical review.
        </p>
      </div>

      <div className="space-y-3 text-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Uploaded Files</h3>
        <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-emerald-700" />
            <div>
              <p className="font-bold text-slate-800">upper_gi_endoscopy_report_may2026.pdf</p>
              <p className="text-[10px] text-slate-400">Attached to Case CASE-2026-00042</p>
            </div>
          </div>
          <button onClick={() => alert('Viewing document')} className="text-emerald-800 font-bold hover:underline">
            View
          </button>
        </div>
      </div>
    </div>
  );
};
