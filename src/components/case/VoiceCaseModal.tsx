import React, { useState, useEffect } from 'react';
import { Mic, Square, Sparkles, AlertCircle, RefreshCw, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApplyExtracted: (data: any) => void;
}

export const VoiceCaseModal: React.FC<Props> = ({ isOpen, onClose, onApplyExtracted }) => {
  const [state, setState] = useState<'idle' | 'recording' | 'processing' | 'completed'>('idle');
  const [seconds, setSeconds] = useState(0);

  const [extractedData, setExtractedData] = useState({
    complaint: 'Severe acidity, heartburn behind breastbone, and sour belching for 3 months',
    duration: '3 months',
    severity: 7,
    onset: 'Gradual',
    appetite: 'High with burning sensation after meals',
    sleep: '5.5 hours, disturbed around 2 AM',
    suspectedPrakriti: 'Pitta-Vata',
    suspectedAgni: 'Tikshna',
    suspectedKoshtha: 'Madhyama',
    dietHetus: 'Spicy curries, late night dinners, 3 cups coffee daily'
  });

  useEffect(() => {
    let timer: any;
    if (state === 'recording') {
      timer = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(timer);
  }, [state]);

  if (!isOpen) return null;

  const handleStartRecording = () => {
    setState('recording');
  };

  const handleStopRecording = () => {
    setState('processing');
    setTimeout(() => {
      setState('completed');
    }, 2200);
  };

  const handleApply = () => {
    onApplyExtracted(extractedData);
    onClose();
  };

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return mins.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200'>
      <div className='bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative'>
        <button
          onClick={onClose}
          className='absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors'
        >
          <X className='w-5 h-5' />
        </button>

        <div className='flex items-center gap-2.5 pb-4 border-b border-slate-100'>
          <div className='w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center'>
            <Mic className='w-5 h-5' />
          </div>
          <div>
            <h2 className='text-base font-bold text-slate-900'>AyurVoice Case Intake</h2>
            <p className='text-xs text-slate-500'>
              Speak clinical observations naturally; AyurCase extracts structured Ayurvedic parameters.
            </p>
          </div>
        </div>

        <div className='py-8 flex flex-col items-center justify-center'>
          {state === 'idle' && (
            <div className='text-center'>
              <button
                onClick={handleStartRecording}
                className='w-20 h-20 rounded-full bg-[#1B4332] text-white flex items-center justify-center shadow-lg hover:bg-[#143828] hover:scale-105 transition-all mx-auto group'
              >
                <Mic className='w-8 h-8 group-hover:scale-110 transition-transform' />
              </button>
              <p className='text-xs font-semibold text-slate-700 mt-3'>Click to Start Voice Recording</p>
              <p className='text-[11px] text-slate-400 mt-0.5'>Example: \'Patient reports 3 months of severe acidity, heartburn, and irregular sleep...\'</p>
            </div>
          )}

          {state === 'recording' && (
            <div className='text-center'>
              <div className='flex items-center justify-center gap-1.5 h-16 mb-4'>
                <div className='w-1.5 bg-emerald-600 rounded-full animate-wave-1' />
                <div className='w-1.5 bg-emerald-600 rounded-full animate-wave-2' />
                <div className='w-1.5 bg-emerald-500 rounded-full animate-wave-3' />
                <div className='w-1.5 bg-emerald-600 rounded-full animate-wave-4' />
                <div className='w-1.5 bg-emerald-700 rounded-full animate-wave-5' />
                <div className='w-1.5 bg-emerald-500 rounded-full animate-wave-2' />
                <div className='w-1.5 bg-emerald-600 rounded-full animate-wave-4' />
                <div className='w-1.5 bg-emerald-700 rounded-full animate-wave-1' />
              </div>

              <span className='font-mono text-xl font-bold text-emerald-800'>{formatTime(seconds)}</span>
              <p className='text-xs text-emerald-600 font-medium mt-1'>Listening & Transcribing Consultation...</p>

              <button
                onClick={handleStopRecording}
                className='mt-4 flex items-center gap-2 bg-rose-600 text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-rose-700 shadow-md transition-all mx-auto'
              >
                <Square className='w-4 h-4 fill-white' />
                <span>Stop & Structure Case</span>
              </button>
            </div>
          )}

          {state === 'processing' && (
            <div className='text-center py-4'>
              <RefreshCw className='w-10 h-10 text-emerald-600 animate-spin mx-auto mb-3' />
              <p className='text-sm font-bold text-slate-800'>Processing Clinical Speech...</p>
              <p className='text-xs text-slate-500 mt-1'>Extracting Roga Nidana, Agni, and Ahara-Vihara parameters</p>
            </div>
          )}

          {state === 'completed' && (
            <div className='w-full'>
              <div className='flex items-center justify-between mb-3 bg-emerald-50 text-emerald-900 px-3.5 py-2 rounded-xl border border-emerald-200'>
                <div className='flex items-center gap-2 text-xs font-semibold'>
                  <Sparkles className='w-4 h-4 text-emerald-700' />
                  <span>AI-Structured Ayurvedic Case Information</span>
                </div>
                <button
                  onClick={() => setState('idle')}
                  className='text-[11px] text-emerald-700 hover:underline font-medium'
                >
                  Record Again
                </button>
              </div>

              <div className='space-y-3 max-h-72 overflow-y-auto pr-1'>
                <div>
                  <label className='block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1'>
                    Chief Complaints (Roga Lakshana)
                  </label>
                  <input
                    type='text'
                    value={extractedData.complaint}
                    onChange={(e) => setExtractedData({ ...extractedData, complaint: e.target.value })}
                    className='w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600'
                  />
                </div>

                <div className='grid grid-cols-3 gap-2'>
                  <div>
                    <label className='block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1'>
                      Duration
                    </label>
                    <input
                      type='text'
                      value={extractedData.duration}
                      onChange={(e) => setExtractedData({ ...extractedData, duration: e.target.value })}
                      className='w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg'
                    />
                  </div>
                  <div>
                    <label className='block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1'>
                      Severity (1-10)
                    </label>
                    <input
                      type='number'
                      min='1'
                      max='10'
                      value={extractedData.severity}
                      onChange={(e) => setExtractedData({ ...extractedData, severity: parseInt(e.target.value) })}
                      className='w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg'
                    />
                  </div>
                  <div>
                    <label className='block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1'>
                      Agni Biomarker
                    </label>
                    <input
                      type='text'
                      value={extractedData.suspectedAgni}
                      onChange={(e) => setExtractedData({ ...extractedData, suspectedAgni: e.target.value })}
                      className='w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1'>
                    Nidana & Ahara Hetus (Identified Diet/Lifestyle Causes)
                  </label>
                  <input
                    type='text'
                    value={extractedData.dietHetus}
                    onChange={(e) => setExtractedData({ ...extractedData, dietHetus: e.target.value })}
                    className='w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg'
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <div className='flex items-center gap-1.5 text-[11px] text-slate-500'>
            <AlertCircle className='w-3.5 h-3.5 text-amber-500 shrink-0' />
            <span>SIH Prototype Demonstration: Review parameters before syncing with Case Sheet.</span>
          </div>

          <div className='flex items-center gap-2'>
            <button
              onClick={onClose}
              className='px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors'
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={state !== 'completed'}
              className={'px-5 py-2 text-xs font-bold rounded-xl transition-all ' + (
                state === 'completed'
                  ? 'bg-[#1B4332] text-white hover:bg-[#143828] shadow-sm'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              )}
            >
              Save to Case Sheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
