import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  HeartPulse, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Stethoscope, 
  User, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { authService } from '../services/authService';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('doctor');
  const [emailOrPhone, setEmailOrPhone] = useState('dr.ananya@aiia.gov.in');
  const [password, setPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isAbhaMode, setIsAbhaMode] = useState(false);
  const [abhaId, setAbhaId] = useState('91-4521-8890-1234');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAbhaMode) {
      authService.loginWithAbha(abhaId);
      navigate('/patient/dashboard');
    } else {
      authService.loginWithEmail(emailOrPhone, role);
      if (role === 'doctor') {
        navigate('/doctor/dashboard');
      } else if (role === 'patient') {
        navigate('/patient/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
    }
  };

  const handleQuickSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'doctor') {
      setEmailOrPhone('dr.ananya@aiia.gov.in');
    } else if (selectedRole === 'patient') {
      setEmailOrPhone('rahul.sharma@gmail.com');
    } else {
      setEmailOrPhone('admin.ayush@aiia.gov.in');
    }
  };

  return (
    <div className='min-h-screen bg-[#FAF9F6] flex'>
      {/* Left Column: AyurCase Branding & Healthcare UI */}
      <div className='hidden lg:flex lg:w-1/2 bg-[#143828] text-white p-12 flex-col justify-between relative overflow-hidden'>
        <div className='absolute -right-24 -bottom-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl' />
        <div className='absolute -left-24 -top-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl' />

        <div>
          <Link to='/' className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-[#52B788] flex items-center justify-center shadow-lg'>
              <HeartPulse className='w-6 h-6 text-white' />
            </div>
            <div>
              <span className='font-bold text-2xl font-serif text-white tracking-tight'>AyurCase</span>
              <p className='text-xs text-emerald-200/70'>Ministry of Ayush / AIIA</p>
            </div>
          </Link>
        </div>

        <div className='my-auto max-w-lg space-y-6 relative z-10'>
          <div className='inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-200 border border-white/10'>
            <Sparkles className='w-4 h-4 text-amber-300' />
            <span>SIH 2026 Problem Statement SIH26047</span>
          </div>

          <h1 className='text-3xl sm:text-4xl font-extrabold font-serif leading-tight text-white'>
            Structured Digital Clinical Sheets for Ayurvedic Healthcare.
          </h1>

          <p className='text-sm text-emerald-100/75 leading-relaxed'>
            Designed specifically for practitioners, hospitals, and patients under the All India Institute of Ayurveda. Secure, interoperable, and aligned with Ayush Electronic Health Record norms.
          </p>

          <div className='space-y-3 pt-2 text-xs text-emerald-100/80'>
            <div className='flex items-center gap-2.5'>
              <CheckCircle2 className='w-4 h-4 text-emerald-400 shrink-0' />
              <span>14-step case sheet with dynamic Prakriti and Agni profiling</span>
            </div>
            <div className='flex items-center gap-2.5'>
              <CheckCircle2 className='w-4 h-4 text-emerald-400 shrink-0' />
              <span>Full ABHA Health ID integration with consent management</span>
            </div>
            <div className='flex items-center gap-2.5'>
              <CheckCircle2 className='w-4 h-4 text-emerald-400 shrink-0' />
              <span>Voice case-taking and optical prescription scanning support</span>
            </div>
          </div>
        </div>

        <div className='text-xs text-emerald-200/50 pt-6 border-t border-emerald-800/40'>
          © 2026 AyurCase • Government of India Initiative for Digital Ayush
        </div>
      </div>

      {/* Right Column: Professional Login Card */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12'>
        <div className='max-w-md w-full bg-white rounded-3xl p-8 shadow-card border border-slate-200'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold font-serif text-slate-900'>Welcome to AyurCase</h2>
            <p className='text-xs text-slate-500 mt-1'>Sign in to your clinical or patient workspace</p>
          </div>

          {/* Quick Demo Switcher Tabs */}
          <div className='mb-6 p-1 bg-slate-100 rounded-xl flex items-center gap-1'>
            <button
              type='button'
              onClick={() => { setIsAbhaMode(false); handleQuickSelect('doctor'); }}
              className={'flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ' + (
                !isAbhaMode && role === 'doctor'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              )}
            >
              <Stethoscope className='w-3.5 h-3.5 text-emerald-700' />
              <span>Doctor</span>
            </button>
            <button
              type='button'
              onClick={() => { setIsAbhaMode(false); handleQuickSelect('patient'); }}
              className={'flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ' + (
                !isAbhaMode && role === 'patient'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              )}
            >
              <User className='w-3.5 h-3.5 text-sky-700' />
              <span>Patient</span>
            </button>
            <button
              type='button'
              onClick={() => { setIsAbhaMode(false); handleQuickSelect('admin'); }}
              className={'flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ' + (
                !isAbhaMode && role === 'admin'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              )}
            >
              <Shield className='w-3.5 h-3.5 text-amber-700' />
              <span>Admin</span>
            </button>
          </div>

          <form onSubmit={handleLogin} className='space-y-4 text-xs'>
            {!isAbhaMode ? (
              <>
                <div>
                  <label className='block font-semibold text-slate-700 mb-1'>
                    Email or Mobile Number
                  </label>
                  <input
                    type='text'
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    required
                    placeholder='name@aiia.gov.in or mobile'
                    className='w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600'
                  />
                </div>

                <div>
                  <div className='flex items-center justify-between mb-1'>
                    <label className='font-semibold text-slate-700'>Password</label>
                    <a href='#forgot' onClick={(e) => { e.preventDefault(); alert('Demo: Use any password to proceed.'); }} className='text-[11px] text-emerald-700 hover:underline'>
                      Forgot password?
                    </a>
                  </div>
                  <div className='relative'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder='••••••••'
                      className='w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600'
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'
                    >
                      {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                    </button>
                  </div>
                </div>

                <div className='flex items-center justify-between pt-1'>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className='rounded accent-emerald-600'
                    />
                    <span className='text-slate-600'>Remember this session</span>
                  </label>
                </div>
              </>
            ) : (
              <div>
                <label className='block font-semibold text-slate-700 mb-1'>
                  Ayushman Bharat Health Account (ABHA ID)
                </label>
                <input
                  type='text'
                  value={abhaId}
                  onChange={(e) => setAbhaId(e.target.value)}
                  required
                  placeholder='XX-XXXX-XXXX-XXXX'
                  className='w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono'
                />
                <p className='text-[11px] text-slate-400 mt-1'>
                  Demo pre-filled with patient Rahul Sharma\'s verified ABHA ID.
                </p>
              </div>
            )}

            <button
              type='submit'
              className='w-full py-3 bg-[#1B4332] hover:bg-[#143828] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm mt-2'
            >
              <span>{isAbhaMode ? 'Verify & Login with ABHA' : 'Sign In to ' + (role === 'doctor' ? 'Clinical Workspace' : role === 'patient' ? 'Patient Portal' : 'Admin Panel')}</span>
              <ArrowRight className='w-4 h-4' />
            </button>

            <button
              type='button'
              onClick={() => setIsAbhaMode(!isAbhaMode)}
              className='w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-xs'
            >
              <ShieldCheck className='w-4 h-4 text-emerald-700' />
              <span>{isAbhaMode ? 'Switch to Standard Password Login' : 'Login with ABHA Health ID'}</span>
            </button>
          </form>

          {/* Registration Links */}
          <div className='mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500 space-y-1.5'>
            <p>
              New Ayurvedic Practitioner?{' '}
              <Link to='/doctor/register' className='font-bold text-emerald-800 hover:underline'>
                Register for AIIA Clinical Access
              </Link>
            </p>
            <p>
              Patient Self-Registration?{' '}
              <Link to='/patient/register' className='font-bold text-emerald-800 hover:underline'>
                Create Patient Health Record
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
