import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  FileSpreadsheet, 
  UserCheck, 
  UserPlus, 
  Mic, 
  ScanLine, 
  Search, 
  ArrowUpRight, 
  Clock, 
  Stethoscope, 
  ChevronRight,
  Activity,
  FileText
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { authService } from '../../services/authService';
import { Badge } from '../../components/common/Badge';
import { VoiceCaseModal } from '../../components/case/VoiceCaseModal';
import { DocumentScanModal } from '../../components/case/DocumentScanModal';

export const DoctorDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const patients = storageService.getPatients();
  const appointments = storageService.getAppointments();

  const [voiceOpen, setVoiceOpen] = useState(false);
  const [scanOpen, setScanOpen] = useState(false);

  const stats = [
    { label: 'Total Patients', value: '1,248', change: '+14% this month', icon: Users, color: 'text-emerald-700 bg-emerald-50' },
    { label: 'Today\'s Appointments', value: '18', change: '4 completed', icon: Calendar, color: 'text-sky-700 bg-sky-50' },
    { label: 'Pending Cases', value: '7', change: '3 drafts saved', icon: FileSpreadsheet, color: 'text-amber-700 bg-amber-50' },
    { label: 'Follow-ups', value: '12', change: 'Scheduled today', icon: Clock, color: 'text-indigo-700 bg-indigo-50' },
    { label: 'New Patients', value: '5', change: 'Registered today', icon: UserPlus, color: 'text-teal-700 bg-teal-50' }
  ];

  const quickActions = [
    { label: 'Register Patient', icon: UserPlus, desc: 'New OPD intake', onClick: () => navigate('/doctor/patients/new') },
    { label: 'Start Case', icon: FileSpreadsheet, desc: '14-step clinical sheet', onClick: () => navigate('/doctor/case/new') },
    { label: 'Search Patient', icon: Search, desc: 'Search directory', onClick: () => navigate('/doctor/patients') },
    { label: 'Voice Case', icon: Mic, desc: 'Speech to case sheet', onClick: () => setVoiceOpen(true) },
    { label: 'Scan Document', icon: ScanLine, desc: 'OCR digitization', onClick: () => setScanOpen(true) }
  ];

  const handleStartConsultation = (aptId: string, patId: string) => {
    storageService.updateAppointmentStatus(aptId, 'In Progress');
    navigate('/doctor/case/new?patientId=' + patId);
  };

  return (
    <div className='space-y-8'>
      {/* Header Greeting */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold font-serif text-slate-900'>
            Good morning, {user.name}
          </h1>
          <p className='text-xs text-slate-500 mt-1'>
            Here\'s your clinical overview for today • All India Institute of Ayurveda (AIIA)
          </p>
        </div>

        <div className='flex items-center gap-2'>
          <button
            onClick={() => navigate('/doctor/patients/new')}
            className='flex items-center gap-1.5 bg-[#1B4332] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#143828] shadow-sm transition-all'
          >
            <UserPlus className='w-4 h-4' />
            <span>Register Patient</span>
          </button>
          <button
            onClick={() => navigate('/doctor/case/new')}
            className='flex items-center gap-1.5 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-all shadow-xs'
          >
            <FileSpreadsheet className='w-4 h-4 text-emerald-700' />
            <span>Start Case</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className='bg-white p-4 rounded-2xl border border-slate-200 shadow-soft hover:shadow-card transition-shadow'>
              <div className='flex items-center justify-between mb-3'>
                <span className='text-xs font-semibold text-slate-500'>{s.label}</span>
                <div className={'w-8 h-8 rounded-xl flex items-center justify-center ' + s.color}>
                  <Icon className='w-4 h-4' />
                </div>
              </div>
              <div className='text-2xl font-bold text-slate-900 font-serif'>{s.value}</div>
              <div className='text-[10px] text-emerald-700 font-semibold mt-1'>{s.change}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Cards */}
      <div>
        <h2 className='text-xs font-bold text-slate-400 uppercase tracking-wider mb-3'>
          Quick Clinical Actions
        </h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3'>
          {quickActions.map((qa, i) => {
            const Icon = qa.icon;
            return (
              <button
                key={i}
                onClick={qa.onClick}
                className='p-4 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:bg-emerald-50/20 shadow-soft hover:shadow-md transition-all text-left group'
              >
                <div className='w-9 h-9 rounded-xl bg-[#FAF9F6] border border-slate-200 text-emerald-800 flex items-center justify-center mb-3 group-hover:bg-[#1B4332] group-hover:text-white transition-colors'>
                  <Icon className='w-4 h-4' />
                </div>
                <p className='text-xs font-bold text-slate-800 leading-tight'>{qa.label}</p>
                <p className='text-[10px] text-slate-400 mt-0.5'>{qa.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Appointments & Today's Consultations */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        {/* Today's Appointments Table */}
        <div className='lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-soft p-5'>
          <div className='flex items-center justify-between pb-3 border-b border-slate-100 mb-4'>
            <div>
              <h3 className='text-sm font-bold text-slate-900'>Today\'s Scheduled Appointments</h3>
              <p className='text-[11px] text-slate-400'>OPD Kayachikitsa Schedule</p>
            </div>
            <button
              onClick={() => navigate('/doctor/appointments')}
              className='text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1'
            >
              <span>View Calendar</span>
              <ChevronRight className='w-3.5 h-3.5' />
            </button>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full text-xs text-left'>
              <thead className='text-[10px] uppercase text-slate-400 font-bold bg-slate-50 rounded-lg'>
                <tr>
                  <th className='p-2.5'>Patient</th>
                  <th className='p-2.5'>Time</th>
                  <th className='p-2.5'>Age</th>
                  <th className='p-2.5'>Type</th>
                  <th className='p-2.5'>Status</th>
                  <th className='p-2.5 text-right'>Action</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100'>
                {appointments.slice(0, 5).map((apt) => (
                  <tr key={apt.id} className='hover:bg-slate-50 transition-colors'>
                    <td className='p-2.5 font-bold text-slate-900'>
                      <div className='flex items-center gap-2'>
                        <div className='w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]'>
                          {apt.patientName.charAt(0)}
                        </div>
                        <span>{apt.patientName}</span>
                      </div>
                    </td>
                    <td className='p-2.5 text-slate-500 font-mono'>{apt.time}</td>
                    <td className='p-2.5 text-slate-600'>{apt.patientAge}</td>
                    <td className='p-2.5 text-slate-600'>{apt.type}</td>
                    <td className='p-2.5'>
                      <Badge
                        variant={apt.status === 'Scheduled' ? 'blue' : apt.status === 'In Progress' ? 'amber' : 'green'}
                        size='sm'
                      >
                        {apt.status}
                      </Badge>
                    </td>
                    <td className='p-2.5 text-right'>
                      <button
                        onClick={() => handleStartConsultation(apt.id, apt.patientId)}
                        className='px-2.5 py-1 bg-[#1B4332] text-white rounded-lg text-[11px] font-bold hover:bg-[#143828] transition-colors'
                      >
                        Start Consultation
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Active Patients */}
        <div className='lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-soft p-5'>
          <div className='flex items-center justify-between pb-3 border-b border-slate-100 mb-4'>
            <div>
              <h3 className='text-sm font-bold text-slate-900'>Recent Patient Cases</h3>
              <p className='text-[11px] text-slate-400'>Clinical Dossiers</p>
            </div>
            <button
              onClick={() => navigate('/doctor/patients')}
              className='text-xs font-semibold text-emerald-700 hover:underline'
            >
              Directory
            </button>
          </div>

          <div className='space-y-3'>
            {patients.slice(0, 4).map((p) => (
              <div
                key={p.id}
                onClick={() => navigate('/doctor/patients/' + p.id)}
                className='p-3 rounded-xl border border-slate-100 bg-[#FAF9F6] hover:bg-white hover:border-slate-300 hover:shadow-xs cursor-pointer transition-all flex items-center justify-between'
              >
                <div>
                  <div className='flex items-center gap-2'>
                    <h4 className='font-bold text-slate-900 text-xs'>{p.name}</h4>
                    <span className='text-[10px] text-slate-400 font-mono'>{p.id}</span>
                  </div>
                  <div className='flex items-center gap-2 text-[11px] text-slate-500 mt-1'>
                    <span>{p.age}y • {p.gender}</span>
                    <span>•</span>
                    <span className='font-semibold text-emerald-800'>{p.prakriti}</span>
                    <span>•</span>
                    <span>Last: {p.lastVisit}</span>
                  </div>
                </div>

                <div className='flex items-center gap-1.5' onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => navigate('/doctor/patients/' + p.id)}
                    className='p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50'
                    title='View Profile'
                  >
                    <ArrowUpRight className='w-4 h-4' />
                  </button>
                  <button
                    onClick={() => navigate('/doctor/case/new?patientId=' + p.id)}
                    className='px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-[10px] font-bold hover:bg-emerald-100'
                  >
                    Start Case
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Voice and Scan Modals */}
      <VoiceCaseModal
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onApplyExtracted={(data) => {
          navigate('/doctor/case/new?voice=' + encodeURIComponent(JSON.stringify(data)));
        }}
      />
      <DocumentScanModal
        isOpen={scanOpen}
        onClose={() => setScanOpen(false)}
        onApply={(data) => {
          alert('Document OCR data stored to patient queue.');
        }}
      />
    </div>
  );
};
