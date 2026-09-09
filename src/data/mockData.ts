import { 
  User, 
  Patient, 
  CaseSheet, 
  Appointment, 
  DoctorVerification, 
  NotificationItem, 
  AuditLog 
} from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'DOC-001',
    name: 'Dr. Ananya Sharma',
    email: 'dr.ananya@aiia.gov.in',
    role: 'doctor',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256',
    registrationNo: 'AYU-2026-001',
    qualification: 'BAMS, MD (Ayurveda - Kayachikitsa)',
    specialization: 'Senior Physician & Kayachikitsa Specialist',
    hospital: 'All India Institute of Ayurveda (AIIA), New Delhi',
  },
  {
    id: 'DOC-002',
    name: 'Dr. Rajeshwar Bhatt',
    email: 'dr.bhatt@aiia.gov.in',
    role: 'doctor',
    phone: '+91 98111 22334',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256',
    registrationNo: 'AYU-2026-042',
    qualification: 'BAMS, MS (Ayurveda - Shalya Tantra)',
    specialization: 'Associate Professor & Shalya Tantra Specialist',
    hospital: 'All India Institute of Ayurveda (AIIA), New Delhi',
  },
  {
    id: 'PAT-001',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    role: 'patient',
    phone: '+91 98450 12345',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
    abhaId: '91-4521-8890-1234',
  },
  {
    id: 'ADM-001',
    name: 'Dr. Vikramaditya Varma',
    email: 'admin.ayush@aiia.gov.in',
    role: 'admin',
    phone: '+91 94440 98765',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256',
    qualification: 'MD (Ayur), PhD, Member Secretary',
    hospital: 'Ministry of Ayush & AIIA Academic Council',
  }
];

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'AYU-2026-00125',
    name: 'Rahul Sharma',
    age: 42,
    gender: 'Male',
    dob: '1984-06-15',
    bloodGroup: 'B+',
    mobile: '+91 98450 12345',
    email: 'rahul.sharma@gmail.com',
    address: 'B-402, Green Glen Layout, Bellandur, New Delhi - 110025',
    abhaId: '91-4521-8890-1234',
    abhaVerified: true,
    emergencyContact: {
      name: 'Sunita Sharma',
      relationship: 'Spouse',
      phone: '+91 98450 99887'
    },
    consentGiven: true,
    prakriti: 'Vata-Pitta',
    vikriti: 'Pitta ↑ (Moderate)',
    agni: 'Tikshna',
    koshtha: 'Madhyama',
    createdAt: '2026-07-20',
    lastVisit: '2026-09-08',
    status: 'Active'
  },
  {
    id: 'AYU-2026-00126',
    name: 'Priya Nair',
    age: 35,
    gender: 'Female',
    dob: '1991-03-22',
    bloodGroup: 'O+',
    mobile: '+91 97401 87654',
    email: 'priya.nair@outlook.com',
    address: 'Flat 12C, Shanthi Niketan, Sarita Vihar, New Delhi - 110076',
    abhaId: '91-7890-1245-5678',
    abhaVerified: true,
    emergencyContact: {
      name: 'Gopal Nair',
      relationship: 'Father',
      phone: '+91 97401 11223'
    },
    consentGiven: true,
    prakriti: 'Pitta-Kapha',
    vikriti: 'Vata ↑ (Severe)',
    agni: 'Manda',
    koshtha: 'Krura',
    createdAt: '2026-08-01',
    lastVisit: '2026-09-05',
    status: 'Active'
  },
  {
    id: 'AYU-2026-00127',
    name: 'Arjun Mehta',
    age: 51,
    gender: 'Male',
    dob: '1975-11-08',
    bloodGroup: 'A+',
    mobile: '+91 98200 45678',
    email: 'arjun.mehta@yahoo.com',
    address: '45, Barakhamba Road, Connaught Place, New Delhi - 110001',
    abhaId: '91-3456-7890-4321',
    abhaVerified: true,
    emergencyContact: {
      name: 'Kavita Mehta',
      relationship: 'Spouse',
      phone: '+91 98200 87654'
    },
    consentGiven: true,
    prakriti: 'Kapha-Vata',
    vikriti: 'Kapha ↑ (Moderate)',
    agni: 'Manda',
    koshtha: 'Madhyama',
    createdAt: '2026-06-12',
    lastVisit: '2026-08-28',
    status: 'Follow-up'
  },
  {
    id: 'AYU-2026-00128',
    name: 'Sunita Devi',
    age: 48,
    gender: 'Female',
    dob: '1978-09-19',
    bloodGroup: 'AB+',
    mobile: '+91 99100 65432',
    email: 'sunita.devi@rediffmail.com',
    address: 'H.No 88, Sector 15, Rohini, New Delhi - 110085',
    abhaId: '91-6789-0123-7890',
    abhaVerified: true,
    emergencyContact: {
      name: 'Rameshwar Lal',
      relationship: 'Brother',
      phone: '+91 99100 12398'
    },
    consentGiven: true,
    prakriti: 'Vata',
    vikriti: 'Vata-Kapha ↑',
    agni: 'Vishama',
    koshtha: 'Krura',
    createdAt: '2026-08-15',
    lastVisit: '2026-09-02',
    status: 'Active'
  },
  {
    id: 'AYU-2026-00129',
    name: 'Deepak Verma',
    age: 29,
    gender: 'Male',
    dob: '1997-01-14',
    bloodGroup: 'O-',
    mobile: '+91 98710 34567',
    email: 'deepak.verma@gmail.com',
    address: 'C-31, Defence Colony, New Delhi - 110024',
    abhaId: '91-8901-2345-6789',
    abhaVerified: false,
    emergencyContact: {
      name: 'Alok Verma',
      relationship: 'Father',
      phone: '+91 98710 88776'
    },
    consentGiven: true,
    prakriti: 'Pitta',
    vikriti: 'Pitta ↑ (Mild)',
    agni: 'Tikshna',
    koshtha: 'Mridu',
    createdAt: '2026-09-07',
    lastVisit: '2026-09-07',
    status: 'Active'
  }
];

