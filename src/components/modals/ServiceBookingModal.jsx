import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { X, CheckCircle2, ShieldCheck, ArrowRight, HelpCircle, FileText } from 'lucide-react';

export default function ServiceBookingModal() {
  const { isServiceModalOpen, setIsServiceModalOpen, selectedService, submitServiceRequest, initiatePayment } = useApp();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    studentName: user ? user.name : '',
    phone: user ? user.phone : '',
    email: user ? user.email : '',
    jambRegNo: user ? user.jambRegNo || '' : '',
    targetInstitution: 'University of Lagos (UNILAG)',
    targetCourse: 'Computer Science',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [requestRef, setRequestRef] = useState('');

  if (!isServiceModalOpen || !selectedService) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const req = submitServiceRequest({
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      studentName: formData.studentName || 'Candidate',
      phone: formData.phone || '08147896930',
      targetInstitution: formData.targetInstitution,
      targetCourse: formData.targetCourse
    });
    setRequestRef(req.id);
    setSubmitted(true);
  };

  const handleProceedPayment = () => {
    setIsServiceModalOpen(false);
    initiatePayment({
      id: selectedService.id,
      title: selectedService.title,
      price: selectedService.fee,
      type: 'service',
      studentName: formData.studentName,
      phone: formData.phone
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel rounded-2xl shadow-2xl border border-slate-700 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-900 via-brandBlue-900 to-navy-900 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/d_ensured_logo.jpg" alt="Logo" className="w-9 h-9 rounded-full border border-amber-400" />
            <div>
              <h3 className="font-heading font-bold text-base text-white">{selectedService.title}</h3>
              <p className="text-xs text-amber-400 font-mono">Service Booking & Consultancy</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsServiceModalOpen(false);
              setSubmitted(false);
            }}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                <p className="font-semibold text-amber-300 mb-1">Service Details:</p>
                <p className="leading-relaxed">{selectedService.fullDesc}</p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono border-t border-slate-800/80 pt-2 text-slate-400">
                  <span>Processing Time: <strong className="text-slate-200">{selectedService.processingTime}</strong></span>
                  <span>Fee: <strong className="text-amber-400 font-bold">{selectedService.fee}</strong></span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Candidate Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chinedu Okonkwo"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="08147896930"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">JAMB Reg Number (Optional)</label>
                  <input
                    type="text"
                    placeholder="202610492819GA"
                    value={formData.jambRegNo}
                    onChange={(e) => setFormData({ ...formData, jambRegNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {(selectedService.id === 'change-institution' || selectedService.id === 'change-course' || selectedService.id === 'admission-processing') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Target Institution</label>
                    <input
                      type="text"
                      placeholder="e.g. UNILAG / LASU"
                      value={formData.targetInstitution}
                      onChange={(e) => setFormData({ ...formData, targetInstitution: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
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

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                Submit Service Request <ArrowRight size={14} />
              </button>

            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <h4 className="font-heading font-bold text-lg text-white">Application Received!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Your reference ID is <strong className="text-amber-400 font-mono">{requestRef}</strong>.
                </p>
                <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
                  Our admissions consultant will reach out via WhatsApp ({formData.phone}) within 2 hours. You can also pay online now to fast-track processing.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleProceedPayment}
                  className="flex-1 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition"
                >
                  Proceed to Payment ({selectedService.fee})
                </button>
                <button
                  onClick={() => {
                    setIsServiceModalOpen(false);
                    setSubmitted(false);
                  }}
                  className="flex-1 py-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-xl transition"
                >
                  Track in Dashboard
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
