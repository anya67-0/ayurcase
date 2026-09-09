import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Clock, 
  Printer, 
  Sparkles, 
  Plus, 
  Trash2, 
  AlertCircle,
  FileSpreadsheet,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { authService } from '../../services/authService';
import { CaseSheet, Patient, ChiefComplaint, NidanaItem } from '../../types';
import { PrakritiAssessmentChart } from '../../components/case/PrakritiAssessmentChart';
import { SampraptiFlow } from '../../components/case/SampraptiFlow';
import { AgniKoshthaSelector } from '../../components/case/AgniKoshthaSelector';
import { PrintCaseSheetModal } from '../../components/common/PrintCaseSheetModal';

export const CaseWizardPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const patientIdParam = searchParams.get('patientId') || 'AYU-2026-00125';
  const voiceParam = searchParams.get('voice');

  const patients = storageService.getPatients();
  const selectedPatient = patients.find(p => p.id === patientIdParam) || patients[0];
  const doctor = authService.getCurrentUser();

  const [currentStep, setCurrentStep] = useState(1);
  const [autosaveTime, setAutosaveTime] = useState('Draft saved just now');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [printOpen, setPrintOpen] = useState(false);

  // Initialize Case Sheet State
  const defaultCase = storageService.getCases()[0];
  const [caseData, setCaseData] = useState<CaseSheet>({
    ...defaultCase,
    id: 'CASE-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
    patientId: selectedPatient.id,
    patientName: selectedPatient.name,
    doctorId: doctor.id,
    doctorName: doctor.name,
    date: new Date().toISOString().split('T')[0],
    status: 'Draft',
    autosaveTimestamp: new Date().toISOString()
  });

  // Handle voice parameter injection if redirected from Voice Case
  useEffect(() => {
    if (voiceParam) {
      try {
        const vData = JSON.parse(decodeURIComponent(voiceParam));
        setCaseData(prev => ({
          ...prev,
          complaints: [
            {
              id: 'cmp-voice',
              complaint: vData.complaint || prev.complaints[0].complaint,
              duration: vData.duration || '3 months',
              severity: vData.severity || 7,
              onset: 'Gradual',
              associatedSymptoms: ['Heartburn', 'Irregular digestion']
            }
          ]
        }));
      } catch (e) {
        console.error('Failed to parse voice param', e);
      }
    }
  }, [voiceParam]);

  // Autosave timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setAutosaveTime('Draft saved 10 seconds ago');
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { num: 1, title: 'Patient Profile', short: 'Patient' },
    { num: 2, title: 'Chief Complaints', short: 'Complaints' },
    { num: 3, title: 'Medical History', short: 'History' },
    { num: 4, title: 'Ahara-Vihara (Lifestyle)', short: 'Ahara-Vihara' },
    { num: 5, title: 'Deha Prakriti Assessment', short: 'Prakriti' },
    { num: 6, title: 'Vikriti Assessment', short: 'Vikriti' },
    { num: 7, title: 'Agni Pariksha', short: 'Agni' },
    { num: 8, title: 'Koshtha Pariksha', short: 'Koshtha' },
    { num: 9, title: 'Nidana (Etiology)', short: 'Nidana' },
    { num: 10, title: 'Samprapti Ghataka', short: 'Samprapti' },
    { num: 11, title: 'Clinical Examination', short: 'Examination' },
    { num: 12, title: 'Diagnostic Assessment', short: 'Diagnosis' },
    { num: 13, title: 'Treatment & Aushadhi', short: 'Treatment' },
    { num: 14, title: 'Review & Submit', short: 'Review' },
  ];

  const handleNext = () => {
    if (currentStep < 14) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSaveDraft = () => {
    storageService.saveCase({ ...caseData, status: 'Draft' });
    setAutosaveTime('Draft saved manually just now');
    alert('Clinical case draft saved successfully.');
  };

  const handleFinalSubmit = () => {
    const finalSheet: CaseSheet = {
      ...caseData,
      status: 'Finalized',
      autosaveTimestamp: new Date().toISOString()
    };
    storageService.saveCase(finalSheet);
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
    setSavedSuccess(true);
  };

  // Chief complaints handlers
  const handleAddComplaint = () => {
    const newCmp: ChiefComplaint = {
      id: 'cmp-' + Date.now(),
      complaint: '',
      duration: '1 month',
      severity: 5,
      onset: 'Gradual',
      associatedSymptoms: []
    };
    setCaseData({ ...caseData, complaints: [...caseData.complaints, newCmp] });
  };

  const handleRemoveComplaint = (id: string) => {
    setCaseData({ ...caseData, complaints: caseData.complaints.filter(c => c.id !== id) });
  };

  // Nidana handlers
  const handleAddNidana = () => {
    const newNid: NidanaItem = {
      id: 'nid-' + Date.now(),
      category: 'Ahara',
      description: 'Newly recorded etiological factor'
    };
    setCaseData({ ...caseData, nidana: [...caseData.nidana, newNid] });
  };

  // Medication handlers
  const handleAddMedication = () => {
    const newMed = {
      id: 'med-' + Date.now(),
      medicine: '',
      dosage: '3 grams',
      frequency: 'Twice daily',
      duration: '14 days',
      instructions: 'Take after principal meals with warm water.',
      anupana: 'Warm Water'
    };
    setCaseData({
      ...caseData,
      treatment: {
        ...caseData.treatment,
        medications: [...caseData.treatment.medications, newMed]
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Bar with Patient & Autosave */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold font-serif text-slate-900">Digital Ayurvedic Case Sheet</h1>
            <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              AIIA Kayachikitsa
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Patient: <strong className="text-slate-900">{selectedPatient.name}</strong> ({selectedPatient.id} • {selectedPatient.age}y {selectedPatient.gender})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>{autosaveTime}</span>
          </span>
          <button
            type="button"
            onClick={handleSaveDraft}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>
        </div>
      </div>

      {savedSuccess ? (
        /* Case Successfully Saved Banner */
        <div className="bg-white rounded-3xl p-10 shadow-card border border-emerald-200 text-center space-y-4 max-w-2xl mx-auto animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-bold font-serif text-slate-900">
            Ayurvedic Case Sheet Successfully Saved!
          </h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            The clinical record has been signed and archived to the patient's longitudinal EHR under Ministry of Ayush standards.
          </p>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2 max-w-sm mx-auto">
            <div className="flex justify-between"><span className="text-slate-500">Patient:</span> <strong className="text-slate-800">{caseData.patientName}</strong></div>
            <div className="flex justify-between"><span className="text-slate-500">Patient ID:</span> <strong className="text-slate-800 font-mono">{caseData.patientId}</strong></div>
            <div className="flex justify-between"><span className="text-slate-500">Case Record ID:</span> <strong className="text-slate-800 font-mono">{caseData.id}</strong></div>
            <div className="flex justify-between"><span className="text-slate-500">Consulting Physician:</span> <strong className="text-slate-800">{caseData.doctorName}</strong></div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/doctor/patients/' + caseData.patientId)}
              className="px-5 py-2.5 bg-[#1B4332] text-white rounded-xl text-xs font-bold hover:bg-[#143828] transition-colors shadow-sm"
            >
              View Patient Record
            </button>
            <button
              onClick={() => setPrintOpen(true)}
              className="px-5 py-2.5 bg-white border border-slate-300 text-slate-800 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-emerald-700" />
              <span>Print Official Case Sheet</span>
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
            >
              Start Another Case
            </button>
          </div>
        </div>
      ) : (
        /* Main Stepper Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Stepper on Desktop */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-soft sticky top-20 max-h-[80vh] overflow-y-auto">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
                Clinical Workflow Steps
              </h3>
              <div className="space-y-1">
                {steps.map((s) => {
                  const isActive = currentStep === s.num;
                  const isDone = currentStep > s.num;
                  return (
                    <button
                      key={s.num}
                      onClick={() => setCurrentStep(s.num)}
                      className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-xs text-left transition-all ${
                        isActive
                          ? 'bg-[#1B4332] text-white font-bold shadow-xs'
                          : isDone
                          ? 'text-emerald-900 hover:bg-emerald-50 font-semibold'
                          : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                        isActive
                          ? 'bg-white text-emerald-900'
                          : isDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {isDone ? '✓' : s.num}
                      </span>
                      <span className="truncate">{s.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Main Content Panel */}
          <div className="lg:col-span-9 space-y-6">
            {/* STEP 1: Patient Confirmation */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-4 text-xs">
                <h3 className="text-base font-bold text-slate-900 border-b pb-2">Step 1: Patient Demographics Confirmation</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div><span className="text-slate-400 block">Patient Name:</span> <strong className="text-slate-900 text-sm">{selectedPatient.name}</strong></div>
                  <div><span className="text-slate-400 block">Patient ID:</span> <strong className="font-mono">{selectedPatient.id}</strong></div>
                  <div><span className="text-slate-400 block">Age / Gender:</span> <strong>{selectedPatient.age} yrs • {selectedPatient.gender}</strong></div>
                  <div><span className="text-slate-400 block">ABHA ID:</span> <strong className="font-mono">{selectedPatient.abhaId}</strong></div>
                  <div><span className="text-slate-400 block">Contact Phone:</span> <strong>{selectedPatient.mobile}</strong></div>
                  <div><span className="text-slate-400 block">Blood Group:</span> <strong>{selectedPatient.bloodGroup}</strong></div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <span>Patient identity and active ABHA consent confirmed for today's clinical case taking.</span>
                </div>
              </div>
            )}

            {/* STEP 2: Chief Complaints */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-4 text-xs">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Step 2: Chief Complaints (Pradhana Vedana)</h3>
                    <p className="text-slate-500">Structured recording of symptom onset, duration, and pain score.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddComplaint}
                    className="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl font-bold hover:bg-emerald-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Complaint</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {caseData.complaints.map((c, idx) => (
                    <div key={c.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 relative">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-800">Complaint #{idx + 1}</span>
                        {caseData.complaints.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveComplaint(c.id)}
                            className="text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-6">
                          <label className="block font-semibold text-slate-700 mb-1">Primary Complaint</label>
                          <input
                            type="text"
                            value={c.complaint}
                            onChange={(e) => {
                              const updated = [...caseData.complaints];
                              updated[idx].complaint = e.target.value;
                              setCaseData({ ...caseData, complaints: updated });
                            }}
                            placeholder="e.g. Acidity and retrosternal burning sensation"
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                          <input
                            type="text"
                            value={c.duration}
                            onChange={(e) => {
                              const updated = [...caseData.complaints];
                              updated[idx].duration = e.target.value;
                              setCaseData({ ...caseData, complaints: updated });
                            }}
                            placeholder="e.g. 3 months"
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block font-semibold text-slate-700 mb-1">Onset</label>
                          <select
                            value={c.onset}
                            onChange={(e) => {
                              const updated = [...caseData.complaints];
                              updated[idx].onset = e.target.value as any;
                              setCaseData({ ...caseData, complaints: updated });
                            }}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                          >
                            <option value="Gradual">Gradual (Krama)</option>
                            <option value="Sudden">Sudden (Aakasmika)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-semibold text-slate-700 mb-1">
                          <span>Severity Scale (1 - 10)</span>
                          <span className="text-amber-800 font-bold">{c.severity} / 10</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={c.severity}
                          onChange={(e) => {
                            const updated = [...caseData.complaints];
                            updated[idx].severity = parseInt(e.target.value);
                            setCaseData({ ...caseData, complaints: updated });
                          }}
                          className="w-full accent-emerald-700 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Medical History */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-4 text-xs">
                <h3 className="text-base font-bold text-slate-900 border-b pb-2">Step 3: Past Medical & Family History</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Past Illnesses / Surgeries</label>
                    <input
                      type="text"
                      value={caseData.medicalHistory.pastConditions.join(', ')}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        medicalHistory: { ...caseData.medicalHistory, pastConditions: e.target.value.split(', ') }
                      })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Known Allergies (Aushadhi / Ahara Satmya)</label>
                    <input
                      type="text"
                      value={caseData.medicalHistory.allergies}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        medicalHistory: { ...caseData.medicalHistory, allergies: e.target.value }
                      })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Current Medications / Supplements</label>
                    <input
                      type="text"
                      value={caseData.medicalHistory.currentMedications}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        medicalHistory: { ...caseData.medicalHistory, currentMedications: e.target.value }
                      })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Family History (Kula Vrittanta)</label>
                    <input
                      type="text"
                      value={caseData.medicalHistory.familyHistory}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        medicalHistory: { ...caseData.medicalHistory, familyHistory: e.target.value }
                      })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Ahara-Vihara */}
            {currentStep === 4 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-4 text-xs">
                <h3 className="text-base font-bold text-slate-900 border-b pb-2">Step 4: Ahara-Vihara (Diet & Regimen Analysis)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Diet Type (Ahara Prakriti)</label>
                    <select
                      value={caseData.aharaVihara.dietType}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        aharaVihara: { ...caseData.aharaVihara, dietType: e.target.value as any }
                      })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      <option value="Vegetarian">Vegetarian (Shakahari)</option>
                      <option value="Non-Vegetarian">Non-Vegetarian (Mamsahari)</option>
                      <option value="Vegan">Vegan</option>
                      <option value="Sattvic">Sattvic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Meal Regularity</label>
                    <input
                      type="text"
                      value={caseData.aharaVihara.mealFrequency}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        aharaVihara: { ...caseData.aharaVihara, mealFrequency: e.target.value }
                      })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Sleep Duration (Nidra)</label>
                    <input
                      type="text"
                      value={caseData.aharaVihara.sleepDuration}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        aharaVihara: { ...caseData.aharaVihara, sleepDuration: e.target.value }
                      })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Stress Level (Manasika Bhava)</label>
                    <select
                      value={caseData.aharaVihara.stressLevel}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        aharaVihara: { ...caseData.aharaVihara, stressLevel: e.target.value as any }
                      })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      <option value="Low">Low</option>
                      <option value="Moderate">Moderate</option>
                      <option value="High">High</option>
                      <option value="Severe">Severe</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={caseData.aharaVihara.irregularEating}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        aharaVihara: { ...caseData.aharaVihara, irregularEating: e.target.checked }
                      })}
                      className="rounded accent-emerald-700"
                    />
                    <span>Irregular eating</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={caseData.aharaVihara.spicyFood}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        aharaVihara: { ...caseData.aharaVihara, spicyFood: e.target.checked }
                      })}
                      className="rounded accent-emerald-700"
                    />
                    <span>Spicy food</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={caseData.aharaVihara.oilyFood}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        aharaVihara: { ...caseData.aharaVihara, oilyFood: e.target.checked }
                      })}
                      className="rounded accent-emerald-700"
                    />
                    <span>Oily/fried food</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={caseData.aharaVihara.excessiveSweets}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        aharaVihara: { ...caseData.aharaVihara, excessiveSweets: e.target.checked }
                      })}
                      className="rounded accent-emerald-700"
                    />
                    <span>Excessive sweets</span>
                  </label>
                </div>
              </div>
            )}

            {/* STEP 5: Prakriti Assessment */}
            {currentStep === 5 && (
              <PrakritiAssessmentChart
                value={caseData.prakriti}
                onChange={(prakriti) => setCaseData({ ...caseData, prakriti })}
              />
            )}

            {/* STEP 6: Vikriti Assessment */}
            {currentStep === 6 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-4 text-xs">
                <h3 className="text-base font-bold text-slate-900 border-b pb-2">Step 6: Vikriti (Current Dosha Imbalance State)</h3>
                <p className="text-slate-500">Assess the pathological aggravation of Vata, Pitta, and Kapha Doshas.</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-sky-50/50 rounded-xl border border-sky-200">
                    <span className="font-bold text-sky-950 block mb-2">Vata Dosha Vikriti</span>
                    <select
                      value={caseData.vikriti.vata}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        vikriti: { ...caseData.vikriti, vata: e.target.value as any }
                      })}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                    >
                      <option value="Normal">Normal</option>
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                    </select>
                  </div>

                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200">
                    <span className="font-bold text-amber-950 block mb-2">Pitta Dosha Vikriti</span>
                    <select
                      value={caseData.vikriti.pitta}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        vikriti: { ...caseData.vikriti, pitta: e.target.value as any }
                      })}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                    >
                      <option value="Normal">Normal</option>
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                    </select>
                  </div>

                  <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
                    <span className="font-bold text-emerald-950 block mb-2">Kapha Dosha Vikriti</span>
                    <select
                      value={caseData.vikriti.kapha}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        vikriti: { ...caseData.vikriti, kapha: e.target.value as any }
                      })}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                    >
                      <option value="Normal">Normal</option>
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Observed Imbalance Summary</label>
                  <input
                    type="text"
                    value={caseData.vikriti.observedImbalance}
                    onChange={(e) => setCaseData({
                      ...caseData,
                      vikriti: { ...caseData.vikriti, observedImbalance: e.target.value }
                    })}
                    placeholder="e.g. Pitta Dosha Prakopa with secondary Vata Anubandha"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
            )}

            {/* STEP 7 & 8: Agni & Koshtha */}
            {(currentStep === 7 || currentStep === 8) && (
              <AgniKoshthaSelector
                agni={caseData.agni}
                koshtha={caseData.koshtha}
                onAgniChange={(agni) => setCaseData({ ...caseData, agni })}
                onKoshthaChange={(koshtha) => setCaseData({ ...caseData, koshtha })}
              />
            )}

            {/* STEP 9: Nidana */}
            {currentStep === 9 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-4 text-xs">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Step 9: Nidana Sevana (Etiological Factors)</h3>
                    <p className="text-slate-500">Causative Ahara, Vihara, and Manasika factors inducing disease pathogenesis.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddNidana}
                    className="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl font-bold hover:bg-emerald-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Nidana</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {caseData.nidana.map((n, idx) => (
                    <div key={n.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <select
                        value={n.category}
                        onChange={(e) => {
                          const updated = [...caseData.nidana];
                          updated[idx].category = e.target.value as any;
                          setCaseData({ ...caseData, nidana: updated });
                        }}
                        className="p-2 bg-white border border-slate-300 rounded-lg font-bold text-emerald-950"
                      >
                        <option value="Ahara">Ahara (Diet)</option>
                        <option value="Vihara">Vihara (Lifestyle)</option>
                        <option value="Manasika">Manasika (Mental)</option>
                        <option value="Environmental">Environmental</option>
                        <option value="Other">Other</option>
                      </select>

                      <input
                        type="text"
                        value={n.description}
                        onChange={(e) => {
                          const updated = [...caseData.nidana];
                          updated[idx].description = e.target.value;
                          setCaseData({ ...caseData, nidana: updated });
                        }}
                        className="flex-1 p-2 bg-white border border-slate-300 rounded-lg"
                      />

                      <button
                        type="button"
                        onClick={() => setCaseData({ ...caseData, nidana: caseData.nidana.filter(item => item.id !== n.id) })}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 10: Samprapti Flow */}
            {currentStep === 10 && (
              <SampraptiFlow
                nodes={caseData.samprapti}
                onChange={(samprapti) => setCaseData({ ...caseData, samprapti })}
              />
            )}

            {/* STEP 11: Clinical Examination */}
            {currentStep === 11 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-6 text-xs">
                <h3 className="text-base font-bold text-slate-900 border-b pb-2">Step 11: Ashtavidha Pariksha & Vitals</h3>
                
                <div>
                  <h4 className="font-bold text-slate-800 mb-2 uppercase text-[10px] tracking-wider">General Vitals</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-slate-500 mb-1">Pulse / Nadi</label>
                      <input
                        type="text"
                        value={caseData.examination.vitals.pulse}
                        onChange={(e) => setCaseData({
                          ...caseData,
                          examination: { ...caseData.examination, vitals: { ...caseData.examination.vitals, pulse: e.target.value } }
                        })}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Blood Pressure</label>
                      <input
                        type="text"
                        value={caseData.examination.vitals.bp}
                        onChange={(e) => setCaseData({
                          ...caseData,
                          examination: { ...caseData.examination, vitals: { ...caseData.examination.vitals, bp: e.target.value } }
                        })}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Weight (kg)</label>
                      <input
                        type="text"
                        value={caseData.examination.vitals.weight}
                        onChange={(e) => setCaseData({
                          ...caseData,
                          examination: { ...caseData.examination, vitals: { ...caseData.examination.vitals, weight: e.target.value } }
                        })}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Height (cm)</label>
                      <input
                        type="text"
                        value={caseData.examination.vitals.height}
                        onChange={(e) => setCaseData({
                          ...caseData,
                          examination: { ...caseData.examination, vitals: { ...caseData.examination.vitals, height: e.target.value } }
                        })}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-2 uppercase text-[10px] tracking-wider">Eightfold Classical Examination</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-slate-500 mb-1">Nadi (Pulse)</label>
                      <input
                        type="text"
                        value={caseData.examination.ashtavidha.nadi}
                        onChange={(e) => setCaseData({
                          ...caseData,
                          examination: { ...caseData.examination, ashtavidha: { ...caseData.examination.ashtavidha, nadi: e.target.value } }
                        })}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Jihva (Tongue)</label>
                      <input
                        type="text"
                        value={caseData.examination.ashtavidha.jihva}
                        onChange={(e) => setCaseData({
                          ...caseData,
                          examination: { ...caseData.examination, ashtavidha: { ...caseData.examination.ashtavidha, jihva: e.target.value } }
                        })}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Mala (Feces)</label>
                      <input
                        type="text"
                        value={caseData.examination.ashtavidha.mala}
                        onChange={(e) => setCaseData({
                          ...caseData,
                          examination: { ...caseData.examination, ashtavidha: { ...caseData.examination.ashtavidha, mala: e.target.value } }
                        })}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Mutra (Urine)</label>
                      <input
                        type="text"
                        value={caseData.examination.ashtavidha.mutra}
                        onChange={(e) => setCaseData({
                          ...caseData,
                          examination: { ...caseData.examination, ashtavidha: { ...caseData.examination.ashtavidha, mutra: e.target.value } }
                        })}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 12: Diagnosis */}
            {currentStep === 12 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-4 text-xs">
                <h3 className="text-base font-bold text-slate-900 border-b pb-2">Step 12: Diagnostic Assessment (Nidana Nirnaya)</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Ayurvedic Diagnosis (Roga & Doshik Involvements)</label>
                    <input
                      type="text"
                      value={caseData.diagnosis.ayurvedicDiagnosis.join(', ')}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        diagnosis: { ...caseData.diagnosis, ayurvedicDiagnosis: e.target.value.split(', ') }
                      })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-emerald-950"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Modern Clinical Diagnosis (ICD-11 / NAMASTE Ayush Terminology)</label>
                    <input
                      type="text"
                      value={caseData.diagnosis.clinicalDiagnosis.join(', ')}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        diagnosis: { ...caseData.diagnosis, clinicalDiagnosis: e.target.value.split(', ') }
                      })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Differential Diagnosis (Bhedatmaka Nirnaya)</label>
                    <input
                      type="text"
                      value={caseData.diagnosis.differentialDiagnosis.join(', ')}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        diagnosis: { ...caseData.diagnosis, differentialDiagnosis: e.target.value.split(', ') }
                      })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Practitioner Clinical Notes</label>
                    <textarea
                      value={caseData.diagnosis.doctorNotes}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        diagnosis: { ...caseData.diagnosis, doctorNotes: e.target.value }
                      })}
                      rows={3}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 13: Treatment Plan */}
            {currentStep === 13 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-5 text-xs">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Step 13: Treatment Plan & Prescription (Chikitsa Yojana)</h3>
                    <p className="text-slate-500">Herbal formulations, dosage, anupana (vehicle), and dietary recommendations.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddMedication}
                    className="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl font-bold hover:bg-emerald-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Medicine</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {caseData.treatment.medications.map((m, idx) => (
                    <div key={m.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          value={m.medicine}
                          onChange={(e) => {
                            const updated = [...caseData.treatment.medications];
                            updated[idx].medicine = e.target.value;
                            setCaseData({ ...caseData, treatment: { ...caseData.treatment, medications: updated } });
                          }}
                          placeholder="e.g. Avipattikar Churna"
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-900"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={m.dosage}
                          onChange={(e) => {
                            const updated = [...caseData.treatment.medications];
                            updated[idx].dosage = e.target.value;
                            setCaseData({ ...caseData, treatment: { ...caseData.treatment, medications: updated } });
                          }}
                          placeholder="Dosage (3g)"
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={m.frequency}
                          onChange={(e) => {
                            const updated = [...caseData.treatment.medications];
                            updated[idx].frequency = e.target.value;
                            setCaseData({ ...caseData, treatment: { ...caseData.treatment, medications: updated } });
                          }}
                          placeholder="Frequency"
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <input
                          type="text"
                          value={m.anupana || ''}
                          onChange={(e) => {
                            const updated = [...caseData.treatment.medications];
                            updated[idx].anupana = e.target.value;
                            setCaseData({ ...caseData, treatment: { ...caseData.treatment, medications: updated } });
                          }}
                          placeholder="Anupana (Warm water)"
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg italic"
                        />
                      </div>
                      <div className="sm:col-span-1 text-right">
                        <button
                          type="button"
                          onClick={() => setCaseData({
                            ...caseData,
                            treatment: {
                              ...caseData.treatment,
                              medications: caseData.treatment.medications.filter(item => item.id !== m.id)
                            }
                          })}
                          className="text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block font-semibold text-emerald-900 mb-1">Pathya (Wholesome Dietary Guidelines)</label>
                    <textarea
                      value={caseData.treatment.dietPathya.join(', ')}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        treatment: { ...caseData.treatment, dietPathya: e.target.value.split(', ') }
                      })}
                      rows={2}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-rose-900 mb-1">Apathya (Unwholesome Foods to Avoid)</label>
                    <textarea
                      value={caseData.treatment.dietApathya.join(', ')}
                      onChange={(e) => setCaseData({
                        ...caseData,
                        treatment: { ...caseData.treatment, dietApathya: e.target.value.split(', ') }
                      })}
                      rows={2}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Next Follow-up Date</label>
                  <input
                    type="date"
                    value={caseData.treatment.followUpDate}
                    onChange={(e) => setCaseData({
                      ...caseData,
                      treatment: { ...caseData.treatment, followUpDate: e.target.value }
                    })}
                    className="p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
            )}

            {/* STEP 14: Review & Submit */}
            {currentStep === 14 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-6 text-xs">
                <div className="border-b pb-3">
                  <h3 className="text-base font-bold text-slate-900">Step 14: Final Review & Confirmation</h3>
                  <p className="text-slate-500">
                    Verify all diagnostic sections before cryptographic signing and saving to the patient record.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                    <div>
                      <strong className="text-slate-800 text-sm">Patient: {caseData.patientName}</strong>
                      <p className="text-slate-500">{caseData.patientId} • Age {selectedPatient.age}</p>
                    </div>
                    <button onClick={() => setCurrentStep(1)} className="text-emerald-700 font-bold hover:underline">Edit</button>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                    <div>
                      <strong className="text-slate-800 text-sm">Chief Complaints</strong>
                      <p className="text-slate-600">{caseData.complaints.map(c => c.complaint).join(' • ')}</p>
                    </div>
                    <button onClick={() => setCurrentStep(2)} className="text-emerald-700 font-bold hover:underline">Edit</button>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                    <div>
                      <strong className="text-slate-800 text-sm">Prakriti & Agni</strong>
                      <p className="text-slate-600">Dominant Prakriti: {caseData.prakriti.dominantPrakriti} • Agni: {caseData.agni} • Koshtha: {caseData.koshtha}</p>
                    </div>
                    <button onClick={() => setCurrentStep(5)} className="text-emerald-700 font-bold hover:underline">Edit</button>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                    <div>
                      <strong className="text-slate-800 text-sm">Clinical Diagnosis</strong>
                      <p className="text-emerald-900 font-bold">{caseData.diagnosis.ayurvedicDiagnosis.join(', ')}</p>
                    </div>
                    <button onClick={() => setCurrentStep(12)} className="text-emerald-700 font-bold hover:underline">Edit</button>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                    <div>
                      <strong className="text-slate-800 text-sm">Prescribed Medications ({caseData.treatment.medications.length})</strong>
                      <p className="text-slate-600">{caseData.treatment.medications.map(m => m.medicine).join(' • ')}</p>
                    </div>
                    <button onClick={() => setCurrentStep(13)} className="text-emerald-700 font-bold hover:underline">Edit</button>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="w-full py-3.5 bg-[#1B4332] hover:bg-[#143828] text-white font-bold rounded-xl shadow-elevated transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                    <span>Confirm and Save Case Sheet</span>
                  </button>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  currentStep === 1
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-700 hover:bg-slate-100 border border-slate-300'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              {currentStep < 14 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-5 py-2 bg-[#1B4332] hover:bg-[#143828] text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  <span>Next: {steps[currentStep].short}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Print Case Sheet Modal */}
      <PrintCaseSheetModal
        caseSheet={caseData}
        isOpen={printOpen}
        onClose={() => setPrintOpen(false)}
      />
    </div>
  );
};
