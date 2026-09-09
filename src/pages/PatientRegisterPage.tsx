import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, CheckCircle2, ShieldCheck, QrCode, ArrowRight, UserPlus } from 'lucide-react';
import { storageService } from '../services/storageService';
import { Patient } from '../types';

export const PatientRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [abhaVerified, setAbhaVerified] = useState(false);
  const [verifyingAbha, setVerifyingAbha] = useState(false);

  const [patientData, setPatientData] = useState({
    name: '',
    dob: '1988-05-14',
    age: 38,
    gender: 'Male' as const,
    bloodGroup: 'B+',
    mobile: '',
    email: '',
    address: 'New Delhi, India',
    abhaId: '91-4521-9988-7766',
    emergencyName: '',
    emergencyRelation: 'Spouse',
    emergencyPhone: '',
    consentGiven: true
  });

  const handleVerifyAbha = () => {
    setVerifyingAbha(true);
    setTimeout(() => {
      setVerifyingAbha(false);
      setAbhaVerified(true);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = 'AYU-2026-00' + Math.floor(130 + Math.random() * 800);
    const newPatient: Patient = {
      id: newId,
      name: patientData.name || 'New Patient',
      age: Number(patientData.age) || 30,
      gender: patientData.gender,
      dob: patientData.dob,
      bloodGroup: patientData.bloodGroup,
      mobile: patientData.mobile,
      email: patientData.email,
      address: patientData.address,
      abhaId: patientData.abhaId,
      abhaVerified: abhaVerified,
      emergencyContact: {
        name: patientData.emergencyName || 'Relative',
        relationship: patientData.emergencyRelation,
        phone: patientData.emergencyPhone || patientData.mobile
      },
      consentGiven: patientData.consentGiven,
      prakriti: 'Vata-Pitta',
      vikriti: 'Normal',
      agni: 'Sama',
      koshtha: 'Madhyama',
      createdAt: new Date().toISOString().split('T')[0],
      lastVisit: new Date().toISOString().split('T')[0],
      status: 'Active'
    };

    storageService.savePatient(newPatient);
    navigate('/doctor/patients/' + newId);
  };

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      <div className='flex items-center justify-between pb-4 border-b border-slate-200'>
        <div>
          <h1 className='text-2xl font-bold font-serif text-slate-900'>Register New Patient</h1>
          <p className='text-xs text-slate-500 mt-0.5'>
            AIIA Outpatient Clinical Registry • Electronic Health Record Intake
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6 text-xs'>
        {/* SECTION 1: Patient Information */}
        <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-4'>
          <h3 className='text-sm font-bold text-slate-900 border-b pb-2'>
            Section 1: Patient Demographics
          </h3>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            <div className='sm:col-span-2'>
              <label className='block font-semibold text-slate-700 mb-1'>Full Name</label>
              <input
                type='text'
                required
                value={patientData.name}
                onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                placeholder='e.g. Ramesh Chandra Verma'
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl'
              />
            </div>
            <div>
              <label className='block font-semibold text-slate-700 mb-1'>Gender</label>
              <select
                value={patientData.gender}
                onChange={(e) => setPatientData({ ...patientData, gender: e.target.value as any })}
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl'
              >
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
              </select>
            </div>
            <div>
              <label className='block font-semibold text-slate-700 mb-1'>Date of Birth</label>
              <input
                type='date'
                value={patientData.dob}
                onChange={(e) => setPatientData({ ...patientData, dob: e.target.value })}
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl'
              />
            </div>
            <div>
              <label className='block font-semibold text-slate-700 mb-1'>Age</label>
              <input
                type='number'
                value={patientData.age}
                onChange={(e) => setPatientData({ ...patientData, age: parseInt(e.target.value) })}
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl'
              />
            </div>
            <div>
              <label className='block font-semibold text-slate-700 mb-1'>Blood Group</label>
              <select
                value={patientData.bloodGroup}
                onChange={(e) => setPatientData({ ...patientData, bloodGroup: e.target.value })}
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl'
              >
                <option value='A+'>A+</option>
                <option value='A-'>A-</option>
                <option value='B+'>B+</option>
                <option value='B-'>B-</option>
                <option value='O+'>O+</option>
                <option value='O-'>O-</option>
                <option value='AB+'>AB+</option>
                <option value='AB-'>AB-</option>
              </select>
            </div>
            <div>
              <label className='block font-semibold text-slate-700 mb-1'>Mobile Number</label>
              <input
                type='tel'
                required
                value={patientData.mobile}
                onChange={(e) => setPatientData({ ...patientData, mobile: e.target.value })}
                placeholder='+91 98000 11223'
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl'
              />
            </div>
            <div>
              <label className='block font-semibold text-slate-700 mb-1'>Email</label>
              <input
                type='email'
                value={patientData.email}
                onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                placeholder='patient@example.com'
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl'
              />
            </div>
            <div className='sm:col-span-3'>
              <label className='block font-semibold text-slate-700 mb-1'>Residential Address</label>
              <input
                type='text'
                value={patientData.address}
                onChange={(e) => setPatientData({ ...patientData, address: e.target.value })}
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl'
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: ABHA Card */}
        <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-4'>
          <div className='flex items-center justify-between border-b pb-2'>
            <h3 className='text-sm font-bold text-slate-900'>
              Section 2: Ayushman Bharat Digital Mission (ABHA Integration)
            </h3>
            {abhaVerified ? (
              <span className='inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold'>
                ✓ ABHA Verified
              </span>
            ) : (
              <span className='text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-medium text-[11px]'>
                Verification Pending
              </span>
            )}
          </div>

          <div className='p-4 bg-[#FAF9F6] rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center'>
            <div className='sm:col-span-7'>
              <label className='block font-semibold text-slate-700 mb-1'>
                Enter ABHA Number (14 Digits)
              </label>
              <div className='flex items-center gap-2'>
                <input
                  type='text'
                  value={patientData.abhaId}
                  onChange={(e) => setPatientData({ ...patientData, abhaId: e.target.value })}
                  placeholder='XX-XXXX-XXXX-XXXX'
                  className='flex-1 p-2.5 bg-white border border-slate-300 rounded-xl font-mono text-xs'
                />
                <button
                  type='button'
                  onClick={handleVerifyAbha}
                  disabled={verifyingAbha || abhaVerified}
                  className='px-3.5 py-2.5 bg-[#1B4332] text-white rounded-xl font-bold text-xs hover:bg-[#143828] transition-colors shrink-0'
                >
                  {verifyingAbha ? 'Verifying...' : abhaVerified ? 'Verified' : 'Verify ABHA'}
                </button>
              </div>
              <p className='text-[10px] text-slate-500 mt-1'>
                Prototype simulation: Click Verify to test instant ABDM health record lookup.
              </p>
            </div>

            <div className='sm:col-span-5 text-center sm:border-l sm:pl-4 border-slate-200'>
              <button
                type='button'
                onClick={() => setAbhaVerified(true)}
                className='inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs'
              >
                <QrCode className='w-4 h-4 text-emerald-700' />
                <span>Scan Patient ABHA QR</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 3: Emergency Contact & Consent */}
        <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-4'>
          <h3 className='text-sm font-bold text-slate-900 border-b pb-2'>
            Section 3: Emergency Contact & Health Consent
          </h3>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            <div>
              <label className='block font-semibold text-slate-700 mb-1'>Emergency Contact Name</label>
              <input
                type='text'
                value={patientData.emergencyName}
                onChange={(e) => setPatientData({ ...patientData, emergencyName: e.target.value })}
                placeholder='Relative Name'
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl'
              />
            </div>
            <div>
              <label className='block font-semibold text-slate-700 mb-1'>Relationship</label>
              <input
                type='text'
                value={patientData.emergencyRelation}
                onChange={(e) => setPatientData({ ...patientData, emergencyRelation: e.target.value })}
                placeholder='e.g. Spouse / Parent'
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl'
              />
            </div>
            <div>
              <label className='block font-semibold text-slate-700 mb-1'>Emergency Contact Phone</label>
              <input
                type='tel'
                value={patientData.emergencyPhone}
                onChange={(e) => setPatientData({ ...patientData, emergencyPhone: e.target.value })}
                placeholder='+91 98000 00000'
                className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl'
              />
            </div>
          </div>

          <div className='p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-start gap-2.5'>
            <input
              type='checkbox'
              id='consent'
              checked={patientData.consentGiven}
              onChange={(e) => setPatientData({ ...patientData, consentGiven: e.target.checked })}
              className='mt-0.5 rounded accent-emerald-600'
            />
            <label htmlFor='consent' className='text-slate-700 leading-tight'>
              <strong>Consent for Health Data Collection:</strong> I consent to the collection, diagnostic processing, and use of my health information for Ayurvedic clinical care under the Ministry of Ayush Electronic Health Record norms.
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex items-center justify-between pt-2'>
          <button
            type='button'
            onClick={() => navigate('/doctor/patients')}
            className='px-5 py-2.5 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold'
          >
            Cancel
          </button>

          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={() => alert('Draft saved locally.')}
              className='px-5 py-2.5 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold'
            >
              Save Draft
            </button>
            <button
              type='submit'
              className='px-6 py-2.5 bg-[#1B4332] hover:bg-[#143828] text-white rounded-xl font-bold shadow-md transition-all flex items-center gap-1.5'
            >
              <UserPlus className='w-4 h-4' />
              <span>Create Patient Record</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
