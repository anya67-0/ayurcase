import { 
  Patient, 
  CaseSheet, 
  Appointment, 
  DoctorVerification, 
  NotificationItem, 
  AuditLog 
} from '../types';

import { 
  MOCK_PATIENTS, 
  MOCK_CASE_SHEET_RAHUL, 
  MOCK_APPOINTMENTS, 
  MOCK_VERIFICATIONS, 
  MOCK_NOTIFICATIONS, 
  MOCK_AUDIT_LOGS 
} from '../data/mockData';

const STORAGE_KEYS = {
  PATIENTS: 'ayurcase_patients_v1',
  CASES: 'ayurcase_cases_v1',
  APPOINTMENTS: 'ayurcase_appointments_v1',
  VERIFICATIONS: 'ayurcase_verifications_v1',
  NOTIFICATIONS: 'ayurcase_notifications_v1',
  AUDIT_LOGS: 'ayurcase_audit_logs_v1',
};

// Initialize localStorage with mock data if not present
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.PATIENTS)) {
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(MOCK_PATIENTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CASES)) {
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify([MOCK_CASE_SHEET_RAHUL]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(MOCK_APPOINTMENTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.VERIFICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify(MOCK_VERIFICATIONS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(MOCK_NOTIFICATIONS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(MOCK_AUDIT_LOGS));
  }
}

// Run init immediately
initializeStorage();

export const storageService = {
  // Patients
  getPatients(): Patient[] {
    const data = localStorage.getItem(STORAGE_KEYS.PATIENTS);
    return data ? JSON.parse(data) : MOCK_PATIENTS;
  },

  getPatientById(id: string): Patient | undefined {
    const patients = this.getPatients();
    return patients.find(p => p.id.toLowerCase() === id.toLowerCase());
  },

  savePatient(patient: Patient): Patient {
    const patients = this.getPatients();
    const index = patients.findIndex(p => p.id === patient.id);
    if (index >= 0) {
      patients[index] = patient;
    } else {
      patients.unshift(patient);
    }
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
    this.addAuditLog('CREATE_PATIENT', `Registered Patient ${patient.name} (${patient.id})`);
    return patient;
  },

  // Case Sheets
  getCases(): CaseSheet[] {
    const data = localStorage.getItem(STORAGE_KEYS.CASES);
    return data ? JSON.parse(data) : [MOCK_CASE_SHEET_RAHUL];
  },

  getCaseById(id: string): CaseSheet | undefined {
    const cases = this.getCases();
    return cases.find(c => c.id === id);
  },

  getCasesByPatientId(patientId: string): CaseSheet[] {
    const cases = this.getCases();
    return cases.filter(c => c.patientId.toLowerCase() === patientId.toLowerCase());
  },

  saveCase(caseSheet: CaseSheet): CaseSheet {
    const cases = this.getCases();
    const index = cases.findIndex(c => c.id === caseSheet.id);
    if (index >= 0) {
      cases[index] = caseSheet;
    } else {
      cases.unshift(caseSheet);
    }
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
    
    // Update patient's last visit & status
    const patient = this.getPatientById(caseSheet.patientId);
    if (patient) {
      patient.lastVisit = caseSheet.date;
      patient.prakriti = caseSheet.prakriti.dominantPrakriti;
      patient.vikriti = caseSheet.vikriti.observedImbalance;
      patient.agni = caseSheet.agni;
      patient.koshtha = caseSheet.koshtha;
      this.savePatient(patient);
    }

    this.addAuditLog('SAVE_CASE', `Saved Ayurvedic Case Sheet ${caseSheet.id} for ${caseSheet.patientName}`);
    return caseSheet;
  },

  // Appointments
  getAppointments(): Appointment[] {
    const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    return data ? JSON.parse(data) : MOCK_APPOINTMENTS;
  },

  saveAppointment(appointment: Appointment): Appointment {
    const appointments = this.getAppointments();
    const index = appointments.findIndex(a => a.id === appointment.id);
    if (index >= 0) {
      appointments[index] = appointment;
    } else {
      appointments.unshift(appointment);
    }
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
    this.addAuditLog('UPDATE_APPOINTMENT', `Updated appointment ${appointment.id} status to ${appointment.status}`);
    return appointment;
  },

  updateAppointmentStatus(id: string, status: Appointment['status']): void {
    const appointments = this.getAppointments();
    const apt = appointments.find(a => a.id === id);
    if (apt) {
      apt.status = status;
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
      this.addAuditLog('APPOINTMENT_STATUS', `Changed status of ${id} to ${status}`);
    }
  },

  // Doctor Verifications
  getVerifications(): DoctorVerification[] {
    const data = localStorage.getItem(STORAGE_KEYS.VERIFICATIONS);
    return data ? JSON.parse(data) : MOCK_VERIFICATIONS;
  },

  saveVerification(verification: DoctorVerification): DoctorVerification {
    const verifications = this.getVerifications();
    const index = verifications.findIndex(v => v.id === verification.id);
    if (index >= 0) {
      verifications[index] = verification;
    } else {
      verifications.unshift(verification);
    }
    localStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify(verifications));
    return verification;
  },

  updateVerificationStatus(id: string, status: DoctorVerification['status'], remarks?: string): void {
    const verifications = this.getVerifications();
    const item = verifications.find(v => v.id === id);
    if (item) {
      item.status = status;
      if (remarks) item.remarks = remarks;
      localStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify(verifications));
      this.addAuditLog('ADMIN_VERIFY', `Doctor verification ${id} set to ${status}`);
    }
  },

  // Notifications
  getNotifications(): NotificationItem[] {
    const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return data ? JSON.parse(data) : MOCK_NOTIFICATIONS;
  },

  markNotificationAsRead(id: string): void {
    const notifications = this.getNotifications();
    const item = notifications.find(n => n.id === id);
    if (item) {
      item.read = true;
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    }
  },

  markAllNotificationsAsRead(): void {
    const notifications = this.getNotifications().map(n => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  },

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    const data = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    return data ? JSON.parse(data) : MOCK_AUDIT_LOGS;
  },

  addAuditLog(action: string, resource: string): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'Current User',
      role: 'Session',
      action,
      resource,
      ipAddress: '10.14.22.105 (Local Session)'
    };
    logs.unshift(newLog);
    if (logs.length > 50) logs.pop();
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs));
  },

  // Reset demo data helper
  resetToDefaults(): void {
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(MOCK_PATIENTS));
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify([MOCK_CASE_SHEET_RAHUL]));
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(MOCK_APPOINTMENTS));
    localStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify(MOCK_VERIFICATIONS));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(MOCK_NOTIFICATIONS));
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(MOCK_AUDIT_LOGS));
  }
};
