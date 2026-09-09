import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, UserPlus, ArrowUpRight, FileSpreadsheet, ShieldCheck, Download } from 'lucide-react';
import { storageService } from '../../services/storageService';
import { Badge } from '../../components/common/Badge';

export const PatientDirectoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(storageService.getPatients());
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');
  const [prakritiFilter, setPrakritiFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mobile.includes(searchQuery) ||
      p.abhaId.includes(searchQuery);

    const matchesGender = genderFilter === 'All' || p.gender === genderFilter;
    const matchesPrakriti = prakritiFilter === 'All' || p.prakriti.includes(prakritiFilter);
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;

    return matchesSearch && matchesGender && matchesPrakriti && matchesStatus;
  });

  return (
    <div className='space-y-6'>
      {/* Top Header */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4'>
        <div>
          <h1 className='text-2xl font-bold font-serif text-slate-900'>Patient Directory</h1>
          <p className='text-xs text-slate-500 mt-0.5'>
            Centralized Ayurvedic Case Records & Outpatient Registry • AIIA
          </p>
        </div>

        <button
          onClick={() => navigate('/doctor/patients/new')}
          className='flex items-center gap-1.5 bg-[#1B4332] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#143828] shadow-sm transition-all'
        >
          <UserPlus className='w-4 h-4' />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* Search Bar & Filter Strip */}
      <div className='bg-white p-4 rounded-2xl border border-slate-200 shadow-soft space-y-3'>
        <div className='relative'>
          <Search className='w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2' />
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search by Patient Name, Patient ID, Mobile Number or ABHA ID...'
            className='w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600'
          />
        </div>

        <div className='flex flex-wrap items-center gap-3 text-xs'>
          <div className='flex items-center gap-1.5 text-slate-500'>
            <Filter className='w-3.5 h-3.5' />
            <span className='font-semibold'>Filters:</span>
          </div>

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className='px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700'
          >
            <option value='All'>All Genders</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>

          <select
            value={prakritiFilter}
            onChange={(e) => setPrakritiFilter(e.target.value)}
            className='px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700'
          >
            <option value='All'>All Prakritis</option>
            <option value='Vata'>Vata Predominant</option>
            <option value='Pitta'>Pitta Predominant</option>
            <option value='Kapha'>Kapha Predominant</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700'
          >
            <option value='All'>All Statuses</option>
            <option value='Active'>Active</option>
            <option value='Follow-up'>Follow-up</option>
            <option value='Discharged'>Discharged</option>
          </select>

          {(searchQuery || genderFilter !== 'All' || prakritiFilter !== 'All' || statusFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setGenderFilter('All');
                setPrakritiFilter('All');
                setStatusFilter('All');
              }}
              className='text-[11px] text-emerald-700 hover:underline font-semibold ml-auto'
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Patient Data Table */}
      <div className='bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-xs text-left'>
            <thead className='bg-[#FAF9F6] text-[10px] uppercase font-bold text-slate-500 border-b border-slate-200'>
              <tr>
                <th className='p-3.5'>Patient ID</th>
                <th className='p-3.5'>Patient Name</th>
                <th className='p-3.5'>Age / Gender</th>
                <th className='p-3.5'>Prakriti</th>
                <th className='p-3.5'>ABHA Status</th>
                <th className='p-3.5'>Last Visit</th>
                <th className='p-3.5'>Status</th>
                <th className='p-3.5 text-right'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100'>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={8} className='p-8 text-center text-slate-400'>
                    No patient records match the specified search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => navigate('/doctor/patients/' + p.id)}
                    className='hover:bg-emerald-50/20 cursor-pointer transition-colors'
                  >
                    <td className='p-3.5 font-mono font-bold text-emerald-900'>{p.id}</td>
                    <td className='p-3.5 font-bold text-slate-900'>
                      <div>{p.name}</div>
                      <div className='text-[11px] text-slate-400 font-normal'>{p.mobile}</div>
                    </td>
                    <td className='p-3.5 text-slate-600'>{p.age} yrs • {p.gender}</td>
                    <td className='p-3.5 font-semibold text-emerald-800'>{p.prakriti}</td>
                    <td className='p-3.5'>
                      {p.abhaVerified ? (
                        <span className='inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold'>
                          ✓ Verified
                        </span>
                      ) : (
                        <span className='text-[10px] text-slate-400'>Unlinked</span>
                      )}
                    </td>
                    <td className='p-3.5 text-slate-500'>{p.lastVisit}</td>
                    <td className='p-3.5'>
                      <Badge variant={p.status === 'Active' ? 'green' : 'amber'} size='sm'>
                        {p.status}
                      </Badge>
                    </td>
                    <td className='p-3.5 text-right' onClick={(e) => e.stopPropagation()}>
                      <div className='flex items-center justify-end gap-1.5'>
                        <button
                          onClick={() => navigate('/doctor/patients/' + p.id)}
                          className='p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg'
                          title='View Profile'
                        >
                          <ArrowUpRight className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => navigate('/doctor/case/new?patientId=' + p.id)}
                          className='px-2.5 py-1 bg-[#1B4332] text-white rounded-lg text-[11px] font-bold hover:bg-[#143828] transition-colors'
                        >
                          Start Case
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
