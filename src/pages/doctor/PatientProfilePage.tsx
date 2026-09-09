import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FileSpreadsheet, 
  Printer, 
  Download, 
  Edit3, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  AlertCircle, 
  FileText,
  User,
  HeartPulse,
  ChevronRight
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { PrintCaseSheetModal } from '../../components/common/PrintCaseSheetModal';
import { Badge } from '../../components/common/Badge';

export const PatientProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const patient = storageService.getPatientById(id || 'AYU-2026-00125') || storageService.getPatients()[0];
  const patientCases = storageService.getCasesByPatientId(patient.id);
  const activeCase = patientCases[0] || storageService.getCases()[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'caseHistory' | 'ayurvedic' | 'investigations' | 'treatment' | 'documents' | 'visits'>('overview');
  const [printOpen, setPrintOpen] = useState(false);

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'caseHistory', label: 'Case History' },
    { key: 'ayurvedic', label: 'Ayurvedic Assessment' },
    { key: 'investigations', label: 'Investigations' },
    { key: 'treatment', label: 'Treatment Plan' },
    { key: 'documents', label: 'Documents & Lab' },
    { key: 'visits', label: 'Visit Timeline' },
  ];

  return (
    <div className='space-y-6'>
      {/* Patient Header Bar */}
      <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <div className='w-14 h-14 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xl font-serif shadow-sm'>
            {patient.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className='flex items-center gap-2.5'>
              <h1 className='text-2xl font-bold font-serif text-slate-900'>{patient.name}</h1>
              <Badge variant='green' size='sm'>
                {patient.status}
              </Badge>
            </div>
            <p className='text-xs text-slate-500 mt-0.5'>
              Patient ID: <span className='font-mono font-semibold text-slate-800'>{patient.id}</span> • {patient.age} years • {patient.gender} • Blood Group: {patient.bloodGroup}
            </p>
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          <button
            onClick={() => navigate('/doctor/case/new?patientId=' + patient.id)}
            className='flex items-center gap-1.5 bg-[#1B4332] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#143828] shadow-sm transition-all'
          >
            <FileSpreadsheet className='w-4 h-4' />
            <span>New Case Sheet</span>
          </button>
          <button
            onClick={() => setPrintOpen(true)}
            className='flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors'
          >
            <Printer className='w-4 h-4 text-slate-600' />
            <span>Print Case Sheet</span>
          </button>
          <button
            onClick={() => alert('Exporting electronic dossier for Ayush ABHA exchange...')}
            className='flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors'
          >
            <Download className='w-4 h-4 text-slate-600' />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Ayurvedic Diagnostic Biomarker Summary Cards */}
      <div className='grid grid-cols-2 sm:grid-cols-5 gap-3'>
        <div className='bg-white p-3.5 rounded-2xl border border-slate-200 shadow-soft text-center'>
          <span className='text-[10px] text-slate-400 font-bold uppercase tracking-wider block'>ABHA Status</span>
          <span className='inline-flex items-center gap-1 text-xs font-bold text-emerald-800 mt-1'>
            <ShieldCheck className='w-3.5 h-3.5 text-emerald-600' />
            {patient.abhaVerified ? 'Verified' : 'Pending'}
          </span>
        </div>
        <div className='bg-white p-3.5 rounded-2xl border border-slate-200 shadow-soft text-center'>
          <span className='text-[10px] text-slate-400 font-bold uppercase tracking-wider block'>Deha Prakriti</span>
          <span className='text-xs font-bold text-slate-900 mt-1 block'>{patient.prakriti}</span>
        </div>
        <div className='bg-white p-3.5 rounded-2xl border border-slate-200 shadow-soft text-center'>
          <span className='text-[10px] text-slate-400 font-bold uppercase tracking-wider block'>Vikriti State</span>
          <span className='text-xs font-bold text-amber-900 mt-1 block'>{patient.vikriti}</span>
        </div>
        <div className='bg-white p-3.5 rounded-2xl border border-slate-200 shadow-soft text-center'>
          <span className='text-[10px] text-slate-400 font-bold uppercase tracking-wider block'>Jatharagni</span>
          <span className='text-xs font-bold text-sky-900 mt-1 block'>{patient.agni}</span>
        </div>
        <div className='bg-white p-3.5 rounded-2xl border border-slate-200 shadow-soft text-center col-span-2 sm:col-span-1'>
          <span className='text-[10px] text-slate-400 font-bold uppercase tracking-wider block'>Koshtha</span>
          <span className='text-xs font-bold text-slate-900 mt-1 block'>{patient.koshtha}</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className='border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-semibold'>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={'pb-3 px-3 transition-colors border-b-2 whitespace-nowrap ' + (
              activeTab === tab.key
                ? 'border-[#1B4332] text-[#1B4332] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-xs'>
          <div className='bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-3'>
            <h3 className='text-sm font-bold text-slate-900 border-b pb-2'>Personal & Contact Information</h3>
            <div className='grid grid-cols-2 gap-2 text-slate-600'>
              <div><span className='text-slate-400 block'>Mobile:</span> <strong>{patient.mobile}</strong></div>
              <div><span className='text-slate-400 block'>Email:</span> <strong>{patient.email}</strong></div>
              <div><span className='text-slate-400 block'>Date of Birth:</span> <strong>{patient.dob}</strong></div>
              <div><span className='text-slate-400 block'>ABHA Number:</span> <strong className='font-mono'>{patient.abhaId}</strong></div>
              <div className='col-span-2'><span className='text-slate-400 block'>Residential Address:</span> <strong>{patient.address}</strong></div>
              <div className='col-span-2 pt-2 border-t'><span className='text-slate-400 block'>Emergency Contact:</span> <strong>{patient.emergencyContact.name} ({patient.emergencyContact.relationship}) • {patient.emergencyContact.phone}</strong></div>
            </div>
          </div>

          <div className='bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-3'>
            <h3 className='text-sm font-bold text-slate-900 border-b pb-2'>Medical & Clinical History</h3>
            <div className='space-y-2 text-slate-600'>
              <div><span className='text-slate-400 block'>Past Conditions:</span> <strong>{activeCase.medicalHistory.pastConditions.join(', ')}</strong></div>
              <div><span className='text-slate-400 block'>Known Allergies:</span> <strong className='text-rose-700'>{activeCase.medicalHistory.allergies}</strong></div>
              <div><span className='text-slate-400 block'>Current Medications:</span> <strong>{activeCase.medicalHistory.currentMedications}</strong></div>
              <div><span className='text-slate-400 block'>Family History:</span> <strong>{activeCase.medicalHistory.familyHistory}</strong></div>
              <div><span className='text-slate-400 block'>Lifestyle / Occupational Stress:</span> <strong>{activeCase.medicalHistory.lifestyleHistory}</strong></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'caseHistory' && (
        <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4'>
          <div className='flex items-center justify-between border-b pb-3'>
            <div>
              <h3 className='text-sm font-bold text-slate-900'>Chief Complaints Recorded</h3>
              <p className='text-xs text-slate-500'>Case ID: {activeCase.id} • Attending: {activeCase.doctorName}</p>
            </div>
            <Badge variant='green' size='sm'>{activeCase.status}</Badge>
          </div>

          <div className='space-y-3 text-xs'>
            {activeCase.complaints.map((c, i) => (
              <div key={i} className='p-3.5 bg-slate-50 rounded-xl border border-slate-200'>
                <div className='flex justify-between items-start'>
                  <strong className='text-slate-900 text-sm'>{c.complaint}</strong>
                  <span className='bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold text-[10px]'>
                    Severity: {c.severity}/10 ({c.onset})
                  </span>
                </div>
                <p className='text-slate-500 mt-1'>Duration: {c.duration}</p>
                <p className='text-slate-600 mt-1'>Associated symptoms: {c.associatedSymptoms.join(' • ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'ayurvedic' && (
        <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-6 text-xs'>
          <h3 className='text-sm font-bold text-slate-900 border-b pb-2'>Eightfold Clinical Examination (Ashtavidha Pariksha)</h3>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
            <div className='p-3 bg-slate-50 rounded-xl border border-slate-200'>
              <span className='text-[10px] text-slate-400 font-bold uppercase'>Nadi (Pulse)</span>
              <p className='font-bold text-slate-800 mt-0.5'>{activeCase.examination.ashtavidha.nadi}</p>
            </div>
            <div className='p-3 bg-slate-50 rounded-xl border border-slate-200'>
              <span className='text-[10px] text-slate-400 font-bold uppercase'>Jihva (Tongue)</span>
              <p className='font-bold text-slate-800 mt-0.5'>{activeCase.examination.ashtavidha.jihva}</p>
            </div>
            <div className='p-3 bg-slate-50 rounded-xl border border-slate-200'>
              <span className='text-[10px] text-slate-400 font-bold uppercase'>Mala (Stool)</span>
              <p className='font-bold text-slate-800 mt-0.5'>{activeCase.examination.ashtavidha.mala}</p>
            </div>
            <div className='p-3 bg-slate-50 rounded-xl border border-slate-200'>
              <span className='text-[10px] text-slate-400 font-bold uppercase'>Mutra (Urine)</span>
              <p className='font-bold text-slate-800 mt-0.5'>{activeCase.examination.ashtavidha.mutra}</p>
            </div>
            <div className='p-3 bg-slate-50 rounded-xl border border-slate-200'>
              <span className='text-[10px] text-slate-400 font-bold uppercase'>Shabda (Voice)</span>
              <p className='font-bold text-slate-800 mt-0.5'>{activeCase.examination.ashtavidha.shabda}</p>
            </div>
            <div className='p-3 bg-slate-50 rounded-xl border border-slate-200'>
              <span className='text-[10px] text-slate-400 font-bold uppercase'>Sparsha (Touch)</span>
              <p className='font-bold text-slate-800 mt-0.5'>{activeCase.examination.ashtavidha.sparsha}</p>
            </div>
            <div className='p-3 bg-slate-50 rounded-xl border border-slate-200'>
              <span className='text-[10px] text-slate-400 font-bold uppercase'>Druk (Eyes)</span>
              <p className='font-bold text-slate-800 mt-0.5'>{activeCase.examination.ashtavidha.druk}</p>
            </div>
            <div className='p-3 bg-slate-50 rounded-xl border border-slate-200'>
              <span className='text-[10px] text-slate-400 font-bold uppercase'>Akruti (Build)</span>
              <p className='font-bold text-slate-800 mt-0.5'>{activeCase.examination.ashtavidha.akruti}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'treatment' && (
        <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4'>
          <h3 className='text-sm font-bold text-slate-900 border-b pb-2'>Prescribed Herbal Regimen</h3>
          <div className='overflow-x-auto'>
            <table className='w-full text-xs text-left'>
              <thead className='bg-slate-50 text-[10px] uppercase text-slate-500 font-bold'>
                <tr>
                  <th className='p-2.5'>Medication</th>
                  <th className='p-2.5'>Dosage</th>
                  <th className='p-2.5'>Frequency</th>
                  <th className='p-2.5'>Duration</th>
                  <th className='p-2.5'>Anupana / Vehicle</th>
                  <th className='p-2.5'>Instructions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100'>
                {activeCase.treatment.medications.map((m, i) => (
                  <tr key={i}>
                    <td className='p-2.5 font-bold text-slate-900'>{m.medicine}</td>
                    <td className='p-2.5'>{m.dosage}</td>
                    <td className='p-2.5'>{m.frequency}</td>
                    <td className='p-2.5'>{m.duration}</td>
                    <td className='p-2.5 italic text-emerald-800'>{m.anupana || 'Lukewarm Water'}</td>
                    <td className='p-2.5 text-slate-500'>{m.instructions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'investigations' && (
        <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-soft text-xs space-y-3'>
          <h3 className='text-sm font-bold text-slate-900 border-b pb-2'>Laboratory & Diagnostic Investigations</h3>
          <p className='text-slate-600'>• Upper GI Endoscopy (May 2026): Antral erythema, negative for active H. pylori or ulcer.</p>
          <p className='text-slate-600'>• Hemogram (CBC): Hb 14.2 g/dL, TLC 7,800 /uL, ESR 12 mm/hr (Within normal limits).</p>
          <p className='text-slate-600'>• Liver Function Test (LFT): SGOT 26 U/L, SGPT 31 U/L, Serum Bilirubin 0.8 mg/dL.</p>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-soft text-xs space-y-3'>
          <h3 className='text-sm font-bold text-slate-900 border-b pb-2'>Uploaded Diagnostic Documents</h3>
          <div className='p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <FileText className='w-4 h-4 text-emerald-700' />
              <div>
                <p className='font-bold text-slate-800'>previous_bams_prescription_aiia.pdf</p>
                <p className='text-[10px] text-slate-400'>Uploaded 08 Sep 2026 • Verified OCR</p>
              </div>
            </div>
            <button
              onClick={() => alert('Viewing document attachment...')}
              className='text-emerald-700 font-semibold hover:underline'
            >
              View Document
            </button>
          </div>
        </div>
      )}

      {activeTab === 'visits' && (
        <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4'>
          <h3 className='text-sm font-bold text-slate-900 border-b pb-2'>Clinical Visit Timeline</h3>
          <div className='space-y-4 max-w-md'>
            <div className='flex items-start gap-3'>
              <div className='w-2.5 h-2.5 rounded-full bg-emerald-600 mt-1' />
              <div>
                <strong className='text-slate-900 text-xs'>08 Sep 2026 — Comprehensive Follow-up</strong>
                <p className='text-[11px] text-slate-500'>Dr. Ananya Sharma • Avipattikar Churna renewed, Takradhara initiated.</p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <div className='w-2.5 h-2.5 rounded-full bg-slate-400 mt-1' />
              <div>
                <strong className='text-slate-900 text-xs'>15 Aug 2026 — Follow-up Consultation</strong>
                <p className='text-[11px] text-slate-500'>Dr. Ananya Sharma • Acidity decreased from 9/10 to 7/10 severity.</p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <div className='w-2.5 h-2.5 rounded-full bg-slate-300 mt-1' />
              <div>
                <strong className='text-slate-900 text-xs'>20 Jul 2026 — Initial OPD Case Intake</strong>
                <p className='text-[11px] text-slate-500'>Primary registration and full 14-step case sheet capture.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print Case Sheet Modal */}
      <PrintCaseSheetModal
        caseSheet={activeCase}
        isOpen={printOpen}
        onClose={() => setPrintOpen(false)}
      />
    </div>
  );
};
