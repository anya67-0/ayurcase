import React, { useState } from 'react';
import { ScanLine, Upload, FileText } from 'lucide-react';
import { DocumentScanModal } from '../../components/case/DocumentScanModal';

export const DocumentScanPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold font-serif text-slate-900">Scan Patient Documents</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Optical Character Recognition (OCR) for handwritten Ayurvedic prescriptions, lab investigations, and discharge summaries.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          onClick={() => setModalOpen(true)}
          className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-soft cursor-pointer transition-all text-center space-y-2 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
            <ScanLine className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Scan Prescription Slip</h3>
          <p className="text-[11px] text-slate-500">Digitize handwritten BAMS formulas and dosage</p>
        </div>

        <div
          onClick={() => setModalOpen(true)}
          className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-soft cursor-pointer transition-all text-center space-y-2 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-800 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Upload Lab Report</h3>
          <p className="text-[11px] text-slate-500">Extract Hemogram, LFT, KFT, and Lipid levels</p>
        </div>

        <div
          onClick={() => setModalOpen(true)}
          className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-soft cursor-pointer transition-all text-center space-y-2 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Previous Case Sheet</h3>
          <p className="text-[11px] text-slate-500">Parse legacy historical records from other Ayush centers</p>
        </div>
      </div>

      <DocumentScanModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onApply={(data) => {
          alert('Document OCR successfully attached to patient file.');
        }}
      />
    </div>
  );
};
