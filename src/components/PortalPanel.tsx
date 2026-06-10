import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { servicesData, doctorData } from '../data';
import { Ticket, Search, AlertCircle, X, CheckSquare, Calendar, RefreshCcw, Printer, CalendarPlus } from 'lucide-react';

interface PortalPanelProps {
  onClose: () => void;
  highlightedBooking?: Appointment | null;
}

export default function PortalPanel({ onClose, highlightedBooking }: PortalPanelProps) {
  const [searchCode, setSearchCode] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [foundBooking, setFoundBooking] = useState<Appointment | null>(null);
  const [searchError, setSearchError] = useState('');
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState('');

  // Load appointments from localStorage
  const loadAppointments = () => {
    const list = JSON.parse(localStorage.getItem('aura_appointments') || '[]');
    setAppointments(list);
    return list;
  };

  useEffect(() => {
    const list = loadAppointments();
    if (highlightedBooking) {
      setFoundBooking(highlightedBooking);
    } else if (list.length > 0) {
      // pre-populate with the last one for smooth flow
      setFoundBooking(list[list.length - 1]);
    }
  }, [highlightedBooking]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    setCancelSuccessMsg('');

    if (!searchCode.trim()) {
      setSearchError('Please provide a ticket code to scan');
      return;
    }

    const match = appointments.find(
      app => app.bookingCode.toLowerCase() === searchCode.trim().toLowerCase()
    );

    if (match) {
      setFoundBooking(match);
    } else {
      setSearchError('No active diagnostic ticket found corresponding to that key code');
      setFoundBooking(null);
    }
  };

  const handleCancelBooking = (id: string) => {
    const list = loadAppointments();
    const updated = list.map((app: Appointment) => {
      if (app.id === id) {
        return { ...app, status: 'cancelled' as const };
      }
      return app;
    });

    localStorage.setItem('aura_appointments', JSON.stringify(updated));
    setAppointments(updated);
    
    // update current look
    if (foundBooking && foundBooking.id === id) {
      setFoundBooking({ ...foundBooking, status: 'cancelled' as const });
    }

    setCancelSuccessMsg('Your scheduled cardiac consultation ticket has been successfully cancelled.');
  };

  const getServiceDetails = (serviceId: string) => {
    return servicesData.find(s => s.id === serviceId);
  };

  // Convert dates nicely
  const formatDateFriendly = (dateStr: string) => {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr + 'T00:00:00');
    return dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleSimulatedDownload = () => {
    if (!foundBooking) return;
    const service = getServiceDetails(foundBooking.serviceId);
    
    const fileContent = `
=============================================
      AURA CARDIOVASCULAR CLINIC TICKET
=============================================
Ticket Code:  ${foundBooking.bookingCode}
Patient Name: ${foundBooking.patientName}
Contact Phone: ${foundBooking.patientPhone}
Contact Email: ${foundBooking.patientEmail}

---------------------------------------------
Procedure:    ${service?.name || 'Cardiology Consult'}
Session Date: ${formatDateFriendly(foundBooking.preferredDate)}
Session Time: ${foundBooking.preferredTime}
Cost:         ${service?.price || '$180'}
---------------------------------------------
Physician:    ${doctorData.name}
Clinic Address: ${doctorData.address}
Emergency line: ${doctorData.emergencyContact}

Status:       ${foundBooking.status.toUpperCase()}
Thank you for trusting Aura Wellness Services.
=============================================
`;

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Aura-Apt-Ticket-${foundBooking.bookingCode}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSimulatedCalendarMock = () => {
    alert("Simulated Action: Custom ICS file generated and downloaded. Your appointment is synced to Google & Apple Calendar pools!");
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl text-left w-full max-w-4xl mx-auto">
      
      {/* Top action header info */}
      <div className="bg-slate-950 p-6 sm:p-8 flex justify-between items-center border-b border-slate-900">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-teal-500/10 rounded-xl text-teal-400">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight">Personal Intake Dashboard</h3>
            <p className="text-slate-400 text-xs mt-0.5 font-light">
              Review, track, and download code tickets, or modify emergency bookings.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
        >
          <X className="w-5.5 h-5.5" />
        </button>
      </div>

      {/* Main Grid mapping search B/S */}
      <div className="p-6 sm:p-8 grid md:grid-cols-12 gap-8">
        
        {/* Left Search Side controller */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-slate-950/50 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-teal-400 uppercase">Search active tickets</h4>
            
            <form onSubmit={handleSearch} className="space-y-3">
              <div className="relative">
                <Search className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="E.g., AURA-0611-C7D9"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500 text-teal-300"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Verify Ticket Status</span>
              </button>
            </form>

            {searchError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 text-xs leading-relaxed flex items-start">
                <AlertCircle className="w-4 h-4 shrink-0 mr-2 mt-0.5" />
                <span>{searchError}</span>
              </div>
            )}
          </div>

          {/* Quick list of recent bookings */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">Recent Clinic Bookings</h4>
            {appointments.length === 0 ? (
              <p className="text-slate-500 text-xs italic">No clinic tickets registered on this device browser session.</p>
            ) : (
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1.5">
                {appointments.slice().reverse().map((apt) => (
                  <button
                    key={apt.id}
                    onClick={() => {
                      setFoundBooking(apt);
                      setCancelSuccessMsg('');
                      setSearchError('');
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs flex justify-between items-center transition-all cursor-pointer ${
                      foundBooking?.id === apt.id
                        ? 'bg-slate-800/80 border-teal-500/50 text-white'
                        : 'bg-slate-950/35 border-slate-800 text-slate-400 hover:bg-slate-800/40 hover:text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold flex items-center space-x-1.5">
                        <span className="text-white">{apt.patientName}</span>
                        <span className="text-[9px] text-slate-500 font-mono">({apt.bookingCode})</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{apt.preferredDate} @ {apt.preferredTime}</div>
                    </div>
                    <span className={`text-[9px] font-mono font-bold uppercase rounded py-0.5 px-2 ${
                      apt.status === 'confirmed' || apt.status === 'pending'
                        ? 'bg-teal-500/15 text-teal-400'
                        : 'bg-red-500/15 text-red-400'
                    }`}>
                      {apt.status}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Active Ticket / Receipt Visualizer Side */}
        <div className="md:col-span-7">
          {foundBooking ? (
            <div className="space-y-6">
              
              {/* Digital receipt artifact wrapper */}
              <div id="booking-receipt-printable" className="bg-slate-950 rounded-2xl border border-slate-800/80 p-6 relative overflow-hidden">
                {/* Vintage side stamps overlay */}
                <div className="absolute top-0 right-0 p-4 border-b border-l border-slate-800/50 bg-slate-900/40 rounded-bl-xl text-[9px] font-mono text-slate-500 select-none">
                  SECURE TICKET
                </div>

                <div className="space-y-6">
                  {/* Status header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <div className="text-[10px] font-mono tracking-widest text-teal-400 uppercase">AURA DIAGNOSTICS DEPT</div>
                      <h5 className="text-xl font-bold font-display text-white mt-1">{foundBooking.bookingCode}</h5>
                    </div>
                    
                    <span className={`text-[10px] font-mono font-bold tracking-widest uppercase rounded-full px-3 py-1 ${
                      foundBooking.status === 'cancelled'
                        ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                        : foundBooking.status === 'confirmed'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-teal-500/15 text-teal-400 border border-teal-500/30 animate-pulse'
                    }`}>
                      {foundBooking.status}
                    </span>
                  </div>

                  {/* Core details mapping */}
                  <div className="grid sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-slate-500 font-mono tracking-wide">PATIENT REGISTERED:</div>
                      <div className="font-bold text-white text-sm mt-0.5">{foundBooking.patientName}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 font-mono tracking-wide">REQUIRED PROCEDURE:</div>
                      <div className="font-bold text-teal-400 text-sm mt-0.5">
                        {getServiceDetails(foundBooking.serviceId)?.name || 'Comprehensive Consult'}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500 font-mono tracking-wide">CONFIRMED DATE:</div>
                      <div className="font-bold text-white mt-0.5">{formatDateFriendly(foundBooking.preferredDate)}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 font-mono tracking-wide">SESSION TIME:</div>
                      <div className="font-bold text-white mt-0.5">{foundBooking.preferredTime}</div>
                    </div>
                  </div>

                  {/* Notes / message section if filled */}
                  {foundBooking.message && (
                    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 text-xs">
                      <div className="text-slate-400 font-bold mb-1">Stated Symptom Context:</div>
                      <p className="text-slate-300 font-light leading-relaxed">"{foundBooking.message}"</p>
                    </div>
                  )}

                  {/* Address and details of clinic */}
                  <div className="border-t border-slate-800 pt-4 text-[11px] text-slate-500 flex flex-wrap justify-between gap-2.5">
                    <div>
                      <div className="font-bold text-slate-400 uppercase tracking-wider font-mono text-[9px]">CLINIC FACILITY</div>
                      <div className="mt-1 leading-normal max-w-xs">{doctorData.address}</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-400 uppercase tracking-wider font-mono text-[9px]">DIRECTIONS HOTLINE</div>
                      <div className="mt-1 font-bold text-slate-300">{doctorData.emergencyContact}</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Cancel success feedback */}
              {cancelSuccessMsg && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-4 text-xs leading-relaxed">
                  {cancelSuccessMsg}
                </div>
              )}

              {/* Ticket functional actions */}
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={handleSimulatedDownload}
                  className="bg-slate-800 hover:bg-slate-700 text-white rounded-xl py-2.5 px-4 text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-400" />
                  <span>Download Print Ticket</span>
                </button>

                <button
                  onClick={handleSimulatedCalendarMock}
                  className="bg-slate-800 hover:bg-slate-700 text-white rounded-xl py-2.5 px-4 text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <CalendarPlus className="w-4 h-4 text-teal-400" />
                  <span>Add To Calendar</span>
                </button>

                {foundBooking.status !== 'cancelled' ? (
                  <button
                    onClick={() => handleCancelBooking(foundBooking.id)}
                    className="bg-red-500/15 hover:bg-red-500 hover:text-white border border-red-500/30 text-red-400 rounded-xl py-2.5 px-4 text-xs font-bold transition-all ml-auto cursor-pointer"
                  >
                    <span>Request Cancellation</span>
                  </button>
                ) : (
                  <div className="text-red-400 text-xs font-bold uppercase tracking-wider bg-red-500/5 border border-red-500/20 py-2.5 px-4 rounded-xl ml-auto font-mono select-none">
                    Session Cancelled
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/25 min-h-[300px]">
              <Ticket className="w-12 h-12 text-slate-700 mb-4 stroke-[1.2]" />
              <h5 className="font-bold text-slate-400">No Booking Ticket Evaluated</h5>
              <p className="text-slate-500 text-xs mt-1 max-w-sm font-light">
                Please input a verified ticket ID code in the scanner panel, or pick a recent booking inside your local list.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
