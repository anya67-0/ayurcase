import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  FileText, 
  ShieldCheck, 
  Pill, 
  ArrowRight, 
  Clock, 
  Download, 
  Printer, 
  Upload, 
  QrCode,
  HeartPulse,
  Sparkles
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { authService } from '../../services/authService';
import { PrintCaseSheetModal } from '../../components/common/PrintCaseSheetModal';
import { Badge } from '../../components/common/Badge';

export const PatientDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const cases = storageService.getCases();
  const patientCase = cases[0];
  const appointments = storageService.getAppointments().filter(a => a.patientId === 'AYU-2026-00125');
  const [printOpen, setPrintOpen] = useState(false);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Reassuring Patient Greeting */}
      <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] rounded-3xl p-8 text-white shadow-card relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs text-emerald-200 border border-white/15 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>ABHA Health Record ID: 91-4521-8890-1234 (Verified)</span>
          </div>

          <h1 className="text-3xl font-bold font-serif">Welcome back, {user.name.split(' ')[0]}</h1>
          <p className="text-xs text-emerald-100/80 mt-1 max-w-xl leading-relaxed">
            Your Ayurvedic treatment plan is active. Take your herbal formulations timely and follow your personalized Pathya-Apathya dietary guidelines.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => setPrintOpen(true)}
              className="bg-white text-emerald-950 px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-50 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-emerald-800" />
              <span>View Active Prescription</span>
            </button>
            <button
              onClick={() => navigate('/patient/appointments')}
              className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/20 transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview Cards: Next Appointment & Current Herbal Regimen */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Next Appointment Card */}
        <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <h2 className="text-sm font-bold text-slate-900">Next Scheduled Visit</h2>
            </div>
            <Badge variant="blue" size="sm">Confirmed</Badge>
          </div>

          {appointments.length > 0 ? (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Consulting Physician</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{appointments[0].doctorName}</p>
                <p className="text-slate-600">All India Institute of Ayurveda, New Delhi</p>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Date & Time:</span>
                <strong className="text-slate-900">Today • {appointments[0].time}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Purpose:</span>
                <span>{appointments[0].type}</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">No upcoming visits scheduled.</p>
          )}
        </div>

        {/* Current Treatment Schedule */}
        <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-emerald-700" />
              <h2 className="text-sm font-bold text-slate-900">Active Herbal Formulations (Chikitsa)</h2>
            </div>
            <span className="text-[11px] text-slate-400">Dr. Ananya Sharma</span>
          </div>

          <div className="space-y-2.5">
            {patientCase.treatment.medications.map((m, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">{m.medicine}</h3>
                  <p className="text-[11px] text-slate-500">
                    Dosage: <strong>{m.dosage}</strong> • {m.frequency}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    {m.anupana || 'Warm water'}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">{m.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pathya Dietary Recommendations */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
        <h2 className="text-sm font-bold text-slate-900 border-b pb-2">Your Dietary Guidelines (Pathya-Apathya)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
            <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block mb-1">
              Recommended Foods (Pathya)
            </span>
            <p className="text-slate-700 leading-relaxed">
              {patientCase.treatment.dietPathya.join(' • ')}
            </p>
          </div>
          <div className="p-3.5 bg-rose-50/50 rounded-xl border border-rose-100">
            <span className="text-[11px] font-bold text-rose-900 uppercase tracking-wider block mb-1">
              Foods to Strictly Avoid (Apathya)
            </span>
            <p className="text-slate-700 leading-relaxed">
              {patientCase.treatment.dietApathya.join(' • ')}
            </p>
          </div>
        </div>
      </div>

      <PrintCaseSheetModal
        caseSheet={patientCase}
        isOpen={printOpen}
        onClose={() => setPrintOpen(false)}
      />
    </div>
  );
};
