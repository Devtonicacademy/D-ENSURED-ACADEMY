export const SERVICES_LIST = [
  {
    id: 'change-institution',
    title: 'Change of Institution',
    category: 'Admission Services',
    iconName: 'Building2',
    shortDesc: 'Official JAMB CAPS processing for institution modifications to increase admission chances.',
    fullDesc: 'Seamlessly switch your preferred tertiary institution on JAMB CAPS portal. Our certified consultants analyze current cut-off benchmarks and institutional quotas to guide you toward high-probability institution choices.',
    requirements: ['JAMB Registration Number', 'JAMB Profile Code', 'O\'Level Result Details', 'Target Institution & Course Preferences'],
    processingTime: '24 - 48 Hours',
    fee: '₦3,500',
    faqs: [
      { q: 'How many times can I change my institution?', a: 'You can change your institution as long as the JAMB portal window remains open for the current academic session.' },
      { q: 'Will my new choice see my score immediately?', a: 'Yes, once updated on JAMB CAPS, the destination university receives your verified profile during admission screening updates.' }
    ]
  },
  {
    id: 'change-course',
    title: 'Change of Course',
    category: 'Admission Services',
    iconName: 'BookOpenCheck',
    shortDesc: 'Re-align your chosen course of study with your UTME subject combination and O\'Level grades.',
    fullDesc: 'Adjust your course choice on JAMB CAPS to align with your UTME subject combination and subject prerequisites. Avoid rejection due to wrong subject combination.',
    requirements: ['JAMB Registration Number', 'JAMB Profile Code', 'O\'Level Result Breakdown'],
    processingTime: '24 - 48 Hours',
    fee: '₦3,500',
    faqs: [
      { q: 'Can I change my course after Post-UTME?', a: 'Depending on university guidelines, course adjustments are possible if recommended by the institution admissions office.' }
    ]
  },
  {
    id: 'correction-of-data',
    title: 'Correction of Data',
    category: 'Admission Services',
    iconName: 'UserCheck',
    shortDesc: 'Official rectifications for Name, Date of Birth, State of Origin, and Gender on JAMB database.',
    fullDesc: 'Rectify discrepancies in your personal information (Name order, DOB, Local Government, State of Origin, Gender) across JAMB CAPS and official portal databases to match your National Identification Number (NIN).',
    requirements: ['NIN Slip', 'JAMB Profile Code', 'Birth Certificate / Court Sworn Affidavit', 'O\'Level Certificate'],
    processingTime: '3 - 5 Business Days',
    fee: '₦5,000',
    faqs: [
      { q: 'Why is data consistency crucial for admission?', a: 'Discrepancies between JAMB records, NIN, and O\'Level certificates can invalidate university registration during clearance.' }
    ]
  },
  {
    id: 'admission-processing',
    title: 'Admission Processing Support',
    category: 'Admission Services',
    iconName: 'GraduationCap',
    shortDesc: 'End-to-end guidance and tracking on JAMB CAPS & University portals from application to matriculation.',
    fullDesc: 'Comprehensive end-to-end monitoring of your admission status across JAMB CAPS (Accept/Reject admission), university portal upload verification, departmental clearance support, and fee payment guidance.',
    requirements: ['JAMB Registration Number', 'JAMB CAPS Credentials', 'Target Institution Details'],
    processingTime: 'Continuous / Ongoing',
    fee: '₦10,000',
    faqs: [
      { q: 'What happens if CAPS displays "Admission in Progress"?', a: 'Our team monitors your CAPS daily and ensures your O\'Level results are properly uploaded so the status changes to "Admitted".' }
    ]
  },
  {
    id: 'waec-certificate',
    title: 'WAEC Certificate Support',
    category: 'Certificate & Documentation',
    iconName: 'FileCheck',
    shortDesc: 'Official WAEC original certificate collection, verification, and attestations.',
    fullDesc: 'Assistance in retrieving original WAEC certificates, certified true copies of results, certificate verification for tertiary institution clearance, and international transcript evaluations.',
    requirements: ['Exam Year & Index Number', 'Identity Document', 'Passport Photographs'],
    processingTime: '5 - 10 Business Days',
    fee: 'Consultation Required',
    faqs: [
      { q: 'Can I collect my original WAEC certificate if I wrote as a private candidate (GCE)?', a: 'Yes, original certificates can be processed and collected through authorized WAEC zonal offices.' }
    ]
  },
  {
    id: 'waec-scratch-card',
    title: 'WAEC Scratch Card / Result Services',
    category: 'Certificate & Documentation',
    iconName: 'CreditCard',
    shortDesc: 'Genuine WAEC Result Checker pins, verification scratch cards, and instant online printing support.',
    fullDesc: 'Instant purchase and delivery of verified WAEC result checker PINs, scratch cards, and result printout services for online upload to university screening portals.',
    requirements: ['Exam Year', 'Candidate Number'],
    processingTime: 'Instant / Same Day',
    fee: '₦4,000',
    faqs: [
      { q: 'Is the result checker PIN sent directly to my phone/email?', a: 'Yes, instant digital delivery is available via SMS and WhatsApp.' }
    ]
  },
  {
    id: 'neco-certificate',
    title: 'NECO Certificate Support',
    category: 'Certificate & Documentation',
    iconName: 'Award',
    shortDesc: 'Verification and issuance processing for NECO Senior Secondary School Examination certificates.',
    fullDesc: 'Processing original NECO certificates, official result statements, and result confirmation letters for clearance at Nigerian universities, polytechnics, and colleges of education.',
    requirements: ['NECO Exam Year', 'Registration Number', 'Valid ID'],
    processingTime: '5 - 10 Business Days',
    fee: 'Consultation Required',
    faqs: [
      { q: 'How long are NECO result statements valid for clearance?', a: 'Result statements are generally accepted until original certificates are issued by NECO headquarters.' }
    ]
  },
  {
    id: 'neco-token',
    title: 'NECO Result Token Services',
    category: 'Certificate & Documentation',
    iconName: 'Key',
    shortDesc: 'Official NECO result checking tokens for instant online verification and portal printing.',
    fullDesc: 'Purchase genuine NECO Result Tokens for quick result checking, portal result verification, and university O\'Level clearance uploads.',
    requirements: ['Exam Year', 'Registration Number'],
    processingTime: 'Instant',
    fee: '₦3,500',
    faqs: [
      { q: 'How many times can one NECO Token be used?', a: 'A single NECO token allows up to 5 result checks for a specific candidate number.' }
    ]
  },
  {
    id: 'olevel-upload',
    title: 'O\'Level Result Upload Support',
    category: 'Academic Support',
    iconName: 'UploadCloud',
    shortDesc: 'Direct upload and verification of WAEC/NECO/NABTEB results on JAMB CAPS portal.',
    fullDesc: 'Crucial upload service to ensure your O\'Level subjects and grades are accurately registered on JAMB CAPS portal. Essential for candidates awaiting results or combining two sittings.',
    requirements: ['JAMB Profile Code', 'WAEC/NECO/NABTEB Result Details / Scratch Card'],
    processingTime: 'Same Day',
    fee: '₦2,500',
    faqs: [
      { q: 'Why is my university not offering me admission despite high JAMB score?', a: 'Without uploading your verified O\'Level results to JAMB CAPS, universities cannot legally offer admission on CAPS.' }
    ]
  },
  {
    id: 'gmail-correction',
    title: 'Email & Profile Correction',
    category: 'Academic Support',
    iconName: 'MailCheck',
    shortDesc: 'Fix incorrect or inaccessible email addresses bound to JAMB and educational portals.',
    fullDesc: 'Assistance in linking a new valid email address, updating registered phone numbers, and recovering lost JAMB profile codes or passwords.',
    requirements: ['Old Email/Phone', 'New Active Gmail Account', 'NIN Details'],
    processingTime: '24 Hours',
    fee: '₦3,000',
    faqs: [
      { q: 'I lost access to the phone number I used for JAMB registration, can it be fixed?', a: 'Yes, we provide official email re-linking and phone update guidance.' }
    ]
  },
  {
    id: 'academic-consultation',
    title: '1-on-1 Academic Consultation',
    category: 'Academic Support',
    iconName: 'Compass',
    shortDesc: 'Personalized strategic consultation with CEO Akinjo Rotimi & senior admission advisors.',
    fullDesc: 'Comprehensive academic evaluation covering target score targets, subject mastery strategies, tertiary institution admission guidelines, course selection, and exam preparation roadmap.',
    requirements: ['Target University & Course', 'Current JAMB/O\'Level Status'],
    processingTime: 'Scheduled Appointment',
    fee: '₦5,000',
    faqs: [
      { q: 'Are consultations conducted online or in person?', a: 'Consultations are available both in-person at our Lagos office (Doyin Plaza, Igboelerin, Okomaiko) and virtually via video call.' }
    ]
  }
];
