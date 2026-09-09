import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { DoctorLayout } from './layouts/DoctorLayout';
import { PatientLayout } from './layouts/PatientLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DoctorRegisterPage } from './pages/DoctorRegisterPage';
import { PatientRegisterPage } from './pages/PatientRegisterPage';

// Doctor Pages
import { DoctorDashboardPage } from './pages/doctor/DoctorDashboardPage';
import { PatientDirectoryPage } from './pages/doctor/PatientDirectoryPage';
import { PatientProfilePage } from './pages/doctor/PatientProfilePage';
import { CaseWizardPage } from './pages/doctor/CaseWizardPage';
import { DoctorAppointmentsPage } from './pages/doctor/DoctorAppointmentsPage';
import { VoiceCasePage } from './pages/doctor/VoiceCasePage';
import { DocumentScanPage } from './pages/doctor/DocumentScanPage';
import { ReportsAnalyticsPage } from './pages/doctor/ReportsAnalyticsPage';
import { NotificationsPage } from './pages/doctor/NotificationsPage';
import { SettingsPage } from './pages/doctor/SettingsPage';

// Patient Pages
import { PatientDashboardPage } from './pages/patient/PatientDashboardPage';
import { PatientRecordsPage } from './pages/patient/PatientRecordsPage';
import { PatientAppointmentsPage } from './pages/patient/PatientAppointmentsPage';
import { PatientDocumentsPage } from './pages/patient/PatientDocumentsPage';
import { PatientProfilePageWrapper } from './pages/patient/PatientProfilePageWrapper';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminVerificationPage } from './pages/admin/AdminVerificationPage';
import { AdminSecurityPage } from './pages/admin/AdminSecurityPage';
import { AdminDoctorsPage } from './pages/admin/AdminDoctorsPage';
import { AdminPatientsPage } from './pages/admin/AdminPatientsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/doctor/register" element={<DoctorRegisterPage />} />
        <Route path="/patient/register" element={<PatientRegisterPage />} />

        {/* Doctor Portal Routes */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<Navigate to="/doctor/dashboard" replace />} />
          <Route path="dashboard" element={<DoctorDashboardPage />} />
          <Route path="patients" element={<PatientDirectoryPage />} />
          <Route path="patients/new" element={<PatientRegisterPage />} />
          <Route path="patients/:id" element={<PatientProfilePage />} />
          <Route path="case/new" element={<CaseWizardPage />} />
          <Route path="case/:caseId" element={<CaseWizardPage />} />
          <Route path="appointments" element={<DoctorAppointmentsPage />} />
          <Route path="voice-case" element={<VoiceCasePage />} />
          <Route path="scan" element={<DocumentScanPage />} />
          <Route path="reports" element={<ReportsAnalyticsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Patient Portal Routes */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<Navigate to="/patient/dashboard" replace />} />
          <Route path="dashboard" element={<PatientDashboardPage />} />
          <Route path="profile" element={<PatientProfilePageWrapper />} />
          <Route path="records" element={<PatientRecordsPage />} />
          <Route path="appointments" element={<PatientAppointmentsPage />} />
          <Route path="documents" element={<PatientDocumentsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Admin Authority Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="verification" element={<AdminVerificationPage />} />
          <Route path="doctors" element={<AdminDoctorsPage />} />
          <Route path="patients" element={<AdminPatientsPage />} />
          <Route path="security" element={<AdminSecurityPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
