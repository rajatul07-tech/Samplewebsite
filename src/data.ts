import { Doctor, Service, Testimonial, GalleryItem } from './types';

export const doctorData: Doctor = {
  name: "Dr. Rachel Carter, MD",
  title: "Senior Cardiologist & Preventive Health Director",
  bio: "Dr. Rachel Carter is a world-class cardiologist with over 15 years of active clinical practice. Formerly a research fellow at Johns Hopkins Medicine, she specializes in advanced cardiovascular diagnostics, non-invasive treatment modalities, and customized preventive therapy. Her patient-first methodology focuses on treating the individual, not just the symptoms, combining advanced diagnostic technology with evidence-based lifestyle medicine.",
  specialty: "Interventional Cardiology & Preventive Medicine",
  experienceYears: 16,
  education: [
    "MD with Honors — Harvard Medical School",
    "Fellowship in Cardiology — Johns Hopkins Hospital",
    "Residency in Internal Medicine — Mayo Clinic"
  ],
  certifications: [
    "Board Certified in Cardiovascular Disease (ABIM)",
    "Certified Specialist in Clinical Hypertension (CH)",
    "Registered Physician in Vascular Interpretation (RPVI)"
  ],
  achievements: [
    "Recipient of the National Excellence in Medicine Award, 2024",
    "Author of 20+ peer-reviewed papers on preventive cardiovascular therapeutics",
    "Active Advisor to the American Heart Preventive Association"
  ],
  image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
  rating: 4.9,
  reviewsCount: 1240,
  treatedCount: 8400,
  emergencyContact: "+1 (800) 555-0199",
  whatsappContact: "+1 (555) 732-2026",
  email: "dr.carter@auraclinic.com",
  address: "742 Evergreen Terrace, Medical District, Suite 500, Metro City",
  workingHours: {
    weekday: "08:00 AM - 06:00 PM",
    saturday: "09:00 AM - 02:00 PM",
    sunday: "Emergency Only"
  }
};

