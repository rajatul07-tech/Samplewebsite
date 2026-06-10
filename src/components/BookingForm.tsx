import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, Ticket, ChevronRight, X, AlertCircle } from 'lucide-react';
import { servicesData, mockAvailableTimeSlots, doctorData } from '../data';
import { Appointment } from '../types';

interface BookingFormProps {
  selectedServiceId: string;
  onBookingSuccess: (appointment: Appointment) => void;
}

export default function BookingForm({ selectedServiceId, onBookingSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceId: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeSlot, setActiveSlot] = useState<string>('');

  // Settle pre-selected service when passed from app state
  useEffect(() => {
    if (selectedServiceId) {
      setFormData(prev => ({ ...prev, serviceId: selectedServiceId }));
    }
  }, [selectedServiceId]);

  // Restrict calendar input to tomorrow onwards (cannot book retroactively)
  const getMinDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const selectTimeSlot = (slot: string) => {
    setActiveSlot(slot);
    setFormData(prev => ({ ...prev, preferredTime: slot }));
    if (errors.preferredTime) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.preferredTime;
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Patient name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile contact number is required';
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please provide a valid diagnostic contact number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid medical contact email';
    }
    if (!formData.serviceId) newErrors.serviceId = 'Please select a clinical procedure';
    if (!formData.preferredDate) newErrors.preferredDate = 'Please select an appointment date';
    if (!formData.preferredTime) newErrors.preferredTime = 'Please select an available hours slot';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      const errorEl = document.getElementsByName(firstError)[0];
      if (errorEl) errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Generate ticket reference code
    const dateSegment = formData.preferredDate.replace(/-/g, '').slice(2, 6);
    const randomSegment = Math.random().toString(36).substring(2, 6).toUpperCase();
    const ticketCode = `AURA-${dateSegment}-${randomSegment}`;

    const newAppointment: Appointment = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      patientName: formData.name,
      patientPhone: formData.phone,
      patientEmail: formData.email,
      serviceId: formData.serviceId,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      message: formData.message,
      status: 'pending', // default state
      bookingCode: ticketCode,
      createdAt: new Date().toISOString()
    };

    // Store in localStorage
    const existing = JSON.parse(localStorage.getItem('aura_appointments') || '[]');
    existing.push(newAppointment);
    localStorage.setItem('aura_appointments', JSON.stringify(existing));

    // Callback upper state
    onBookingSuccess(newAppointment);

    // Reset fields
    setFormData({
      name: '',
      phone: '',
      email: '',
      serviceId: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });
    setActiveSlot('');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden text-left">
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 p-6 sm:p-8 text-white">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Interactive Intake Scheduler</h3>
        <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-lg font-light leading-relaxed">
          Provide your primary details, select a clinical program, and secure your certified medical session with Dr. Rachel Carter, MD.
        </p>
      </div>

      <form onSubmit={handleFormSubmission} className="p-6 sm:p-8 space-y-6">
        
        {/* Patient Name input */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide block">Patient Legal Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Eleanor Vance"
                className={`w-full py-3.5 pl-11 pr-4 bg-slate-50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all ${
                  errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-teal-500'
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-[10px] font-medium flex items-center mt-1">
                <AlertCircle className="w-3 h-3 mr-1" /> {errors.name}
              </p>
            )}
          </div>

          {/* Contact phone number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide block">Mobile Contact Number</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <Phone className="w-4 h-4" />
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 000-0000"
                className={`w-full py-3.5 pl-11 pr-4 bg-slate-50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all ${
                  errors.phone ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-teal-500'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-[10px] font-medium flex items-center mt-1">
                <AlertCircle className="w-3 h-3 mr-1" /> {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Email contact */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide block">Notification E-Mail</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                aria-label="Patient Email Address"
                placeholder="eleanor@domain.com"
                className={`w-full py-3.5 pl-11 pr-4 bg-slate-50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all ${
                  errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-teal-500'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-[10px] font-medium flex items-center mt-1">
                <AlertCircle className="w-3 h-3 mr-1" /> {errors.email}
              </p>
            )}
          </div>

          {/* Select cardiology service */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide block">Required Clinical Service</label>
            <div className="relative">
              <select
                name="serviceId"
                value={formData.serviceId}
                onChange={handleInputChange}
                aria-label="Select Clinical Service"
                className={`w-full py-3.5 px-4 bg-slate-50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white appearance-none transition-all ${
                  errors.serviceId ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-teal-500'
                }`}
              >
                <option value="">-- Choose Procedure Portfolio --</option>
                {servicesData.map((svc) => (
                  <option key={svc.id} value={svc.id}>
                    {svc.name} ({svc.price})
                  </option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500">
                ▼
              </span>
            </div>
            {errors.serviceId && (
              <p className="text-red-500 text-[10px] font-medium flex items-center mt-1">
                <AlertCircle className="w-3 h-3 mr-1" /> {errors.serviceId}
              </p>
            )}
          </div>
        </div>

        {/* Date Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 tracking-wide block">Preferred Appointment Date</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              <Calendar className="w-4 h-4" />
            </span>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleInputChange}
              min={getMinDateString()}
              className={`w-full py-3.5 pl-11 pr-4 bg-slate-50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all ${
                errors.preferredDate ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-teal-500'
              }`}
            />
          </div>
          {errors.preferredDate && (
            <p className="text-red-500 text-[10px] font-medium flex items-center mt-1">
              <AlertCircle className="w-3 h-3 mr-1" /> {errors.preferredDate}
            </p>
          )}
        </div>

        {/* Time-slots picker */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-slate-700 tracking-wide flex items-center justify-between">
            <span>Available Hours Slots</span>
            <span className="text-[10px] text-teal-600 font-mono tracking-wider bg-teal-50 px-2 py-0.5 rounded">
              Verified Real-time Openings
            </span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {mockAvailableTimeSlots.map((slot) => {
              const isSelected = activeSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => selectTimeSlot(slot)}
                  className={`py-3 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/10'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-300 hover:bg-teal-50/20'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 inline mr-1 opacity-70" />
                  {slot}
                </button>
              );
            })}
          </div>
          {errors.preferredTime && (
            <p className="text-red-500 text-[10px] font-medium flex items-center mt-1">
              <AlertCircle className="w-3 h-3 mr-1" /> {errors.preferredTime}
            </p>
          )}
        </div>

        {/* Diagnostic note message context */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 tracking-wide block">
            Specialized Clinical Guidelines / Primary Symptoms <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <span className="absolute top-3.5 left-4 text-slate-400">
              <FileText className="w-4 h-4" />
            </span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={3}
              placeholder="E.g., high blood pressure readings over week, light fluttering sensations during training, standard preventive physical request."
              className="w-full py-3 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white focus:border-teal-500 transition-all resize-none"
            />
          </div>
        </div>

        {/* Form Submission indicator button */}
        <div className="pt-3">
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-teal-600/20 hover:shadow-teal-700/30 active:scale-98 transition-all flex items-center justify-center space-x-2.5 cursor-pointer"
          >
            <span>Confirm & Reserve Appointment Ticket</span>
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
          
          <div className="text-center text-[10px] text-slate-400 mt-4 leading-relaxed font-normal">
            By booking through the Aura digital portal, you confirm compliance with HIPAA clinical storage acts. Standard text booking notifications are dispatched instantly to your registered smartphone channel.
          </div>
        </div>

      </form>
    </div>
  );
}
