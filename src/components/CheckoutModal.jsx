import React, { useState } from 'react';
import { X, Crown, Check, ShieldCheck, MessageCircle, ArrowRight, Zap } from 'lucide-react';

export function CheckoutModal({ plan, onClose, onActivatePreviewPro, siteConfig }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('whatsapp');

  if (!plan) return null;

  const whatsappNum = siteConfig?.whatsAppNumber || '923161056008';

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello Skillora AI Team! I want to activate the ${plan.name} (${plan.price} - ${plan.billing}). Name: ${name || 'Creator'}, Email: ${email || 'Not provided'}`
    );
    window.open(`https://wa.me/${whatsappNum}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="fixed inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-lg bg-[#05191f] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#08242b] hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-400/40 mb-2">
            <Crown className="w-3.5 h-3.5" />
            <span>INSTANT CREATOR ACTIVATION</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            Get {plan.name} Access
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {plan.saveText} • Instant activation with admin verification
          </p>
        </div>

        {/* Selected Plan Summary Card */}
        <div className="p-4 rounded-2xl bg-[#031317] border border-[#143d48] flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-cyan-400">{plan.title}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{plan.audience}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-white">{plan.price}</div>
            <div className="text-[10px] text-slate-400">{plan.billing}</div>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleWhatsAppCheckout} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Full Name:
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Khizer Khan"
              className="w-full bg-[#020d11] border border-[#143e49] p-3 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Email Address:
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="creator@gmail.com"
              className="w-full bg-[#020d11] border border-[#143e49] p-3 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Payment & Activation Method:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('whatsapp')}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold cursor-pointer ${
                  paymentMethod === 'whatsapp'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-[#020e12] border-[#133742] text-slate-400'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Instant WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('online')}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold cursor-pointer ${
                  paymentMethod === 'online'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-[#020e12] border-[#133742] text-slate-400'
                }`}
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Card / EasyPaisa</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 font-black text-sm hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Proceed via WhatsApp Checkout ({plan.price})</span>
          </button>
        </form>

        {/* Demo Unlock for Testing */}
        <div className="pt-2 border-t border-[#123640] text-center">
          <button
            type="button"
            onClick={() => {
              onActivatePreviewPro();
              onClose();
            }}
            className="text-xs text-cyan-400 hover:underline cursor-pointer"
          >
            Or click here to temporarily simulate Pro access in preview mode &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}