export const MOCK_CASE_SHEET_RAHUL: CaseSheet = {
  id: 'CASE-2026-00042',
  patientId: 'AYU-2026-00125',
  patientName: 'Rahul Sharma',
  doctorId: 'DOC-001',
  doctorName: 'Dr. Ananya Sharma',
  date: '2026-09-08',
  status: 'Finalized',
  autosaveTimestamp: '2026-09-08T11:45:00Z',

  complaints: [
    {
      id: 'cmp-1',
      complaint: 'Acidity, retrosternal burning sensation (Urodaha), and sour eructations (Amlodgara)',
      duration: '3 months',
      severity: 7,
      onset: 'Gradual',
      associatedSymptoms: ['Heartburn', 'Sour belching', 'Irregular appetite', 'Mild nausea after food']
    },
    {
      id: 'cmp-2',
      complaint: 'Disturbed sleep patterns and daytime sluggishness (Alasya)',
      duration: '1 month',
      severity: 5,
      onset: 'Gradual',
      associatedSymptoms: ['Restlessness at bedtime', 'Mid-night awakening around 2 AM']
    }
  ],

  medicalHistory: {
    pastConditions: ['Dyspepsia (2024)', 'Occasional migraine attacks'],
    otherConditions: 'No history of Hypertension, Diabetes, or Asthma.',
    currentMedications: 'Occasional Pantoprazole 40mg self-administered for acute acidity.',
    allergies: 'No known drug or herbal allergies.',
    familyHistory: 'Father had chronic hyperacidity and Duodenal Ulcer.',
    previousTreatments: 'Modern antacids gave temporary symptomatic relief with recurrence upon stopping.',
    lifestyleHistory: 'High-stress corporate role in IT consulting with erratic meal times and prolonged screen exposure.'
  },

  aharaVihara: {
    dietType: 'Vegetarian',
    mealFrequency: '2-3 meals with frequent irregular late night snacking',
    appetite: 'High',
    waterIntake: '1.5 - 2 Litres / day (often cold refrigerated water)',
    foodPreferences: ['Spicy curries', 'Deep-fried snacks', 'Strong coffee (3 cups/day)'],
    irregularEating: true,
    spicyFood: true,
    oilyFood: true,
    excessiveSweets: false,
    sleepDuration: '5.5 - 6 hours',
    sleepQuality: 'Disturbed',
    exercise: 'Light',
    workPattern: 'Sedentary desk work 10-12 hours / day',
    stressLevel: 'High',
    dailyRoutine: 'Ratri Jagarana (late nights past midnight), Divaswapna (short day nap on weekends)',
    screenTime: '10+ hours daily'
  },

  prakriti: {
    scores: { vata: 9, pitta: 14, kapha: 5 },
    percentages: { vata: 32, pitta: 50, kapha: 18 },
    dominantPrakriti: 'Pitta-Vata',
    traits: {
      'Body Frame': 'Pitta',
      'Skin Texture': 'Pitta',
      'Hair Nature': 'Pitta',
      'Appetite Rhythm': 'Pitta',
      'Metabolic Heat': 'Pitta',
      'Bowel Habits': 'Vata',
      'Sleep Pattern': 'Vata',
      'Mental Activity': 'Vata',
      'Stress Response': 'Pitta',
      'Weather Affinity': 'Pitta'
    },
    doctorNotes: 'Pitta predominant Prakriti with secondary Vata traits. Heightened Agni sensitivity and susceptibility to Vidagdha Jeerna.'
  },

  vikriti: {
    vata: 'Mild',
    pitta: 'Moderate',
    kapha: 'Normal',
    observedImbalance: 'Pitta Dosha Prakopa with secondary Vata Anubandha leading to Pitta-Vataja Amlapitta.'
  },

  agni: 'Tikshna',
  koshtha: 'Madhyama',

  nidana: [
    { id: 'nid-1', category: 'Ahara', description: 'Ati Katu & Vidahi Ahara (Excessive spicy, pungent, fermented foods)' },
    { id: 'nid-2', category: 'Ahara', description: 'Adhyashana & Vishamashana (Eating without digestion of previous meal, erratic timings)' },
    { id: 'nid-3', category: 'Ahara', description: 'Ati Kaphini / Coffee consumption on empty stomach' },
    { id: 'nid-4', category: 'Vihara', description: 'Ratri Jagarana (Habitual late sleeping past 12:30 AM)' },
    { id: 'nid-5', category: 'Manasika', description: 'Chinta & Krodha (Chronic work performance stress and deadline pressures)' }
  ],

  samprapti: [
    {
      id: 'sam-1',
      stage: 'Nidana',
      title: 'Nidana Sevana (Etiological Factors)',
      description: 'Habitual intake of Vidahi (pungent), Amla (sour), and Katu ahara coupled with Ratri Jagarana and Chinta.'
    },
    {
      id: 'sam-2',
      stage: 'Dosha Prakopa',
      title: 'Pachaka Pitta & Samana Vata Prakopa',
      description: 'Aggravation of Pitta Dosha leading to increase in its Dravatva (liquidity) and Amlatva (sourness), accompanied by irritated Samana Vata.',
      doshaInvolved: 'Pachaka Pitta ↑, Samana Vata'
    },
    {
      id: 'sam-3',
      stage: 'Agni Dushti',
      title: 'Tikshnagni & Vidagdhajeerna',
      description: 'Disproportionate increase of gastric fire causing rapid burning of chyme into an acidic, corrosive form (Vidagdha Pachana).'
    },
    {
      id: 'sam-4',
      stage: 'Srotas Dushti',
      title: 'Annavaha & Purishavaha Srotas Vimarga Gamana',
      description: 'Reverse flow (Urdhwaga Vimarga Gamana) of acidic gastric contents up into the esophagus and pharynx.',
      srotasInvolved: 'Annavaha Srotas'
    },
    {
      id: 'sam-5',
      stage: 'Disease Manifestation',
      title: 'Urdhwaga Amlapitta (Hyperacidity / GERD)',
      description: 'Manifestation of classic Urodaha (burning in chest), Tikta-Amlodgara (sour bitter eructations), and Kanthadaha.'
    }
  ],

  examination: {
    vitals: {
      pulse: '76 bpm (Manduka Gati / Pitta dominant)',
      bp: '124/82 mmHg',
      temperature: '98.4 °F',
      respiratoryRate: '16 /min',
      weight: '74 kg',
      height: '175 cm',
      bmi: '24.2 kg/m²'
    },
    ashtavidha: {
      nadi: 'Pitta-Vata (Chanchala, Tikshna, moderate volume)',
      mutra: 'Peeta Varna (Mild yellowish, Samanya)',
      mala: 'Asamyak Mala, semi-formed, Pravartana once daily with burning sensation',
      jihva: 'Sama Jihva (Thin yellowish-white coating in middle and posterior thirds)',
      shabda: 'Spashta (Clear voice, mild throat clearing)',
      sparsha: 'Ushna (Mild warmth in palmar and epigastric regions)',
      druk: 'Rakta-yukta Pittaja Netra (Slight conjunctival vascular redness)',
      akruti: 'Madhyama (Medium mesomorphic frame)'
    },
    systemic: {
      respiratory: 'Bilateral vesicular breath sounds clear, no wheeze or rhonchi.',
      cardiovascular: 'S1, S2 heard normal, no murmurs.',
      gastrointestinal: 'Mild tenderness in epigastric region (Urdhwa Udara), no hepatosplenomegaly, bowel sounds active (8/min).',
      neurological: 'Higher mental functions intact, Cranial nerves I-XII normal.',
      musculoskeletal: 'Normal joint range of motion, no swelling or crepitus.'
    },
    generalNotes: 'Patient appears anxious regarding symptoms. Well-oriented to time, place, and person.'
  },

  diagnosis: {
    clinicalDiagnosis: [
      'Gastroesophageal Reflux Disease (GERD) with Non-Ulcer Dyspepsia (K21.9)'
    ],
    ayurvedicDiagnosis: [
      'Urdhwaga Amlapitta (Pitta-Vataja)',
      'Vidagdhajeerna Anubandha'
    ],
    differentialDiagnosis: [
      'Parinama Shula (Peptic Ulcer Disease)',
      'Annadravashula (Gastric erosion)',
      'Grahani Dosha (Irritable Bowel Syndrome)'
    ],
    doctorNotes: 'Classic presentation of Urdhwaga Amlapitta caused by Ahara-Vihara hetus. Responsive to Pitta Shamana, Deepana-Pachana, and Mridu Anulomana.'
  },

  treatment: {
    medications: [
      {
        id: 'med-1',
        medicine: 'Avipattikar Churna',
        dosage: '3 grams',
        frequency: 'Twice daily',
        duration: '21 days',
        instructions: 'Take with lukewarm water or honey before principal meals.',
        anupana: 'Koshnodaka (Warm Water)'
      },
      {
        id: 'med-2',
        medicine: 'Shankh Bhasma (Standardized)',
        dosage: '250 mg',
        frequency: 'Twice daily',
        duration: '21 days',
        instructions: 'Mix with honey and take after food for acid-neutralizing action.',
        anupana: 'Madhu (Honey)'
      },
      {
        id: 'med-3',
        medicine: 'Kamadudha Rasa (Mukta Yukta)',
        dosage: '1 tablet (250 mg)',
        frequency: 'Twice daily',
        duration: '21 days',
        instructions: 'Take 30 minutes before food with cow milk or warm water.',
        anupana: 'Godugdha (Cow Milk)'
      },
      {
        id: 'med-4',
        medicine: 'Amrutharishtam',
        dosage: '15 ml',
        frequency: 'Twice daily',
        duration: '14 days',
        instructions: 'Dilute with equal quantity of warm water after meals.',
        anupana: 'Equal quantity of water'
      }
    ],
    lifestyleRecommendations: [
      'Avoid sleeping immediately after meals; maintain minimum 2-3 hours gap between dinner and sleep.',
      'Adopt Shavasana and Sheetali Pranayama for 10-15 minutes daily before evening dinner to pacify aggravated Pitta and mental stress.',
      'Strictly avoid Ratri Jagarana; target sleep by 10:30 PM.',
      'Avoid day sleeping (Divaswapna) especially after lunch.'
    ],
    dietPathya: [
      'Old Shali rice (Purana Shali)',
      'Mudga Yusha (Moong dal soup)',
      'Takra (churned buttermilk with roasted cumin and coriander)',
      'Pomegranate (Dadima)',
      'Fresh tender coconut water',
      'Dhanyaka-Musta Siddha water (boiled water with coriander seeds)'
    ],
    dietApathya: [
      'Deep fried foods, fermented bakery items (bread, pav)',
      'Excess green and red chillies, raw garlic, pickles, vinegar',
      'Caffeinated beverages (limit coffee to 0-1 cup morning only, never on empty stomach)',
      'Ice cold refrigerated water or carbonated soft drinks'
    ],
    panchakarmaProcedures: [
      'Virechana (Therapeutic Purgation) advised after 3 weeks of Shamana Aushadhi if symptoms linger.',
      'Takradhara (herbal buttermilk pouring) for stress reduction and sleep improvement.'
    ],
    followUpDate: '2026-09-29',
    specialInstructions: 'Return earlier if severe heartburn, hematemesis, or progressive dysphagia occurs. Maintain daily dietary symptom diary.'
  }
};

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-101',
    patientId: 'AYU-2026-00125',
    patientName: 'Rahul Sharma',
    patientAge: 42,
    patientGender: 'Male',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Ananya Sharma',
    date: '2026-09-09',
    time: '09:30 AM',
    type: 'Follow-up',
    status: 'Scheduled',
    notes: 'Amlapitta 2-week review & assessment of Agni'
  },
  {
    id: 'APT-102',
    patientId: 'AYU-2026-00126',
    patientName: 'Priya Nair',
    patientAge: 35,
    patientGender: 'Female',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Ananya Sharma',
    date: '2026-09-09',
    time: '10:15 AM',
    type: 'Consultation',
    status: 'Scheduled',
    notes: 'Knee joint pain (Sandhigata Vata), Janu Basti evaluation'
  },
  {
    id: 'APT-103',
    patientId: 'AYU-2026-00127',
    patientName: 'Arjun Mehta',
    patientAge: 51,
    patientGender: 'Male',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Ananya Sharma',
    date: '2026-09-09',
    time: '11:00 AM',
    type: 'Case Assessment',
    status: 'In Progress',
    notes: 'Prameha metabolic profile and lipid levels review'
  },
  {
    id: 'APT-104',
    patientId: 'AYU-2026-00128',
    patientName: 'Sunita Devi',
    patientAge: 48,
    patientGender: 'Female',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Ananya Sharma',
    date: '2026-09-09',
    time: '12:00 PM',
    type: 'Panchakarma Review',
    status: 'Scheduled',
    notes: 'Nasya therapy post-procedure review'
  },
  {
    id: 'APT-105',
    patientId: 'AYU-2026-00129',
    patientName: 'Deepak Verma',
    patientAge: 29,
    patientGender: 'Male',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Ananya Sharma',
    date: '2026-09-09',
    time: '02:30 PM',
    type: 'Consultation',
    status: 'Scheduled',
    notes: 'Skin rash with burning sensation (Sheetapitta)'
  },
  {
    id: 'APT-106',
    patientId: 'AYU-2026-00130',
    patientName: 'Meera Chawla',
    patientAge: 62,
    patientGender: 'Female',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Ananya Sharma',
    date: '2026-09-09',
    time: '03:15 PM',
    type: 'Follow-up',
    status: 'Scheduled',
    notes: 'Kati Shula (Lumbar spondylosis) follow-up'
  },
  {
    id: 'APT-107',
    patientId: 'AYU-2026-00131',
    patientName: 'Vipin Saxena',
    patientAge: 38,
    patientGender: 'Male',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Ananya Sharma',
    date: '2026-09-09',
    time: '04:00 PM',
    type: 'Consultation',
    status: 'Scheduled',
    notes: 'Chronic insomnia and tension headaches'
  }
];

