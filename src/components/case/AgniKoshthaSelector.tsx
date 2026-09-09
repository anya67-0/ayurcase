import React from 'react';
import { AgniType, KoshthaType } from '../../types';
import { Flame, Wind, Droplets, CheckCircle2 } from 'lucide-react';

interface Props {
  agni: AgniType;
  koshtha: KoshthaType;
  onAgniChange: (agni: AgniType) => void;
  onKoshthaChange: (koshtha: KoshthaType) => void;
}

export const AgniKoshthaSelector: React.FC<Props> = ({
  agni,
  koshtha,
  onAgniChange,
  onKoshthaChange
}) => {
  const agniOptions = [
    {
      type: 'Sama' as AgniType,
      title: 'Samagni',
      subtitle: 'Balanced Digestive Fire',
      desc: 'Normal timely digestion without gas, burning, or heaviness. Tridosha equilibrium.',
      icon: CheckCircle2,
      color: 'border-emerald-500 bg-emerald-50/50 text-emerald-900'
    },
    {
      type: 'Vishama' as AgniType,
      title: 'Vishamagni',
      subtitle: 'Irregular / Variable Agni',
      desc: 'Variable digestion: sometimes quick, sometimes sluggish. Marked bloating & gas (Vata predominance).',
      icon: Wind,
      color: 'border-sky-500 bg-sky-50/50 text-sky-900'
    },
    {
      type: 'Tikshna' as AgniType,
      title: 'Tikshnagni',
      subtitle: 'Hyperactive / Sharp Fire',
      desc: 'Intense ravenous appetite, burns food too fast. Heartburn, thirst, hot flushes (Pitta predominance).',
      icon: Flame,
      color: 'border-amber-500 bg-amber-50/50 text-amber-900'
    },
    {
      type: 'Manda' as AgniType,
      title: 'Mandagni',
      subtitle: 'Sluggish / Hypoactive Fire',
      desc: 'Poor appetite, slow delayed digestion, heaviness in abdomen, lethargy after meals (Kapha predominance).',
      icon: Droplets,
      color: 'border-teal-500 bg-teal-50/50 text-teal-900'
    }
  ];

  const koshthaOptions = [
    {
      type: 'Mridu' as KoshthaType,
      title: 'Mridu Koshtha',
      subtitle: 'Soft / Sensitive Bowel',
      desc: 'Easily evacuated; mildest stimulants (warm milk, raisins, ghee) cause soft loose stools (Pitta dominant).'
    },
    {
      type: 'Madhyama' as KoshthaType,
      title: 'Madhyama Koshtha',
      subtitle: 'Moderate / Normal Bowel',
      desc: 'Normal daily evacuation with well-formed stools; requires moderate laxative if constipated.'
    },
    {
      type: 'Krura' as KoshthaType,
      title: 'Krura Koshtha',
      subtitle: 'Hard / Constipated Bowel',
      desc: 'Dry, hard, infrequent stools; difficult evacuation requiring potent herbal anulomana / virechana (Vata dominant).'
    }
  ];

  return (
    <div className='space-y-8'>
      <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-soft'>
        <div className='mb-4'>
          <div className='flex items-center gap-2'>
            <h3 className='text-base font-bold text-slate-900'>Agni Pariksha (Digestive Metabolism)</h3>
            <span className='bg-amber-50 text-amber-800 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-amber-200'>
              Key Biomarker
            </span>
          </div>
          <p className='text-xs text-slate-500 mt-0.5'>
            Select the patient\'s presenting digestive capacity (Jatharagni status) for medicine dosage calculation.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {agniOptions.map((opt) => {
            const isSelected = agni === opt.type;
            const Icon = opt.icon;

            return (
              <div
                key={opt.type}
                onClick={() => onAgniChange(opt.type)}
                className={'p-4 rounded-2xl border-2 cursor-pointer transition-all ' + (
                  isSelected
                    ? opt.color + ' shadow-md'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                )}
              >
                <div className='flex items-center justify-between mb-2'>
                  <div className={'w-8 h-8 rounded-xl flex items-center justify-center ' + (isSelected ? 'bg-white/80 shadow-xs' : 'bg-slate-100 text-slate-600')}>
                    <Icon className='w-4 h-4' />
                  </div>
                  {isSelected && (
                    <span className='text-[10px] font-bold uppercase tracking-wider bg-white/90 px-2 py-0.5 rounded-md shadow-xs'>
                      Selected
                    </span>
                  )}
                </div>

                <h4 className='text-sm font-bold'>{opt.title}</h4>
                <p className='text-[11px] font-semibold opacity-80 mb-1.5'>{opt.subtitle}</p>
                <p className='text-xs opacity-75 leading-relaxed'>{opt.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-soft'>
        <div className='mb-4'>
          <div className='flex items-center gap-2'>
            <h3 className='text-base font-bold text-slate-900'>Koshtha Pariksha (Alimentary Nature)</h3>
            <span className='bg-sky-50 text-sky-800 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-sky-200'>
              Bowel Evacuation
            </span>
          </div>
          <p className='text-xs text-slate-500 mt-0.5'>
            Assess bowel motility and response to lubricants to determine proper Anupana and Aushadhi dosage.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {koshthaOptions.map((opt) => {
            const isSelected = koshtha === opt.type;

            return (
              <div
                key={opt.type}
                onClick={() => onKoshthaChange(opt.type)}
                className={'p-4 rounded-2xl border-2 cursor-pointer transition-all ' + (
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                )}
              >
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-xs font-bold text-slate-400'>Option {opt.type}</span>
                  {isSelected && (
                    <span className='text-[10px] font-bold uppercase tracking-wider bg-emerald-700 text-white px-2 py-0.5 rounded-md'>
                      Selected
                    </span>
                  )}
                </div>

                <h4 className='text-sm font-bold text-slate-900'>{opt.title}</h4>
                <p className='text-[11px] font-semibold text-emerald-800 mb-1'>{opt.subtitle}</p>
                <p className='text-xs text-slate-600 leading-relaxed'>{opt.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