export const servicesData: Service[] = [
  {
    id: "serv-gen-consult",
    name: "Comprehensive Cardiac Consultation",
    category: "clinical",
    shortDesc: "In-depth cardiovascular physical examination, clinical risk assessment, baseline ECG, and tailored therapy guidance.",
    longDesc: "A complete physical mapping of your cardiovascular system. Dr. Carter performs direct auscultation, clinical history review, baseline electrocardiography (ECG), lipid-lipid panel correlation, and designs an initial therapeutic strategy. Recommended for annual health reviews and primary symptoms.",
    duration: "45 mins",
    price: "$180",
    icon: "HeartHeart", // we'll map icons in code
    benefits: [
      "Immediate digital 12-lead ECG recording & review",
      "Comprehensive cardiovascular risk-score evaluation",
      "Medication audit and optimization plan",
      "Direct consultation with Dr. Rachel Carter"
    ]
  },
  {
    id: "serv-vascular-imaging",
    name: "Advanced Diagnostics & Echocardiography",
    category: "specialized",
    shortDesc: "High-resolution ultrasound imaging of the heart chambers, vessels, and valves to monitor structural integrity.",
    longDesc: "Using state-of-the-art Philips ultrasound platforms, we deliver non-invasive imaging of your heart's live state. Evaluates valve performance, wall thickness, ejection fraction, and blood velocity vectors with near-perfect accuracy.",
    duration: "60 mins",
    price: "$320",
    icon: "Activity",
    benefits: [
      "HD color Doppler flow mapping of cardiac valves",
      "Myocardial strain analysis and wall motility assessment",
      "Zero-exposure, completely pain-free imaging",
      "Detailed visual report provided immediately on-screen"
    ]
  },
  {
    id: "serv-preventive-plan",
    name: "Metabolic & Preventive Care Management",
    category: "preventive",
    shortDesc: "Integrated lifestyle blueprints, biomarker monitoring, and nutritional tracking to prevent primary vascular events.",
    longDesc: "Cardiology isn't just about surgery; it is about stopping attacks before they begin. This service combines advanced biomarker mapping, metabolic analysis, custom low-inflammation diet design, and functional physical tracking to halt or reverse plaque buildup.",
    duration: "50 mins",
    price: "$210",
    icon: "ShieldAlert",
    benefits: [
      "Customized 6-month clinical lifestyle transformation plan",
      "Personalized biomarker targets (ApoB, hs-CRP, HbA1c)",
      "Syncing with wearable smartwatch telemetry data",
      "Bi-weekly digital check-ins with our clinical dietician"
    ]
  },
  {
    id: "serv-arrhythmia-holter",
    name: "Vascular Screening & Holter Monitoring",
    category: "specialized",
    shortDesc: "Continuous ambulatory ECG recording for 24-72 hours to detect intermittent atrial fibrillation or conduction glitches.",
    longDesc: "For patients experiencing mysterious palpitations, lightheadedness, or racing pulse. We deploy small, waterproof continuous patch monitors that sync with cloud AI to map every single cardiac cycle during your normal activities.",
    duration: "30 mins (Fitting)",
    price: "$250",
    icon: "Radio",
    benefits: [
      "Comfortable medical patch recorder (no heavy cables)",
      "Continuous 24-hour to 7-day precise recording",
      "Immediate cloud AI trigger for dangerous rhythms",
      "Comprehensive cardiologist analysis report"
    ]
  },
  {
    id: "serv-cardiac-emergency",
    name: "Acute Diagnostic & Priority Care Support",
    category: "emergency",
    shortDesc: "Rapid bedside screening, cardiac biomarker assays, and fast-track stabilizer management for urgent cardiorespiratory symptoms.",
    longDesc: "For non-life threatening, but immediate clinical worries. Direct express diagnostics for chest pains, shortness of breath, or dramatic hypertensive spikes. Features immediate point-of-care Troponin-I and BNP blood results within 10 minutes.",
    duration: "Immediate",
    price: "$290",
    icon: "Stethoscope",
    benefits: [
      "Guaranteed express medical intake with zero waiting time",
      "Immediate point-of-care cardiac biomarker blood test",
      "Continuous vital signs and oxygen monitoring",
      "Direct stabilization and prompt hospital-routing if required"
    ]
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "testi-1",
    author: "Robert Henderson",
    designation: "Retired School Principal (Age 64)",
    rating: 5,
    text: "After my sudden racing heart episodes, other clinics ran basic tests and shrugged it off. Dr. Carter immediately ordered a contemporary patch Holter and found a silent atrial flutter. Her personalized medication guide completely stabilized my symptoms. I truly feel like she saved my life.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    date: "April 12, 2026",
    verified: true
  },
  {
    id: "testi-2",
    author: "Amanda Sterling",
    designation: "Software Enterprise Director (Age 42)",
    rating: 5,
    text: "The executive screening package is phenomenal. Rather than generic advice, Dr. Carter explained my specific lipid ratios and ApoB targets with incredible clarity. The integration with my modern smartwatch and the tailored clinical exercise setup is exactly what busy professionals need. Best medical experience ever.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    date: "May 25, 2026",
    verified: true
  },
  {
    id: "testi-3",
    author: "Marcello Giordano",
    designation: "Culinary Professional (Age 55)",
    rating: 5,
    text: "Dr. Carter's preventive medicine program helped me drop my systemic inflammation and blood pressure without slamming me with high-dose beta-blockers. She worked closely with me on sleep, heart recovery rates, and healthy adaptation. A true genius in her field who respects the patient.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    date: "June 02, 2026",
    verified: true
  }
];

export const galleryData: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Premium Consult Suite",
    category: "facility",
    description: "A comfortable, serene patient evaluation suite customized to reduce clinical anxiety and ensure peaceful discussion.",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "gal-2",
    title: "Echocardiography Unit",
    category: "equipment",
    description: "Advanced Philips Epic Elite ultrasound framework supporting high-fidelity live color flow modeling and strain-rate mapping.",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "gal-3",
    title: "Live Biomarker Lab",
    category: "equipment",
    description: "On-site point-of-care laboratory equipment analyzing cardiac enzymes (Troponin, BNP) and biochemical profile under 10 minutes.",
    imageUrl: "https://images.unsplash.com/photo-1504813184591-01552793005f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "gal-4",
    title: "Collaborative Cardiac Review",
    category: "team",
    description: "Dr. Rachel Carter routinely coordinates with clinical dieticians and specialized vascular nurses to calibrate critical programs.",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "gal-5",
    title: "Vascular Screening Suite",
    category: "facility",
    description: "Quiet diagnostic wings fitted with contemporary hemodynamic trackers and oxygen regulators for safe, quiet patient screening.",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "gal-6",
    title: "Holter Calibration Lab",
    category: "equipment",
    description: "Digital hub programmed to fits and inspect water-resistant patch monitors that measure continuous heart rates.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
  }
];

export const mockAvailableTimeSlots = [
  "08:30 AM",
  "09:15 AM",
  "10:00 AM",
  "10:45 AM",
  "11:30 AM",
  "01:30 PM",
  "02:15 PM",
  "03:00 PM",
  "03:45 PM",
  "04:30 PM"
];