export const MOCK_VERIFICATIONS: DoctorVerification[] = [
  {
    id: 'VER-2026-081',
    doctorId: 'DOC-081',
    doctorName: 'Dr. Meenakshi Sundaram',
    email: 'm.sundaram@ayurveda-kerala.org',
    mobile: '+91 94471 23456',
    regNumber: 'AYU-KER-2024-5412',
    qualification: 'BAMS, MD (Panchakarma)',
    specialization: 'Panchakarma & Neurological Disorders',
    hospital: 'Government Ayurveda College Hospital, Thiruvananthapuram',
    documents: {
      regCertName: 'travancore_cochin_council_reg_cert.pdf',
      idProofName: 'aadhaar_doc_redacted.pdf',
      uploadDate: '2026-09-07'
    },
    submittedDate: '2026-09-07',
    status: 'Pending',
    remarks: 'Awaiting primary medical certificate authenticity check from Kerala Council.'
  },
  {
    id: 'VER-2026-082',
    doctorId: 'DOC-082',
    doctorName: 'Dr. Hemant Kulkarni',
    email: 'hemant.kulkarni@pune-ayur.edu',
    mobile: '+91 98220 98765',
    regNumber: 'AYU-MAH-2025-8831',
    qualification: 'BAMS, PhD (Dravyaguna)',
    specialization: 'Medicinal Herbs & Clinical Pharmacology',
    hospital: 'Tilak Ayurveda Mahavidyalaya, Pune',
    documents: {
      regCertName: 'maharashtra_ayurvedic_board_reg.pdf',
      idProofName: 'pan_card_doc.pdf',
      uploadDate: '2026-09-06'
    },
    submittedDate: '2026-09-06',
    status: 'Pending',
    remarks: 'Awaiting verification of institution affiliation letter.'
  },
  {
    id: 'VER-2026-079',
    doctorId: 'DOC-079',
    doctorName: 'Dr. Shweta Tripathi',
    email: 'shweta.tripathi@bhu.ac.in',
    mobile: '+91 95400 11223',
    regNumber: 'AYU-UP-2023-1109',
    qualification: 'BAMS, MD (Kaumarbhritya - Pediatrics)',
    specialization: 'Ayurvedic Child Health & Nutrition',
    hospital: 'Faculty of Ayurveda, IMS, BHU Varanasi',
    documents: {
      regCertName: 'bhu_ims_council_cert.pdf',
      idProofName: 'passport_doc.pdf',
      uploadDate: '2026-09-03'
    },
    submittedDate: '2026-09-03',
    status: 'Approved',
    remarks: 'Credentials verified by AIIA Registrar Office.'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Consultation Scheduled',
    message: 'Patient Rahul Sharma booked a follow-up for today at 09:30 AM.',
    type: 'appointment',
    timestamp: '15 minutes ago',
    read: false,
    link: '/doctor/appointments'
  },
  {
    id: 'notif-2',
    title: 'Case Sheet Draft Saved',
    message: 'Draft for Patient Priya Nair (AYU-2026-00126) automatically saved.',
    type: 'case',
    timestamp: '1 hour ago',
    read: false,
    link: '/doctor/patients/AYU-2026-00126'
  },
  {
    id: 'notif-3',
    title: 'New Doctor Registration Pending',
    message: 'Dr. Meenakshi Sundaram submitted verification documents for review.',
    type: 'verification',
    timestamp: '3 hours ago',
    read: true,
    link: '/admin/verification'
  },
  {
    id: 'notif-4',
    title: 'ABHA Sync Operational',
    message: 'Health ID verification services connected to Ayush National Grid.',
    type: 'system',
    timestamp: 'Yesterday',
    read: true
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-001',
    timestamp: '2026-09-09 09:15:22',
    user: 'Dr. Ananya Sharma (DOC-001)',
    role: 'Doctor',
    action: 'RECORD_ACCESS',
    resource: 'Patient Case Sheet AYU-2026-00125',
    ipAddress: '10.14.22.105 (AIIA Campus)'
  },
  {
    id: 'log-002',
    timestamp: '2026-09-09 08:50:11',
    user: 'Rahul Sharma (PAT-001)',
    role: 'Patient',
    action: 'CONSENT_VERIFY',
    resource: 'ABHA Health Data Sharing Authorization',
    ipAddress: '103.21.144.92 (Public Gateway)'
  },
  {
    id: 'log-003',
    timestamp: '2026-09-08 17:30:00',
    user: 'Dr. Vikramaditya Varma (ADM-001)',
    role: 'Admin',
    action: 'DOCTOR_APPROVAL',
    resource: 'Approved Practitioner AYU-UP-2023-1109',
    ipAddress: '10.14.20.1 (AIIA Admin Secure)'
  },
  {
    id: 'log-004',
    timestamp: '2026-09-08 11:45:00',
    user: 'Dr. Ananya Sharma (DOC-001)',
    role: 'Doctor',
    action: 'CASE_FINALIZED',
    resource: 'Case Sheet CASE-2026-00042',
    ipAddress: '10.14.22.105 (AIIA Campus)'
  }
];
