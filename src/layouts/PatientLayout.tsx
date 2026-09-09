import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Topbar } from '../components/common/Topbar';
import { DemoSwitcher } from '../components/common/DemoSwitcher';

export const PatientLayout: React.FC = () => {
  return (
    <div className='min-h-screen bg-[#FAF9F6] flex'>
      <Sidebar />
      <div className='flex-1 ml-64 flex flex-col min-w-0'>
        <Topbar />
        <main className='flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto'>
          <Outlet />
        </main>
      </div>
      <DemoSwitcher />
    </div>
  );
};
