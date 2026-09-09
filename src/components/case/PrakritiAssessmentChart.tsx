import React from 'react';
import { PrakritiAssessment, PrakritiType } from '../../types';
import { Info, Sparkles, Sliders } from 'lucide-react';

interface Props {
  value: PrakritiAssessment;
  onChange: (val: PrakritiAssessment) => void;
}

export const PrakritiAssessmentChart: React.FC<Props> = ({ value, onChange }) => {
  const { scores, percentages, dominantPrakriti, doctorNotes } = value;

  const handleScoreChange = (dosha: 'vata' | 'pitta' | 'kapha', newScore: number) => {
    const updatedScores = { ...scores, [dosha]: Math.max(0, Math.min(20, newScore)) };
    const total = updatedScores.vata + updatedScores.pitta + updatedScores.kapha || 1;
    
    const vataPct = Math.round((updatedScores.vata / total) * 100);
    const pittaPct = Math.round((updatedScores.pitta / total) * 100);
    const kaphaPct = 100 - (vataPct + pittaPct);

    let dominant: PrakritiType = 'Vata';
    const sorted = [
      { name: 'Vata', pct: vataPct },
      { name: 'Pitta', pct: pittaPct },
      { name: 'Kapha', pct: kaphaPct }
    ].sort((a, b) => b.pct - a.pct);

    if (sorted[0].pct >= 60) {
      dominant = sorted[0].name as PrakritiType;
    } else if (sorted[0].pct - sorted[1].pct <= 15) {
      dominant = (sorted[0].name + '-' + sorted[1].name) as PrakritiType;
    } else {
      dominant = sorted[0].name as PrakritiType;
    }

    onChange({
      ...value,
      scores: updatedScores,
      percentages: { vata: vataPct, pitta: pittaPct, kapha: kaphaPct },
      dominantPrakriti: dominant
    });
  };

  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const vataOffset = 0;
  const vataStroke = (percentages.vata / 100) * circumference;

  const pittaOffset = -(vataStroke);
  const pittaStroke = (percentages.pitta / 100) * circumference;

  const kaphaOffset = -(vataStroke + pittaStroke);
  const kaphaStroke = (percentages.kapha / 100) * circumference;

  return (
    <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-soft'>
      <div className='flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3'>
        <div>
          <div className='flex items-center gap-2'>
            <h3 className='text-base font-bold text-slate-900'>Deha Prakriti Assessment</h3>
            <span className='bg-emerald-50 text-emerald-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200'>
              Constitutional Baseline
            </span>
          </div>
          <p className='text-xs text-slate-500 mt-0.5'>
            Diagnostic Tri-Dosha balance recorded according to Sharira Lakshanas (Physical & Mental Constitution).
          </p>
        </div>

        <div className='flex items-center gap-2 bg-emerald-50/80 border border-emerald-200/80 px-3.5 py-2 rounded-xl'>
          <Sparkles className='w-4 h-4 text-emerald-700' />
          <div className='text-right sm:text-left'>
            <span className='text-[10px] uppercase tracking-wider text-emerald-800 font-bold block'>Dominant Prakriti</span>
            <span className='text-sm font-extrabold text-emerald-950 font-serif'>{dominantPrakriti}</span>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-12 gap-8 py-6 items-center'>
        <div className='md:col-span-5 flex flex-col items-center justify-center'>
          <div className='relative w-44 h-44 flex items-center justify-center'>
            <svg className='w-full h-full -rotate-90 transform' viewBox='0 0 160 160'>
              <circle cx='80' cy='80' r={radius} fill='transparent' stroke='#F1F5F9' strokeWidth='18' />
              <circle
                cx='80'
                cy='80'
                r={radius}
                fill='transparent'
                stroke='#0EA5E9'
                strokeWidth='18'
                strokeDasharray={vataStroke + ' ' + circumference}
                strokeDashoffset={vataOffset}
                strokeLinecap='round'
                className='transition-all duration-500'
              />
              <circle
                cx='80'
                cy='80'
                r={radius}
                fill='transparent'
                stroke='#F59E0B'
                strokeWidth='18'
                strokeDasharray={pittaStroke + ' ' + circumference}
                strokeDashoffset={pittaOffset}
                strokeLinecap='round'
                className='transition-all duration-500'
              />
              <circle
                cx='80'
                cy='80'
                r={radius}
                fill='transparent'
                stroke='#10B981'
                strokeWidth='18'
                strokeDasharray={kaphaStroke + ' ' + circumference}
                strokeDashoffset={kaphaOffset}
                strokeLinecap='round'
                className='transition-all duration-500'
              />
            </svg>

            <div className='absolute text-center'>
              <span className='text-[10px] text-slate-400 font-medium uppercase tracking-wider block'>Balance</span>
              <span className='text-xs font-bold text-slate-800'>{dominantPrakriti}</span>
            </div>
          </div>

          <div className='flex items-center justify-center gap-4 mt-4 text-xs'>
            <div className='flex items-center gap-1.5'>
              <span className='w-3 h-3 rounded-full bg-sky-500' />
              <span className='font-medium text-slate-700'>Vata {percentages.vata}%</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='w-3 h-3 rounded-full bg-amber-500' />
              <span className='font-medium text-slate-700'>Pitta {percentages.pitta}%</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='w-3 h-3 rounded-full bg-emerald-500' />
              <span className='font-medium text-slate-700'>Kapha {percentages.kapha}%</span>
            </div>
          </div>
        </div>

        <div className='md:col-span-7 space-y-4'>
          <div className='flex items-center justify-between text-xs text-slate-500 font-medium'>
            <span>Dosha Characteristic Rating (0 - 20)</span>
            <span className='flex items-center gap-1 text-emerald-700'><Sliders className='w-3.5 h-3.5' /> Interactive Adjust</span>
          </div>

          <div className='p-3 bg-sky-50/50 rounded-xl border border-sky-100'>
            <div className='flex justify-between text-xs font-semibold text-sky-900 mb-1.5'>
              <span className='flex items-center gap-1.5'>
                <span className='w-2 h-2 rounded-full bg-sky-500' />
                Vata Dosha (Air & Ether)
              </span>
              <span>Score: {scores.vata} ({percentages.vata}%)</span>
            </div>
            <input
              type='range'
              min='0'
              max='20'
              value={scores.vata}
              onChange={(e) => handleScoreChange('vata', parseInt(e.target.value))}
              className='w-full accent-sky-600 h-1.5 bg-sky-200 rounded-lg cursor-pointer'
            />
            <p className='text-[10px] text-sky-700 mt-1'>Light, dry, cold, rough, mobile; governs nervous transmission & movement.</p>
          </div>

          <div className='p-3 bg-amber-50/50 rounded-xl border border-amber-100'>
            <div className='flex justify-between text-xs font-semibold text-amber-900 mb-1.5'>
              <span className='flex items-center gap-1.5'>
                <span className='w-2 h-2 rounded-full bg-amber-500' />
                Pitta Dosha (Fire & Water)
              </span>
              <span>Score: {scores.pitta} ({percentages.pitta}%)</span>
            </div>
            <input
              type='range'
              min='0'
              max='20'
              value={scores.pitta}
              onChange={(e) => handleScoreChange('pitta', parseInt(e.target.value))}
              className='w-full accent-amber-500 h-1.5 bg-amber-200 rounded-lg cursor-pointer'
            />
            <p className='text-[10px] text-amber-700 mt-1'>Hot, sharp, light, oily, spreading; governs digestion, heat & intellect.</p>
          </div>

          <div className='p-3 bg-emerald-50/50 rounded-xl border border-emerald-100'>
            <div className='flex justify-between text-xs font-semibold text-emerald-900 mb-1.5'>
              <span className='flex items-center gap-1.5'>
                <span className='w-2 h-2 rounded-full bg-emerald-500' />
                Kapha Dosha (Water & Earth)
              </span>
              <span>Score: {scores.kapha} ({percentages.kapha}%)</span>
            </div>
            <input
              type='range'
              min='0'
              max='20'
              value={scores.kapha}
              onChange={(e) => handleScoreChange('kapha', parseInt(e.target.value))}
              className='w-full accent-emerald-600 h-1.5 bg-emerald-200 rounded-lg cursor-pointer'
            />
            <p className='text-[10px] text-emerald-700 mt-1'>Heavy, slow, cold, oily, dense; governs structural stability, lubrication & immunity.</p>
          </div>
        </div>
      </div>

      <div className='mt-4 pt-4 border-t border-slate-100 space-y-3'>
        <div>
          <label className='block text-xs font-semibold text-slate-700 mb-1'>
            Practitioner Assessment Notes
          </label>
          <textarea
            value={doctorNotes}
            onChange={(e) => onChange({ ...value, doctorNotes: e.target.value })}
            placeholder='Record specific diagnostic traits (e.g. skin texture, appetite pattern, pulse qualities) observed during physical examination...'
            rows={2}
            className='w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600'
          />
        </div>

        <div className='flex items-start gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-600'>
          <Info className='w-4 h-4 text-emerald-700 shrink-0 mt-0.5' />
          <p>
            <strong>Standard Ayush Practice:</strong> Deha Prakriti is recorded once at birth and remains unchanging throughout life. Acute disease symptoms represent <em>Vikriti</em> (pathological deviation) rather than natural Prakriti.
          </p>
        </div>
      </div>
    </div>
  );
};
