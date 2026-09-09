import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Sparkles, FileSpreadsheet, ArrowRight } from 'lucide-react';
import { VoiceCaseModal } from '../../components/case/VoiceCaseModal';

export const VoiceCasePage: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold font-serif text-slate-900">Voice Case Taking Suite</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Hands-free clinical narrative capture designed for Ayurvedic outpatient consultations.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-card text-center max-w-xl mx-auto space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
          <Mic className="w-10 h-10" />
        </div>

        <h2 className="text-xl font-bold font-serif text-slate-900">
          Speak Naturally & Capture Ayurvedic Parameters
        </h2>

        <p className="text-xs text-slate-600 leading-relaxed">
          Speak clinical observations naturally and let AyurCase organize the information into structured case parameters including Chief Complaints, Duration, Severity, Agni status, and Nidana factors.
        </p>

        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-3 bg-[#1B4332] text-white rounded-xl text-xs font-bold hover:bg-[#143828] shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <Mic className="w-4 h-4" />
          <span>Launch Voice Intake Modal</span>
        </button>
      </div>

      <VoiceCaseModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onApplyExtracted={(data) => {
          navigate('/doctor/case/new?voice=' + encodeURIComponent(JSON.stringify(data)));
        }}
      />
    </div>
  );
};
