import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HeartPulse, 
  Shield, 
  FileSpreadsheet, 
  Sparkles, 
  Mic, 
  ScanLine, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  Users, 
  Stethoscope, 
  Lock,
  ChevronRight,
  Flame,
  Wind,
  Droplets
} from 'lucide-react';
import { DemoSwitcher } from '../components/common/DemoSwitcher';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'Digital Patient Registration',
      desc: 'Quick multi-step intake with demographic, lifestyle, and clinical baseline parameters.'
    },
    {
      icon: FileSpreadsheet,
      title: 'Ayurvedic Case Taking',
      desc: 'Comprehensive 14-step clinical sheet: Chief complaints, Ahara-Vihara, Ashtavidha & Nidana.'
    },
    {
      icon: Shield,
      title: 'ABHA Integration',
      desc: 'Seamless Ayushman Bharat Health Account verification and secure consent-driven health data linking.'
    },
    {
      icon: Lock,
      title: 'Secure Medical Records',
      desc: 'Ministry of Ayush compliant EHR architecture with encrypted logs and audit trail security.'
    },
    {
      icon: Mic,
      title: 'Voice Case Taking',
      desc: 'Natural language speech capture automatically parsed into structured Ayurvedic diagnostic fields.'
    },
    {
      icon: ScanLine,
      title: 'Document Scanning',
      desc: 'Instant OCR digitization for handwritten BAMS prescriptions, lab investigations, and discharge slips.'
    }
  ];

  const steps = [
    { num: '01', title: 'Authenticate', desc: 'Secure login via Ayush credentials, Council Reg No., or ABHA ID.' },
    { num: '02', title: 'Register Patient', desc: 'Capture demographics, emergency contacts, and instant ABHA verification.' },
    { num: '03', title: 'Capture Case', desc: 'Systematically record chief complaints, illness history, and diet patterns.' },
    { num: '04', title: 'Ayurvedic Assessment', desc: 'Calculate Prakriti, Vikriti grading, Agni & Koshtha status, and Samprapti flow.' },
    { num: '05', title: 'Save Digital Record', desc: 'Validate complete clinical summary and generate official AIIA case sheet.' },
    { num: '06', title: 'Continue Patient Care', desc: 'Track longitudinal visits, follow-up dates, and herbal treatment response.' }
  ];

  return (
    <div className='min-h-screen bg-[#FAF9F6] text-[#1F2937]'>
      {/* Top Banner for AIIA / Ayush */}
      <div className='bg-[#143828] text-emerald-100 text-xs py-2 px-6 flex items-center justify-between border-b border-emerald-800/40'>
        <div className='flex items-center gap-2 max-w-7xl mx-auto w-full justify-between'>
          <div className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
            <span>Ministry of Ayush • All India Institute of Ayurveda (AIIA) Use Case</span>
          </div>
          <span className='hidden sm:inline-block text-[11px] text-amber-300 font-semibold bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30'>
            SIH 2026 Problem Statement SIH26047
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <header className='bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/80'>
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-2.5'>
            <div className='w-9 h-9 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shadow-md'>
              <HeartPulse className='w-5 h-5' />
            </div>
            <div>
              <span className='font-bold text-xl font-serif text-[#1B4332]'>AyurCase</span>
              <span className='text-[10px] ml-1.5 text-slate-500 font-sans tracking-wide uppercase font-semibold'>
                EHR System
              </span>
            </div>
          </div>

          <nav className='hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600'>
            <a href='#features' className='hover:text-[#1B4332] transition-colors'>Features</a>
            <a href='#how-it-works' className='hover:text-[#1B4332] transition-colors'>How It Works</a>
            <a href='#preview' className='hover:text-[#1B4332] transition-colors'>Platform Preview</a>
            <a href='#about' className='hover:text-[#1B4332] transition-colors'>AIIA Integration</a>
          </nav>

          <div className='flex items-center gap-3'>
            <Link
              to='/login'
              className='text-xs font-semibold text-slate-700 hover:text-[#1B4332] px-3 py-2 transition-colors'
            >
              Sign In
            </Link>
            <Link
              to='/doctor/dashboard'
              className='bg-[#1B4332] hover:bg-[#143828] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5'
            >
              <span>Launch Portal</span>
              <ArrowRight className='w-3.5 h-3.5' />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='pt-16 pb-20 px-6 max-w-7xl mx-auto'>
        <div className='text-center max-w-3xl mx-auto mb-12'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-6 shadow-xs'>
            <Sparkles className='w-3.5 h-3.5 text-amber-500' />
            <span>Digital Ayurvedic Patient Case-Taking Software</span>
          </div>

          <h1 className='text-4xl sm:text-5xl font-extrabold font-serif text-[#1B4332] tracking-tight leading-[1.15] mb-6'>
            Digital Patient Case-Taking for Modern Ayurveda
          </h1>

          <p className='text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8'>
            Capture, organize and securely manage complete Ayurvedic patient records in one intelligent platform—from Ashtavidha Pariksha and dynamic Prakriti charting to interactive Samprapti pathogenesis flows.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-3.5'>
            <Link
              to='/doctor/dashboard'
              className='w-full sm:w-auto px-6 py-3.5 bg-[#1B4332] text-white rounded-xl font-bold text-xs hover:bg-[#143828] shadow-elevated transition-all flex items-center justify-center gap-2'
            >
              <Stethoscope className='w-4 h-4 text-emerald-300' />
              <span>Doctor Clinical Dashboard</span>
            </Link>
            <Link
              to='/doctor/case/new'
              className='w-full sm:w-auto px-6 py-3.5 bg-white border border-slate-300 text-slate-800 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-xs'
            >
              <FileSpreadsheet className='w-4 h-4 text-emerald-700' />
              <span>Start 14-Step Case Sheet</span>
            </Link>
          </div>

          {/* Quick Demo Credentials Reminder */}
          <p className='text-xs text-slate-400 mt-4'>
            Try 1-click accounts: <strong>Dr. Ananya Sharma</strong> (Doctor) • <strong>Rahul Sharma</strong> (Patient) • <strong>AIIA Admin</strong>
          </p>
        </div>

        {/* Hero Interactive Visual: Dashboard Preview Mockup */}
        <div id='preview' className='relative rounded-3xl border border-slate-300/80 bg-white shadow-2xl p-4 sm:p-6 overflow-hidden'>
          <div className='flex items-center justify-between pb-4 border-b border-slate-100 mb-4'>
            <div className='flex items-center gap-2'>
              <span className='w-3 h-3 rounded-full bg-rose-400' />
              <span className='w-3 h-3 rounded-full bg-amber-400' />
              <span className='w-3 h-3 rounded-full bg-emerald-400' />
              <span className='text-xs font-mono text-slate-400 ml-2'>ayurcase.aiia.gov.in/doctor/case-sheet/preview</span>
            </div>
            <span className='text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200'>
              Live AIIA System Preview
            </span>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
            {/* Left mini patient card */}
            <div className='md:col-span-4 p-5 bg-[#FAF9F6] rounded-2xl border border-slate-200'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-base'>
                  RS
                </div>
                <div>
                  <h4 className='font-bold text-slate-900 text-sm'>Rahul Sharma</h4>
                  <p className='text-xs text-slate-500'>42 yrs • Male • AYU-2026-00125</p>
                  <span className='inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-100/60 px-1.5 py-0.2 rounded mt-0.5'>
                    ✓ ABHA Verified
                  </span>
                </div>
              </div>

              <div className='space-y-2 text-xs pt-3 border-t border-slate-200'>
                <div className='flex justify-between'>
                  <span className='text-slate-500'>Prakriti:</span>
                  <strong className='text-emerald-950'>Vata-Pitta (32% / 50%)</strong>
                </div>
                <div className='flex justify-between'>
                  <span className='text-slate-500'>Vikriti:</span>
                  <strong className='text-amber-900'>Pitta ↑ (Moderate)</strong>
                </div>
                <div className='flex justify-between'>
                  <span className='text-slate-500'>Agni:</span>
                  <strong className='text-slate-900'>Tikshnagni</strong>
                </div>
                <div className='flex justify-between'>
                  <span className='text-slate-500'>Koshtha:</span>
                  <strong className='text-slate-900'>Madhyama</strong>
                </div>
                <div className='flex justify-between'>
                  <span className='text-slate-500'>Diagnosis:</span>
                  <strong className='text-emerald-900'>Urdhwaga Amlapitta</strong>
                </div>
              </div>
            </div>

            {/* Right mini Samprapti / Prescription preview */}
            <div className='md:col-span-8 space-y-4'>
              <div className='p-4 bg-emerald-50/40 rounded-2xl border border-emerald-200'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-xs font-bold uppercase text-emerald-900 tracking-wide'>Samprapti Ghataka Chain</span>
                  <span className='text-[10px] text-emerald-700'>Clinical Pathogenesis</span>
                </div>
                <div className='grid grid-cols-4 gap-2 text-center text-xs'>
                  <div className='p-2 bg-white rounded-xl border border-slate-200 shadow-xs'>
                    <span className='text-[10px] text-slate-400 block font-bold'>01 NIDANA</span>
                    <strong className='text-slate-800 text-[11px]'>Vidahi Ahara</strong>
                  </div>
                  <div className='p-2 bg-white rounded-xl border border-slate-200 shadow-xs'>
                    <span className='text-[10px] text-slate-400 block font-bold'>02 DOSHA</span>
                    <strong className='text-amber-800 text-[11px]'>Pitta Prakopa</strong>
                  </div>
                  <div className='p-2 bg-white rounded-xl border border-slate-200 shadow-xs'>
                    <span className='text-[10px] text-slate-400 block font-bold'>03 AGNI</span>
                    <strong className='text-orange-800 text-[11px]'>Tikshnagni</strong>
                  </div>
                  <div className='p-2 bg-white rounded-xl border border-slate-200 shadow-xs'>
                    <span className='text-[10px] text-slate-400 block font-bold'>04 VYADHI</span>
                    <strong className='text-emerald-800 text-[11px]'>Amlapitta</strong>
                  </div>
                </div>
              </div>

              <div className='p-4 bg-white rounded-2xl border border-slate-200'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-xs font-bold uppercase text-slate-800'>Active Herbal Prescription (Aushadhi)</span>
                  <span className='text-[10px] text-slate-500'>21-Day Course</span>
                </div>
                <div className='grid grid-cols-3 gap-2 text-xs'>
                  <div className='p-2.5 bg-slate-50 rounded-xl border border-slate-200'>
                    <p className='font-bold text-slate-900'>Avipattikar Churna</p>
                    <p className='text-[11px] text-slate-500'>3g BD before food</p>
                  </div>
                  <div className='p-2.5 bg-slate-50 rounded-xl border border-slate-200'>
                    <p className='font-bold text-slate-900'>Shankh Bhasma</p>
                    <p className='text-[11px] text-slate-500'>250mg BD with honey</p>
                  </div>
                  <div className='p-2.5 bg-slate-50 rounded-xl border border-slate-200'>
                    <p className='font-bold text-slate-900'>Kamadudha Rasa</p>
                    <p className='text-[11px] text-slate-500'>1 tab BD with milk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section id='features' className='py-20 bg-white border-y border-slate-200/80 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center max-w-2xl mx-auto mb-16'>
            <span className='text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200'>
              Full Clinical Capability
            </span>
            <h2 className='text-3xl font-extrabold font-serif text-slate-900 mt-3'>
              Tailored for Ayurvedic Clinical Excellence
            </h2>
            <p className='text-sm text-slate-500 mt-2'>
              Designed to preserve classical Ayurvedic rigor while delivering a frictionless, modern medical SaaS experience.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className='p-6 rounded-2xl bg-[#FAF9F6] border border-slate-200/80 hover:border-emerald-500/50 hover:shadow-card transition-all'>
                  <div className='w-11 h-11 rounded-xl bg-emerald-100/80 text-[#1B4332] flex items-center justify-center mb-4'>
                    <Icon className='w-5 h-5' />
                  </div>
                  <h3 className='text-base font-bold text-slate-900 mb-1.5'>{feat.title}</h3>
                  <p className='text-xs text-slate-600 leading-relaxed'>{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6-Step Workflow */}
      <section id='how-it-works' className='py-20 px-6 max-w-7xl mx-auto'>
        <div className='text-center max-w-2xl mx-auto mb-16'>
          <span className='text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200'>
            Standard Operating Procedure
          </span>
          <h2 className='text-3xl font-extrabold font-serif text-slate-900 mt-3'>
            How AyurCase Powers Daily OPD
          </h2>
          <p className='text-sm text-slate-500 mt-2'>
            A streamlined 6-step flow tested for hospital outpatient speed and institutional compliance.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {steps.map((st) => (
            <div key={st.num} className='p-6 bg-white rounded-2xl border border-slate-200 shadow-soft'>
              <div className='text-2xl font-black text-emerald-800 font-serif mb-2'>{st.num}</div>
              <h3 className='text-sm font-bold text-slate-900 mb-1'>{st.title}</h3>
              <p className='text-xs text-slate-500 leading-relaxed'>{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-[#143828] text-white pt-12 pb-8 px-6 border-t border-emerald-900/50'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pb-8 border-b border-emerald-800/40 gap-6'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center'>
              <HeartPulse className='w-6 h-6' />
            </div>
            <div>
              <p className='font-bold text-lg font-serif'>AyurCase</p>
              <p className='text-xs text-emerald-200/70'>Ministry of Ayush / AIIA Patient Case Management System</p>
            </div>
          </div>

          <div className='flex items-center gap-4 text-xs font-medium text-emerald-200/80'>
            <Link to='/doctor/dashboard' className='hover:text-white transition-colors'>Doctor Dashboard</Link>
            <Link to='/patient/dashboard' className='hover:text-white transition-colors'>Patient Portal</Link>
            <Link to='/admin/dashboard' className='hover:text-white transition-colors'>Admin Authority</Link>
            <Link to='/login' className='hover:text-white transition-colors'>Sign In</Link>
          </div>
        </div>

        <div className='max-w-7xl mx-auto mt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-300/50'>
          <p>© 2026 AyurCase. Built for Smart India Hackathon (SIH 2026 - Problem Statement SIH26047).</p>
          <p>National Institute of Ayurveda & AIIA Standards Compliant Architecture.</p>
        </div>
      </footer>

      <DemoSwitcher />
    </div>
  );
};
