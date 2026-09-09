import React, { useState } from 'react';
import { SampraptiNode } from '../../types';
import { ArrowDown, Plus, Edit2, Check } from 'lucide-react';

interface Props {
  nodes: SampraptiNode[];
  onChange: (nodes: SampraptiNode[]) => void;
}

export const SampraptiFlow: React.FC<Props> = ({ nodes, onChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editDosha, setEditDosha] = useState('');
  const [editSrotas, setEditSrotas] = useState('');

  const handleStartEdit = (node: SampraptiNode) => {
    setEditingId(node.id);
    setEditTitle(node.title);
    setEditDesc(node.description);
    setEditDosha(node.doshaInvolved || '');
    setEditSrotas(node.srotasInvolved || '');
  };

  const handleSaveEdit = (id: string) => {
    const updated = nodes.map(n => {
      if (n.id === id) {
        return {
          ...n,
          title: editTitle,
          description: editDesc,
          doshaInvolved: editDosha || undefined,
          srotasInvolved: editSrotas || undefined,
        };
      }
      return n;
    });
    onChange(updated);
    setEditingId(null);
  };

  const handleAddStep = () => {
    const newNode: SampraptiNode = {
      id: 'sam-' + Date.now(),
      stage: 'Dosha Prakopa',
      title: 'Additional Pathogenesis Factor',
      description: 'Describe cellular/srotas progression...',
      doshaInvolved: 'Tridosha'
    };
    onChange([...nodes, newNode]);
  };

  const stageColorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
    'Nidana': { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', badge: 'bg-amber-100' },
    'Dosha Prakopa': { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-800', badge: 'bg-rose-100' },
    'Agni Dushti': { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', badge: 'bg-orange-100' },
    'Srotas Dushti': { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', badge: 'bg-purple-100' },
    'Disease Manifestation': { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', badge: 'bg-emerald-100' }
  };

  return (
    <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-soft'>
      <div className='flex items-center justify-between pb-4 border-b border-slate-100 mb-6'>
        <div>
          <div className='flex items-center gap-2'>
            <h3 className='text-base font-bold text-slate-900'>Samprapti Ghataka (Pathogenesis Flow)</h3>
            <span className='bg-emerald-50 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200'>
              Clinical Path
            </span>
          </div>
          <p className='text-xs text-slate-500 mt-0.5'>
            Sequential progression from etiological nidana to systemic dosha vitiation, agni impairment, and manifestation.
          </p>
        </div>

        <button
          type='button'
          onClick={handleAddStep}
          className='flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors'
        >
          <Plus className='w-3.5 h-3.5' />
          <span>Add Custom Stage</span>
        </button>
      </div>

      <div className='max-w-2xl mx-auto space-y-3'>
        {nodes.map((node, index) => {
          const colors = stageColorMap[node.stage] || stageColorMap['Dosha Prakopa'];
          const isEditing = editingId === node.id;

          return (
            <React.Fragment key={node.id}>
              <div className={'p-4 rounded-2xl border transition-all ' + colors.bg + ' ' + colors.border + ' shadow-xs relative'}>
                <div className='flex items-start justify-between gap-3'>
                  <div className='flex items-center gap-2'>
                    <span className='w-6 h-6 rounded-full bg-white text-slate-800 text-xs font-bold flex items-center justify-center border border-slate-200'>
                      0{index + 1}
                    </span>
                    <span className={'text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ' + colors.badge + ' ' + colors.text}>
                      {node.stage}
                    </span>
                  </div>

                  <div className='flex items-center gap-1'>
                    {isEditing ? (
                      <button
                        type='button'
                        onClick={() => handleSaveEdit(node.id)}
                        className='p-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-xs flex items-center gap-1 px-2'
                      >
                        <Check className='w-3.5 h-3.5' />
                        <span>Save</span>
                      </button>
                    ) : (
                      <button
                        type='button'
                        onClick={() => handleStartEdit(node)}
                        className='p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-white/80 transition-colors'
                        title='Edit stage details'
                      >
                        <Edit2 className='w-3.5 h-3.5' />
                      </button>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <div className='mt-3 space-y-2 text-xs'>
                    <input
                      type='text'
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder='Stage Title'
                      className='w-full p-2 bg-white border border-slate-300 rounded-lg font-semibold'
                    />
                    <textarea
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      placeholder='Stage Description'
                      rows={2}
                      className='w-full p-2 bg-white border border-slate-300 rounded-lg'
                    />
                    <div className='grid grid-cols-2 gap-2'>
                      <input
                        type='text'
                        value={editDosha}
                        onChange={(e) => setEditDosha(e.target.value)}
                        placeholder='Dosha involved'
                        className='p-1.5 bg-white border border-slate-300 rounded-lg'
                      />
                      <input
                        type='text'
                        value={editSrotas}
                        onChange={(e) => setEditSrotas(e.target.value)}
                        placeholder='Srotas involved'
                        className='p-1.5 bg-white border border-slate-300 rounded-lg'
                      />
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 text-xs'>
                    <h4 className='font-bold text-slate-900 text-sm'>{node.title}</h4>
                    <p className='text-slate-600 mt-1 leading-relaxed'>{node.description}</p>
                    
                    {(node.doshaInvolved || node.srotasInvolved) && (
                      <div className='flex items-center gap-2 mt-2 pt-2 border-t border-slate-200/60 text-[11px]'>
                        {node.doshaInvolved && (
                          <span className='inline-flex items-center gap-1 text-slate-600 bg-white/70 px-2 py-0.5 rounded-md border border-slate-200'>
                            <strong>Dosha:</strong> {node.doshaInvolved}
                          </span>
                        )}
                        {node.srotasInvolved && (
                          <span className='inline-flex items-center gap-1 text-slate-600 bg-white/70 px-2 py-0.5 rounded-md border border-slate-200'>
                            <strong>Srotas:</strong> {node.srotasInvolved}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {index < nodes.length - 1 && (
                <div className='flex justify-center py-0.5'>
                  <div className='w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400'>
                    <ArrowDown className='w-3.5 h-3.5' />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
