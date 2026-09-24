import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, CreditCard, Lock, CheckCircle2, ArrowRight, Download, Building } from 'lucide-react';

export default function PaymentModal() {
  const { isPaymentModalOpen, setIsPaymentModalOpen, paymentItem, completePayment, setActiveTab } = useApp();
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'bank' | 'ussd'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isPaymentModalOpen || !paymentItem) return null;

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      completePayment(paymentItem);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md glass-panel rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-400" />
            <span className="text-xs font-bold text-slate-200">Secure Nigerian Payment Gateway</span>
          </div>
          <button
            onClick={() => {
              setIsPaymentModalOpen(false);
              setIsSuccess(false);
            }}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handlePay} className="p-6 space-y-4">
            
            {/* Order summary */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <p className="text-[11px] text-slate-400 uppercase font-mono">Item Checkout</p>
              <p className="font-bold text-sm text-white mt-0.5">{paymentItem.title}</p>
              <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Total Payable:</span>
                <span className="font-heading font-extrabold text-base text-amber-400">{paymentItem.price}</span>
              </div>
            </div>

            {/* Payment options */}
            <div className="flex gap-2">
              {[
                { id: 'card', label: 'Debit Card' },
                { id: 'bank', label: 'Bank Transfer' },
                { id: 'ussd', label: 'USSD Code' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                    paymentMethod === m.id
                      ? 'bg-amber-400/10 border-amber-400 text-amber-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    placeholder="5399 •••• •••• 1042"
                    defaultValue="5399 4810 2026 8810"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      defaultValue="08/28"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">CVV</label>
                    <input
                      type="password"
                      required
                      placeholder="123"
                      defaultValue="881"
                      maxLength={3}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <p className="font-semibold text-amber-300">Official Account Details:</p>
                <div className="font-mono text-[11px] space-y-1 text-slate-200">
                  <p>Bank: <span className="font-bold text-white">GTBank / Zenith Bank</span></p>
                  <p>Account Name: <span className="font-bold text-white">D Ensured Consult Ltd</span></p>
                  <p>Account No: <span className="font-bold text-amber-400">08147896930</span></p>
                </div>
              </div>
            )}

            {paymentMethod === 'ussd' && (
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 text-center">
                <p className="text-slate-400">Dial on your phone to complete payment:</p>
                <p className="font-mono font-bold text-base text-amber-400 my-2">*737*000*8810#</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Processing Payment...</span>
              ) : (
                <span>Pay {paymentItem.price} Now</span>
              )}
            </button>

            <div className="text-center text-[10px] text-slate-500 flex items-center justify-center gap-1">
              <Lock size={12} /> 256-Bit SSL Encryption • Instant Verification
            </div>

          </form>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg text-white">Payment Successful!</h4>
              <p className="text-xs text-slate-300 mt-1">
                Receipt #DEC-{Math.floor(100000 + Math.random() * 900000)} generated.
              </p>
              <p className="text-xs text-emerald-400 font-semibold mt-2">
                {paymentItem.type === 'course' ? 'Course access unlocked in Student Dashboard.' : 'Service processing initiated.'}
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsPaymentModalOpen(false);
                  setIsSuccess(false);
                  setActiveTab('DASHBOARD');
                }}
                className="w-full py-3 text-xs font-bold text-slate-950 bg-amber-400 rounded-xl shadow-lg hover:bg-amber-300 transition"
              >
                Go to Student Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
