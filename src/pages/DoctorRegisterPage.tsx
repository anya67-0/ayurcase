import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartPulse, CheckCircle2, Upload, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { storageService } from '../services/storageService';

export const DoctorRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    regNumber: '',
    qualification: 'BAMS, MD (Ayurveda)',
    specialization: 'Kayachikitsa (Internal Medicine)',
    hospital: 'All India Institute of Ayurveda (AIIA), New Delhi',
    password: '',
    confirmPassword: '',
    regCertName: 'medical_council_reg.pdf',
    idProofName: 'national_id_card.pdf'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add verification request to storage
    storageService.saveVerification({
      id: 'VER-' + Date.now().toString().slice(-6),
      doctorId: 'DOC-' + Date.now().toString().slice(-4),
      doctorName: formData.fullName || 'Dr. Newly Registered',
      email: formData.email,
      mobile: formData.mobile,
      regNumber: formData.regNumber,
      qualification: formData.qualification,
      specialization: formData.specialization,
      hospital: formData.hospital,
      documents: {
        regCertName: formData.regCertName,
        idProofName: formData.idProofName,
        uploadDate: new Date().toISOString().split('T')[0]
      },
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      remarks: 'Self-registered via Portal. Verification pending AIIA administrative approval.'
    });

    setSubmitted(true);
  };

  return (
    <div className='min-h-screen bg-[#FAF9F6] py-12 px-6'>
      <div className='max-w-2xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <Link to='/' className='inline-flex items-center gap-2 mb-3'>
            <div className='w-9 h-9 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shadow-md'>
              <HeartPulse className='w-5 h-5' />
            </div>
            <span className='font-bold text-xl font-serif text-[#1B4332]'>AyurCase</span>
          </Link>
          <h1 className='text-2xl font-bold font-serif text-slate-900'>Ayurvedic Practitioner Registration</h1>
          <p className='text-xs text-slate-500 mt-1'>
            Enroll into the Ministry of Ayush / AIIA Digital Clinical Network
          </p>
        </div>

        {submitted ? (
          <div className='bg-white rounded-3xl p-8 shadow-card border border-emerald-200 text-center space-y-4 animate-in fade-in duration-300'>
            <div className='w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto'>
              <Clock className='w-8 h-8' />
            </div>

            <span className='inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold'>
              Verification Pending
            </span>

            <h2 className='text-xl font-bold font-serif text-slate-900'>
              Application Submitted for Credential Review
            </h2>

            <p className='text-xs text-slate-600 max-w-md mx-auto leading-relaxed'>
              Your credentials will be reviewed by an authorized administrator before clinical access is enabled. You will receive an SMS and email notification upon verification.
            </p>

            <div className='p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5 max-w-sm mx-auto'>
              <div className='flex justify-between text-slate-500'>
                <span>Doctor Name:</span>
                <strong className='text-slate-800'>{formData.fullName || 'Dr. Registered'}</strong>
              </div>
              <div className='flex justify-between text-slate-500'>
                <span>Council Reg No:</span>
                <strong className='text-slate-800 font-mono'>{formData.regNumber || 'AYU-2026-XXXX'}</strong>
              </div>
              <div className='flex justify-between text-slate-500'>
                <span>Status:</span>
                <strong className='text-amber-600'>Pending AIIA Registrar Review</strong>
              </div>
            </div>

            <div className='pt-4 flex flex-col sm:flex-row items-center justify-center gap-3'>
              <button
                onClick={() => navigate('/login')}
                className='px-6 py-2.5 bg-[#1B4332] text-white rounded-xl text-xs font-bold hover:bg-[#143828] transition-colors shadow-sm'
              >
                Return to Login
              </button>
              <button
                onClick={() => navigate('/admin/verification')}
                className='px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors'
              >
                View Admin Verification Queue (Demo)
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='bg-white rounded-3xl p-8 shadow-card border border-slate-200 space-y-6 text-xs'>
            {/* Personal Information */}
            <div>
              <h3 className='text-sm font-bold text-slate-900 border-b pb-2 mb-3'>
                1. Personal Information
              </h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div className='sm:col-span-2'>
                  <label className='block font-semibold text-slate-700 mb-1'>Full Name (with Title)</label>
                  <input
                    type='text'
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder='Dr. Rajesh Kumar Sharma'
                    className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-600'
                  />
                </div>
                <div>
                  <label className='block font-semibold text-slate-700 mb-1'>Email Address</label>
                  <input
                    type='email'
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder='doctor@hospital.gov.in'
                    className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl'
                  />
                </div>
                <div>
                  <label className='block font-semibold text-slate-700 mb-1'>Mobile Number</label>
                  <input
                    type='tel'
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder='+91 98765 43210'
                    className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl'
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className='text-sm font-bold text-slate-900 border-b pb-2 mb-3'>
                2. Professional Credentials
              </h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div>
                  <label className='block font-semibold text-slate-700 mb-1'>Medical Council Registration No.</label>
                  <input
                    type='text'
                    required
                    value={formData.regNumber}
                    onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                    placeholder='AYU-DEL-2026-9021'
                    className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono'
                  />
                </div>
                <div>
                  <label className='block font-semibold text-slate-700 mb-1'>Qualification</label>
                  <input
                    type='text'
                    required
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder='BAMS, MD (Ayurveda)'
                    className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl'
                  />
                </div>
                <div>
                  <label className='block font-semibold text-slate-700 mb-1'>Specialization</label>
                  <input
                    type='text'
                    required
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    placeholder='Kayachikitsa / Panchakarma'
                    className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl'
                  />
                </div>
                <div>
                  <label className='block font-semibold text-slate-700 mb-1'>Hospital / Clinic Affiliation</label>
                  <input
                    type='text'
                    required
                    value={formData.hospital}
                    onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                    placeholder='All India Institute of Ayurveda (AIIA)'
                    className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl'
                  />
                </div>
              </div>
            </div>

            {/* Document Uploads */}
            <div>
              <h3 className='text-sm font-bold text-slate-900 border-b pb-2 mb-3'>
                3. Verification Documents
              </h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div className='p-3.5 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center hover:bg-slate-100 transition-colors cursor-pointer'>
                  <Upload className='w-5 h-5 text-emerald-700 mx-auto mb-1' />
                  <p className='font-bold text-slate-800 text-[11px]'>Medical Registration Certificate</p>
                  <p className='text-[10px] text-slate-500 mt-0.5'>{formData.regCertName} (Attached)</p>
                </div>
                <div className='p-3.5 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center hover:bg-slate-100 transition-colors cursor-pointer'>
                  <Upload className='w-5 h-5 text-emerald-700 mx-auto mb-1' />
                  <p className='font-bold text-slate-800 text-[11px]'>Identity Proof (Aadhaar/Passport)</p>
                  <p className='text-[10px] text-slate-500 mt-0.5'>{formData.idProofName} (Attached)</p>
                </div>
              </div>
            </div>

            {/* Security */}
            <div>
              <h3 className='text-sm font-bold text-slate-900 border-b pb-2 mb-3'>
                4. Account Security
              </h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div>
                  <label className='block font-semibold text-slate-700 mb-1'>Create Password</label>
                  <input
                    type='password'
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder='••••••••••••'
                    className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl'
                  />
                </div>
                <div>
                  <label className='block font-semibold text-slate-700 mb-1'>Confirm Password</label>
                  <input
                    type='password'
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder='••••••••••••'
                    className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl'
                  />
                </div>
              </div>
            </div>

            <button
              type='submit'
              className='w-full py-3 bg-[#1B4332] hover:bg-[#143828] text-white font-bold rounded-xl shadow-md transition-all text-sm'
            >
              Submit for Verification
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
