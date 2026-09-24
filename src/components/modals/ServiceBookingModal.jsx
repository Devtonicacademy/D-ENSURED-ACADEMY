import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import UniversitySelect from '../common/UniversitySelect';
import { X, CheckCircle2, ShieldCheck, ArrowRight, HelpCircle, FileText } from '../icons/FontAwesomeIcons';

export default function ServiceBookingModal() {
  const { isServiceModalOpen, setIsServiceModalOpen, selectedService, submitServiceRequest, initiatePayment } = useApp();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    studentName: user ? user.name : '',
    phone: user ? user.phone : '',
    email: user ? user.email : '',
    jambRegNo: user ? user.jambRegNo || '' : '',
    targetInstitution: user ? user.targetInstitution || 'University of Lagos (UNILAG)' : 'University of Lagos (UNILAG)',
    targetCourse: user ? user.targetCourse || 'Computer Science' : 'Computer Science',
    notes: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        studentName: user.name || prev.studentName,
        phone: user.phone || prev.phone,
        email: user.email || prev.email,
        jambRegNo: user.jambRegNo || prev.jambRegNo,
        targetInstitution: user.targetInstitution || prev.targetInstitution,
        targetCourse: user.targetCourse || prev.targetCourse
      }));
    }
  }, [user]);

  const [submitted, setSubmitted] = useState(false);
  const [requestRef, setRequestRef] = useState('');

  if (!isServiceModalOpen || !selectedService) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const refCode = 'DEC-' + Math.floor(100000 + Math.random() * 900000);
    setRequestRef(refCode);

    submitServiceRequest({
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      fee: selectedService.fee,
      studentName: formData.studentName,
      phone: formData.phone,
      email: formData.email,
      targetInstitution: formData.targetInstitution,
      targetCourse: formData.targetCourse,
      notes: formData.notes,
      referenceCode: refCode
    });

    setSubmitted(true);
  };

  const handlePayNow = () => {
    setIsServiceModalOpen(false);
    initiatePayment({
      title: `${selectedService.title} Processing`,
      amount: selectedService.fee,
      category: 'Admission Support'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 glass-panel rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-950 via-brandBlue-900 to-navy-950 p-6 border-b border-slate-800 relative">
          <button
            onClick={() => {
              setIsServiceModalOpen(false);
              setSubmitted(false);
            }}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X size={20} />
          </button>

          <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
            Official Advisory Booking
          </span>
          <h3 className="font-heading font-extrabold text-xl text-white mt-1">
            {selectedService.title}
          </h3>
          <div className="flex items-center gap-3 mt-2 text-xs font-mono">
            <span className="text-amber-300 font-bold text-sm">{selectedService.fee}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Turnaround: {selectedService.processingTime}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Candidate Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chinedu Okonkwo"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="08147896930"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">JAMB Reg No (Optional)</label>
                  <input
                    type="text"
                    placeholder="202610XXXXXX"
                    value={formData.jambRegNo}
                    onChange={(e) => setFormData({ ...formData, jambRegNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {(selectedService.id === 'change-institution' || selectedService.id === 'change-course' || selectedService.id === 'admission-processing' || selectedService.id === 'admission-consultation-special') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Target Institution</label>
                    <UniversitySelect
                      value={formData.targetInstitution}
                      onChange={(newUni) => setFormData({ ...formData, targetInstitution: newUni })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Target Course</label>
                    <input
                      type="text"
                      placeholder="e.g. Computer Science"
                      value={formData.targetCourse}
                      onChange={(e) => setFormData({ ...formData, targetCourse: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              {selectedService.requirements && selectedService.requirements.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Requirements Checklist</label>
                  <ul className="text-[11px] text-slate-400 space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    {selectedService.requirements.map((req, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-amber-400 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Specific Instructions / Notes</label>
                <textarea
                  rows={2}
                  placeholder="Provide any additional details or background..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <ShieldCheck size={16} /> Submit Advisory & Verification Request
                </button>
              </div>

            </form>
          ) : (
            <div className="text-center space-y-4 py-4 animate-fadeIn">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>

              <div>
                <h4 className="font-heading font-extrabold text-xl text-white">Application Recorded!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Your reference code is <span className="font-mono font-bold text-amber-400">{requestRef}</span>.
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Our senior admissions consultant will review your documentation within {selectedService.processingTime}.
                </p>
              </div>

              <div className="pt-4 flex flex-col gap-2.5">
                <button
                  onClick={handlePayNow}
                  className="w-full py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow transition"
                >
                  Proceed to Secure Checkout ({selectedService.fee})
                </button>
                <button
                  onClick={() => {
                    setIsServiceModalOpen(false);
                    setSubmitted(false);
                  }}
                  className="w-full py-2.5 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Close & Pay Later via Dashboard
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
