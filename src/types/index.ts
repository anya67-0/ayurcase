export type UserRole = 'doctor' | 'patient' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  registrationNo?: string;
  qualification?: string;
  specialization?: string;
  hospital?: string;
  abhaId?: string;
}

export type PrakritiType = 'Vata' | 'Pitta' | 'Kapha' | 'Vata-Pitta' | 'Pitta-Vata' | 'Pitta-Kapha' | 'Kapha-Pitta' | 'Vata-Kapha' | 'Kapha-Vata' | 'Tridoshaja';
export type AgniType = 'Sama' | 'Vishama' | 'Tikshna' | 'Manda';
export type KoshthaType = 'Mridu' | 'Madhyama' | 'Krura';
export type SeverityType = 'Normal' | 'Mild' | 'Moderate' | 'Severe';

export interface Patient {
  id: string; // AYU-2026-XXXXX
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  bloodGroup: string;
  mobile: string;
  email: string;
  address: string;
  abhaId: string;
  abhaVerified: boolean;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  consentGiven: boolean;
  prakriti: PrakritiType;
  vikriti: string;
  agni: AgniType;
  koshtha: KoshthaType;
  createdAt: string;
  lastVisit: string;
  status: 'Active' | 'Follow-up' | 'Discharged';
}

export interface ChiefComplaint {
  id: string;
  complaint: string;
  duration: string;
  severity: number; // 1-10
  onset: 'Gradual' | 'Sudden';
  associatedSymptoms: string[];
}

export interface MedicalHistory {
  pastConditions: string[];
  otherConditions: string;
  currentMedications: string;
  allergies: string;
  familyHistory: string;
  previousTreatments: string;
  lifestyleHistory: string;
}

export interface AharaVihara {
  dietType: 'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Sattvic';
  mealFrequency: string;
  appetite: 'Low' | 'Moderate' | 'High' | 'Variable';
  waterIntake: string;
  foodPreferences: string[];
  irregularEating: boolean;
  spicyFood: boolean;
  oilyFood: boolean;
  excessiveSweets: boolean;
  sleepDuration: string;
  sleepQuality: 'Sound' | 'Disturbed' | 'Insomnia' | 'Excessive';
  exercise: 'None' | 'Light' | 'Moderate' | 'Vigorous';
  workPattern: string;
  stressLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  dailyRoutine: string;
  screenTime: string;
}

export interface PrakritiAssessment {
  scores: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  percentages: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  dominantPrakriti: PrakritiType;
  traits: Record<string, 'Vata' | 'Pitta' | 'Kapha'>;
  doctorNotes: string;
}

export interface VikritiAssessment {
  vata: SeverityType;
  pitta: SeverityType;
  kapha: SeverityType;
  observedImbalance: string;
}

export interface NidanaItem {
  id: string;
  category: 'Ahara' | 'Vihara' | 'Manasika' | 'Environmental' | 'Other';
  description: string;
}

export interface SampraptiNode {
  id: string;
  stage: 'Nidana' | 'Dosha Prakopa' | 'Agni Dushti' | 'Srotas Dushti' | 'Disease Manifestation';
  title: string;
  description: string;
  doshaInvolved?: string;
  srotasInvolved?: string;
}

export interface AshtavidhaPariksha {
  nadi: string;    // Pulse
  mutra: string;   // Urine
  mala: string;    // Stool
  jihva: string;   // Tongue
  shabda: string;  // Voice / Sound
  sparsha: string; // Touch / Skin
  druk: string;    // Eyes / Vision
  akruti: string;  // General build
}

export interface ClinicalExamination {
  vitals: {
    pulse: string;
    bp: string;
    temperature: string;
    respiratoryRate: string;
    weight: string;
    height: string;
    bmi: string;
  };
  ashtavidha: AshtavidhaPariksha;
  systemic: {
    respiratory: string;
    cardiovascular: string;
    gastrointestinal: string;
    neurological: string;
    musculoskeletal: string;
  };
  generalNotes: string;
}

export interface Diagnosis {
  clinicalDiagnosis: string[];
  ayurvedicDiagnosis: string[];
  differentialDiagnosis: string[];
  doctorNotes: string;
}

export interface MedicationItem {
  id: string;
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  anupana?: string; // Vehicle e.g. Warm water, Honey, Milk
}

export interface TreatmentPlan {
  medications: MedicationItem[];
  lifestyleRecommendations: string[];
  dietPathya: string[];    // Wholesome foods
  dietApathya: string[];  // Unwholesome foods
  panchakarmaProcedures: string[];
  followUpDate: string;
  specialInstructions: string;
}

export interface CaseSheet {
  id: string; // CASE-2026-XXXX
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  status: 'Draft' | 'Finalized';
  autosaveTimestamp: string;
  
  // 14 Steps
  complaints: ChiefComplaint[];
  medicalHistory: MedicalHistory;
  aharaVihara: AharaVihara;
  prakriti: PrakritiAssessment;
  vikriti: VikritiAssessment;
  agni: AgniType;
  koshtha: KoshthaType;
  nidana: NidanaItem[];
  samprapti: SampraptiNode[];
  examination: ClinicalExamination;
  diagnosis: Diagnosis;
  treatment: TreatmentPlan;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'Consultation' | 'Follow-up' | 'Panchakarma Review' | 'Case Assessment';
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  notes?: string;
}

export interface DoctorVerification {
  id: string;
  doctorId: string;
  doctorName: string;
  email: string;
  mobile: string;
  regNumber: string;
  qualification: string;
  specialization: string;
  hospital: string;
  documents: {
    regCertName: string;
    idProofName: string;
    uploadDate: string;
  };
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Info Required';
  remarks?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'case' | 'verification' | 'system' | 'reminder';
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  resource: string;
  ipAddress: string;
}
