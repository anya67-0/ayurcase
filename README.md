# AyurCase — Digital Ayurvedic Patient Case Management System

**SIH 2026 Problem Statement SIH26047: Patient Case-Taking Software**  
**Use Case:** Ministry of Ayush / All India Institute of Ayurveda (AIIA)  

---

## Key Highlights & Features

1. **Role-Based Architecture**:
   - **Doctor Portal**: Full OPD dashboard, patient directory with multi-criteria filtering, 14-step clinical case wizard, appointments calendar, voice case recording, OCR document scanning, epidemiological analytics.
   - **Patient Portal**: Read-only verified records, active herbal prescription schedule with timing/Anupana, upcoming appointments, ABHA card with QR, document uploads.
   - **Administrative Authority**: Practitioner credential review queue, institutional compliance metrics, ABDM audit logs, doctor/patient directories.

2. **14-Step Digital Ayurvedic Case Sheet**:
   - Patient confirmation & ABHA link
   - Chief complaints with severity slider (1-10) and onset tracking
   - Medical & surgical history, family history, known allergies
   - Ahara-Vihara (diet type, irregularity, spicy/oily habits, sleep, stress)
   - **Deha Prakriti Assessment**: Dynamic SVG Tri-Dosha donut chart and characteristic rating sliders calculating Vata/Pitta/Kapha percentages and dominant Prakriti.
   - **Vikriti Assessment**: Vata, Pitta, Kapha pathological aggravation levels.
   - **Agni Pariksha**: Selectable visual cards for Samagni, Vishamagni, Tikshnagni, Mandagni.
   - **Koshtha Pariksha**: Mridu, Madhyama, Krura radio cards.
   - **Nidana Sevana**: Categorized etiological factors (Ahara, Vihara, Manasika, Environmental).
   - **Samprapti Ghataka Flow**: Interactive visual pathogenesis chain (Nidana → Dosha Prakopa → Agni Dushti → Srotas Dushti → Disease Manifestation).
   - **Ashtavidha Pariksha**: Classical eightfold examination (Nadi, Jihva, Mala, Mutra, Shabda, Sparsha, Druk, Akruti) + vitals.
   - **Diagnostic Assessment**: Ayurvedic diagnosis + ICD-11 / NAMASTE terminology correlation.
   - **Treatment Plan**: Medication table with dosage, frequency, duration, and Anupana + Pathya/Apathya diet recommendations.
   - **Review & Sign**: Cryptographic sign-off, confetti feedback, and official AIIA Case Sheet print layout.

3. **Demonstration Fast-Switching**:
   - Floating Demo Hub at the bottom-right of the screen enables 1-click switching between:
     - **Dr. Ananya Sharma** (BAMS, MD Ayurveda - Senior Physician)
     - **Rahul Sharma** (Patient - 42M, Chronic Amlapitta)
     - **Dr. Vikramaditya Varma** (Admin - Member Secretary, AIIA Council)
   - Reset button returns all mock records to defaults.

4. **Speech & Document Digitization**:
   - **AyurVoice**: Animated microphone waveform capturing consultation audio and parsing into structured clinical parameters.
   - **AyurOCR**: Digitization scanner for handwritten prescriptions and lab investigations.

---

## Running the Application

Double-click `start-ayurcase.bat` or run:
```bash
npm run preview
```
Visit `http://localhost:5173/` in your browser.
