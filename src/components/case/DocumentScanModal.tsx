import React, { useState } from 'react';
import { ScanLine, Upload, FileText, CheckCircle2, X, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApply: (data: any) => void;
}

export const DocumentScanModal: React.FC<Props> = ({ isOpen, onClose, onApply }) => {
  const [scanning, setScanning] = useState(false);
  const [scannedDone, setScannedDone] = useState(false);

  const [extractedInfo, setExtractedInfo] = useState({
    docType: 'Previous BAMS Prescription & Endoscopy Summary',
    doctor: 'Dr. S. K. Joshi (BAMS, MD - Ayur)',
    institution: 'Government Ayurvedic Hospital, Mandir Marg',
    dated: '14 May 2026',
    findings: 'Mild erythema in antrum and lower esophagus. Negative for active ulceration. Chronic Pittaja Amlapitta diagnosed.',
    medications: 'Avipattikar Churna 3g bd, Praval Pishti 250mg bd with honey'
  });

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScannedDone(true);
    }, 2000);
  };

  const handleSave = () => {
    onApply(extractedInfo);
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200'>
      <div className='bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative'>
        <button
          onClick={onClose}
          className='absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors'
        >
          <X className='w-5 h-5' />
        </button>

        <div className='flex items-center gap-2.5 pb-4 border-b border-slate-100'>
          <div className='w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center'>
            <ScanLine className='w-5 h-5' />
          </div>
          <div>
            <h2 className='text-base font-bold text-slate-900'>AyurOCR Document Scanner</h2>
            <p className='text-xs text-slate-500'>
              Digitize handwritten BAMS prescriptions, discharge summaries, and lab reports.
            </p>
          </div>
        </div>

        <div className='py-6'>
          {!scannedDone ? (
            <div className='flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-slate-50 hover:bg-slate-100/50 transition-colors'>
              {scanning ? (
                <div className='text-center'>
                  <div className='relative w-24 h-28 bg-white border border-slate-300 rounded-lg shadow-sm mx-auto flex items-center justify-center overflow-hidden mb-3'>
                    <FileText className='w-10 h-10 text-slate-400' />
                    <div className='absolute left-0 right-0 h-1 bg-emerald-500 shadow-[0_0_8px_#10B981] animate-bounce top-2' />
                  </div>
                  <p className='text-xs font-bold text-slate-800'>Processing Document via Optical Recognition...</p>
                  <p className='text-[11px] text-slate-500 mt-0.5'>Extracting medical nomenclature, dosage, and diagnostic notes</p>
                </div>
              ) : (
                <div className='text-center'>
                  <div className='w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-3'>
                    <Upload className='w-6 h-6' />
                  </div>
                  <p className='text-xs font-bold text-slate-800'>Upload Patient Document or Clinical Prescription</p>
                  <p className='text-[11px] text-slate-500 mt-1 max-w-sm'>
                    Supports PDF, JPG, PNG files. Click below to simulate instant OCR digitization.
                  </p>
                  <button
                    onClick={handleSimulateScan}
                    className='mt-4 bg-[#1B4332] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#143828] shadow-sm transition-all'
                  >
                    Scan Sample AIIA Prescription
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className='space-y-3'>
              <div className='flex items-center justify-between bg-emerald-50 text-emerald-900 px-3.5 py-2 rounded-xl border border-emerald-200'>
                <div className='flex items-center gap-2 text-xs font-bold'>
                  <CheckCircle2 className='w-4 h-4 text-emerald-700' />
                  <span>OCR Extraction Completed Successfully</span>
                </div>
                <button
                  onClick={() => setScannedDone(false)}
                  className='text-[11px] text-emerald-700 hover:underline font-medium'
                >
                  Scan Another
                </button>
              </div>

              <div className='grid grid-cols-2 gap-3 text-xs'>
                <div>
                  <label className='block text-[11px] font-bold text-slate-600 mb-1'>Document Category</label>
                  <input
                    type='text'
                    value={extractedInfo.docType}
                    onChange={(e) => setExtractedInfo({ ...extractedInfo, docType: e.target.value })}
                    className='w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium'
                  />
                </div>
                <div>
                  <label className='block text-[11px] font-bold text-slate-600 mb-1'>Attending Physician / Date</label>
                  <input
                    type='text'
                    value={extractedInfo.doctor + ' • ' + extractedInfo.dated}
                    onChange={(e) => setExtractedInfo({ ...extractedInfo, doctor: e.target.value })}
                    className='w-full p-2 bg-slate-50 border border-slate-200 rounded-lg'
                  />
                </div>
              </div>

              <div>
                <label className='block text-[11px] font-bold text-slate-600 mb-1'>Extracted Diagnostic Findings</label>
                <textarea
                  value={extractedInfo.findings}
                  onChange={(e) => setExtractedInfo({ ...extractedInfo, findings: e.target.value })}
                  rows={2}
                  className='w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg'
                />
              </div>

              <div>
                <label className='block text-[11px] font-bold text-slate-600 mb-1'>Recorded Ayurvedic Medications</label>
                <input
                  type='text'
                  value={extractedInfo.medications}
                  onChange={(e) => setExtractedInfo({ ...extractedInfo, medications: e.target.value })}
                  className='w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-medium'
                />
              </div>
            </div>
          )}
        </div>

        <div className='pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <div className='flex items-center gap-1.5 text-[11px] text-slate-500'>
            <AlertCircle className='w-3.5 h-3.5 text-amber-500 shrink-0' />
            <span>SIH Prototype Demonstration: Review parameters before attaching to Patient Record.</span>
          </div>

          <div className='flex items-center gap-2'>
            <button
              onClick={onClose}
              className='px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors'
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!scannedDone}
              className={'px-5 py-2 text-xs font-bold rounded-xl transition-all ' + (
                scannedDone
                  ? 'bg-[#1B4332] text-white hover:bg-[#143828] shadow-sm'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              )}
            >
              Attach to Patient File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
