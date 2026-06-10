export interface Service {
  id: string;
  name: string;
  category: 'clinical' | 'preventive' | 'emergency' | 'specialized';
  shortDesc: string;
  longDesc: string;
  duration: string;
  price: string;
  icon: string;
  benefits: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  designation: string;
  rating: number;
  text: string;
  image: string;
  date: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'facility' | 'equipment' | 'team' | 'consultation';
  description: string;
  imageUrl: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookingCode: string;
  createdAt: string;
}

export interface Doctor {
  name: string;
  title: string;
  bio: string;
  education: string[];
  experienceYears: number;
  specialty: string;
  certifications: string[];
  achievements: string[];
  image: string;
  rating: number;
  reviewsCount: number;
  treatedCount: number;
  emergencyContact: string;
  whatsappContact: string;
  email: string;
  address: string;
  workingHours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
}
