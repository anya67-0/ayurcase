import React from 'react';
import { Activity, TrendingUp, PieChart, Users, CheckCircle2 } from 'lucide-react';

export const ReportsAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold font-serif text-slate-900">Clinical Analytics & Disease Trends</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Epidemiological Dosha prevalence and treatment response patterns • AIIA Department of Kayachikitsa
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Most Prevalent Vyadhis</span>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Amlapitta (GERD / Dyspepsia)</span>
                <span className="text-emerald-800 font-bold">38%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '38%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Sandhigata Vata (Osteoarthritis)</span>
                <span className="text-amber-800 font-bold">29%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '29%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Prameha (Type 2 Diabetes)</span>
                <span className="text-sky-800 font-bold">18%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '18%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Prakriti Distribution</span>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
              <span>Vata-Pitta / Pitta-Vata</span>
              <strong className="text-slate-800">42% of OPD</strong>
            </div>
            <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
              <span>Pitta-Kapha</span>
              <strong className="text-slate-800">31% of OPD</strong>
            </div>
            <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
              <span>Kapha-Vata</span>
              <strong className="text-slate-800">27% of OPD</strong>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">ABHA Digital Health Index</span>
          <div className="text-center py-4">
            <div className="text-3xl font-extrabold font-serif text-emerald-800">92.4%</div>
            <p className="text-xs text-slate-500 mt-1">Patients linked with ABHA Health ID</p>
            <span className="inline-block mt-3 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-[11px] font-bold border border-emerald-200">
              National ABDM Tier-1 Compliant
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
