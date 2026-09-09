import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, User, Stethoscope } from 'lucide-react';
import { storageService } from '../../services/storageService';

export const PatientAppointmentsPage: React.FC = () => {
  const [booked, setBooked] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Ananya Sharma');
  const [selectedTime, setSelectedTime] = useState('11:30 AM');

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold font-serif text-slate-900">Book Outpatient Consultation</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Reserve an in-person appointment at AIIA New Delhi OPD.
        </p>
      </div>

      {booked ? (
        <div className="bg-white rounded-3xl p-8 shadow-card border border-emerald-200 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-serif text-slate-900">Appointment Confirmed!</h2>
          <p className="text-xs text-slate-600">
            Your slot with <strong>{selectedDoctor}</strong> has been booked for tomorrow at <strong>{selectedTime}</strong>.
          </p>
          <button
            onClick={() => setBooked(false)}
            className="px-5 py-2 bg-[#1B4332] text-white rounded-xl text-xs font-bold hover:bg-[#143828]"
          >
            Book Another Slot
          </button>
        </div>
      ) : (
        <form onSubmit={handleBook} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Department & Practitioner</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <option value="Dr. Ananya Sharma">Dr. Ananya Sharma (Kayachikitsa / Internal Medicine)</option>
              <option value="Dr. Rajeshwar Bhatt">Dr. Rajeshwar Bhatt (Shalya Tantra / Surgery)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Preferred Date</label>
            <input
              type="date"
              defaultValue="2026-09-10"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Available OPD Slot</label>
            <div className="grid grid-cols-3 gap-2">
              {['09:30 AM', '10:15 AM', '11:30 AM', '02:00 PM', '03:15 PM'].map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`p-2 rounded-xl border text-center font-semibold transition-all ${
                    selectedTime === slot ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#1B4332] hover:bg-[#143828] text-white font-bold rounded-xl shadow-md transition-all mt-2"
          >
            Confirm Appointment Slot
          </button>
        </form>
      )}
    </div>
  );
};
