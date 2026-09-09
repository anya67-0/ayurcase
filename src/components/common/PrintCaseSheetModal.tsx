import React from 'react';
import { CaseSheet } from '../../types';
import { Printer, X, HeartPulse } from 'lucide-react';

interface Props {
  caseSheet: CaseSheet;
  isOpen: boolean;
  onClose: () => void;
}

export const PrintCaseSheetModal: React.FC<Props> = ({ caseSheet, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto no-print'>
      <div className='bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl border border-slate-200 relative my-8 print:p-0 print:border-none print:shadow-none'>
        <div className='flex items-center justify-between pb-4 border-b border-slate-200 mb-6 no-print'>
          <div className='flex items-center gap-2'>
            <span className='text-xs font-bold uppercase tracking-wider text-slate-500'>Official Document Preview</span>
            <span className='bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full'>AIIA Verified</span>
          </div>

          <div className='flex items-center gap-2'>
            <button
              onClick={handlePrint}
              className='flex items-center gap-1.5 bg-[#1B4332] text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold hover:bg-[#143828] transition-colors'
            >
              <Printer className='w-4 h-4' />
              <span>Print Official Case Sheet</span>
            </button>
            <button
              onClick={onClose}
              className='p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors'
            >
              <X className='w-5 h-5' />
            </button>
          </div>
        </div>

        <div className='space-y-6 text-slate-900'>
          <div className='border-b-2 border-emerald-800 pb-4 text-center'>
            <div className='flex items-center justify-center gap-3 mb-1'>
              <div className='w-10 h-10 rounded-xl bg-[#1B4332] text-white flex items-center justify-center'>
                <HeartPulse className='w-6 h-6' />
              </div>
              <div className='text-left'>
                <h1 className='text-lg font-bold font-serif text-[#1B4332] uppercase tracking-wide'>
                  All India Institute of Ayurveda (AIIA)
                </h1>
                <p className='text-[11px] text-slate-600 font-medium'>
                  Ministry of Ayush, Government of India • Gautampuri, Sarita Vihar, New Delhi - 110076
                </p>
              </div>
            </div>
            <div className='mt-2 text-xs font-bold tracking-wider text-slate-800 uppercase bg-slate-100 py-1 rounded'>
              Clinical Department of Kayachikitsa & Panchakarma — Digital Case Record
            </div>
          </div>

          <div className='grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs'>
            <div>
              <p className='text-[10px] text-slate-500 font-bold uppercase'>Patient Name</p>
              <p className='font-bold text-slate-900'>{caseSheet.patientName}</p>
              <p className='text-[11px] text-slate-500'>ID: {caseSheet.patientId}</p>
            </div>
            <div>
              <p className='text-[10px] text-slate-500 font-bold uppercase'>Consulting Physician</p>
              <p className='font-bold text-slate-900'>{caseSheet.doctorName}</p>
              <p className='text-[11px] text-slate-500'>Reg: AYU-2026-001</p>
            </div>
            <div>
              <p className='text-[10px] text-slate-500 font-bold uppercase'>Case Record ID / Date</p>
              <p className='font-bold text-slate-900'>{caseSheet.id}</p>
              <p className='text-[11px] text-slate-500'>{caseSheet.date}</p>
            </div>
          </div>

          <div className='grid grid-cols-4 gap-2 text-center text-xs'>
            <div className='p-2 border border-slate-200 rounded-lg bg-emerald-50/40'>
              <span className='text-[10px] text-slate-500 block font-semibold'>Prakriti</span>
              <span className='font-bold text-emerald-950'>{caseSheet.prakriti.dominantPrakriti}</span>
            </div>
            <div className='p-2 border border-slate-200 rounded-lg bg-amber-50/40'>
              <span className='text-[10px] text-slate-500 block font-semibold'>Vikriti</span>
              <span className='font-bold text-amber-950'>{caseSheet.vikriti.observedImbalance.substring(0, 20)}...</span>
            </div>
            <div className='p-2 border border-slate-200 rounded-lg bg-sky-50/40'>
              <span className='text-[10px] text-slate-500 block font-semibold'>Agni</span>
              <span className='font-bold text-sky-950'>{caseSheet.agni}</span>
            </div>
            <div className='p-2 border border-slate-200 rounded-lg bg-slate-50'>
              <span className='text-[10px] text-slate-500 block font-semibold'>Koshtha</span>
              <span className='font-bold text-slate-900'>{caseSheet.koshtha}</span>
            </div>
          </div>

          <div>
            <h3 className='text-xs font-bold uppercase tracking-wider text-[#1B4332] border-b pb-1 mb-2'>
              1. Chief Complaints (Pradhana Vedana)
            </h3>
            <div className='space-y-1 text-xs'>
              {caseSheet.complaints.map((c, i) => (
                <div key={i} className='flex items-start justify-between'>
                  <p>• <strong>{c.complaint}</strong> ({c.duration}, Severity: {c.severity}/10)</p>
                  <span className='text-slate-500 text-[11px]'>{c.associatedSymptoms.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className='text-xs font-bold uppercase tracking-wider text-[#1B4332] border-b pb-1 mb-2'>
              2. Ashtavidha Pariksha (Eightfold Diagnostic Examination)
            </h3>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-700'>
              <div><strong>Nadi (Pulse):</strong> {caseSheet.examination.ashtavidha.nadi}</div>
              <div><strong>Mutra (Urine):</strong> {caseSheet.examination.ashtavidha.mutra}</div>
              <div><strong>Mala (Feces):</strong> {caseSheet.examination.ashtavidha.mala}</div>
              <div><strong>Jihva (Tongue):</strong> {caseSheet.examination.ashtavidha.jihva}</div>
              <div><strong>Shabda (Voice):</strong> {caseSheet.examination.ashtavidha.shabda}</div>
              <div><strong>Sparsha (Skin):</strong> {caseSheet.examination.ashtavidha.sparsha}</div>
              <div><strong>Druk (Eyes):</strong> {caseSheet.examination.ashtavidha.druk}</div>
              <div><strong>Akruti (Build):</strong> {caseSheet.examination.ashtavidha.akruti}</div>
            </div>
          </div>

          <div>
            <h3 className='text-xs font-bold uppercase tracking-wider text-[#1B4332] border-b pb-1 mb-2'>
              3. Diagnostic Assessment (Roga & Nidanatmaka Nirnaya)
            </h3>
            <div className='grid grid-cols-2 gap-3 text-xs'>
              <div>
                <p className='font-semibold text-slate-700'>Ayurvedic Diagnosis:</p>
                <p className='text-emerald-900 font-bold'>{caseSheet.diagnosis.ayurvedicDiagnosis.join(', ')}</p>
              </div>
              <div>
                <p className='font-semibold text-slate-700'>Modern Clinical ICD Correlation:</p>
                <p className='text-slate-900'>{caseSheet.diagnosis.clinicalDiagnosis.join(', ')}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className='text-xs font-bold uppercase tracking-wider text-[#1B4332] border-b pb-1 mb-2'>
              4. Chikitsa Yojana & Prescription (Aushadhi)
            </h3>
            <table className='w-full text-xs text-left border border-slate-200'>
              <thead className='bg-slate-100 text-[10px] uppercase font-bold text-slate-700'>
                <tr>
                  <th className='p-2 border-b'>Medicine / Form</th>
                  <th className='p-2 border-b'>Dosage</th>
                  <th className='p-2 border-b'>Frequency</th>
                  <th className='p-2 border-b'>Duration</th>
                  <th className='p-2 border-b'>Anupana / Vehicle</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {caseSheet.treatment.medications.map((m, i) => (
                  <tr key={i} className='hover:bg-slate-50'>
                    <td className='p-2 font-bold text-slate-900'>{m.medicine}</td>
                    <td className='p-2'>{m.dosage}</td>
                    <td className='p-2'>{m.frequency}</td>
                    <td className='p-2'>{m.duration}</td>
                    <td className='p-2 italic text-emerald-800'>{m.anupana || 'Lukewarm Water'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200'>
            <div>
              <p className='font-bold text-emerald-900 uppercase text-[10px]'>Pathya (Advised Wholesome Diet)</p>
              <p className='text-slate-700 mt-1'>{caseSheet.treatment.dietPathya.join(' • ')}</p>
            </div>
            <div>
              <p className='font-bold text-rose-900 uppercase text-[10px]'>Apathya (Strictly Avoid)</p>
              <p className='text-slate-700 mt-1'>{caseSheet.treatment.dietApathya.join(' • ')}</p>
            </div>
          </div>

          <div className='pt-8 flex items-end justify-between text-xs text-slate-600 border-t border-slate-200 mt-6'>
            <div className='text-[10px] text-slate-400'>
              <p>AyurCase Digital Record • Hash: {caseSheet.id}-VERIFIED</p>
              <p>Generated according to Ministry of Ayush Electronic Health Record Standards.</p>
            </div>

            <div className='text-right'>
              <div className='w-36 border-b border-slate-400 mb-1' />
              <p className='font-bold text-slate-900'>{caseSheet.doctorName}</p>
              <p className='text-[10px] text-slate-500'>Authorized Medical Officer, AIIA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
