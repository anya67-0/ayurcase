import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, Filter, Plus, ChevronLeft, ChevronRight, User, Stethoscope } from 'lucide-react';
import { storageService } from '../../services/storageService';
import { Appointment } from '../../types';
import { Badge } from '../../components/common/Badge';

export const DoctorAppointmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>(storageService.getAppointments());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [selectedDate, setSelectedDate] = useState('2026-09-09');

  const handleStatusChange = (id: string, newStatus: Appointment['status']) => {
    storageService.updateAppointmentStatus(id, newStatus);
    setAppointments(storageService.getAppointments());
  };

  const handleStartCase = (patientId: string, aptId: string) => {
    handleStatusChange(aptId, 'In Progress');
    navigate('/doctor/case/new?patientId=' + patientId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">Clinical OPD Calendar</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kayachikitsa Outpatient Consultations & Panchakarma Follow-ups
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'day' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Day View
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'week' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Week View
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'month' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Month
            </button>
          </div>

          <button
            onClick={() => alert('New appointment slot added to schedule')}
            className="flex items-center gap-1 bg-[#1B4332] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-[#143828] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Book Slot</span>
          </button>
        </div>
      </div>

      {/* Date Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Wednesday, 09 September 2026</h2>
            <p className="text-[11px] text-slate-500">{appointments.length} Consultations Scheduled Today</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-slate-800 px-2">Today</span>
          <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft hover:shadow-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 text-center shrink-0 border-r border-slate-100 pr-3">
                <span className="text-sm font-extrabold text-slate-900 font-mono block">{apt.time}</span>
                <span className="text-[10px] text-slate-400 font-semibold">{apt.id}</span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{apt.patientName}</h3>
                  <span className="text-xs text-slate-500">({apt.patientAge}y • {apt.patientGender})</span>
                  <Badge
                    variant={apt.status === 'Scheduled' ? 'blue' : apt.status === 'In Progress' ? 'amber' : 'green'}
                    size="sm"
                  >
                    {apt.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  <strong>Type:</strong> {apt.type} • {apt.notes}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              {apt.status === 'Scheduled' && (
                <button
                  onClick={() => handleStartCase(apt.patientId, apt.id)}
                  className="px-3.5 py-1.5 bg-[#1B4332] text-white rounded-xl text-xs font-bold hover:bg-[#143828] transition-colors"
                >
                  Start Consultation
                </button>
              )}
              {apt.status === 'In Progress' && (
                <button
                  onClick={() => handleStatusChange(apt.id, 'Completed')}
                  className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
                >
                  Mark Completed
                </button>
              )}
              <button
                onClick={() => handleStatusChange(apt.id, 'Cancelled')}
                className="px-3 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-semibold"
              >
                Reschedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
