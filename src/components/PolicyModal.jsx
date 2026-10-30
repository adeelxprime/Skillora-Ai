import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, RefreshCw, FileText, CheckCircle2, MessageCircle, Mail, ExternalLink } from 'lucide-react';

export function PolicyModal({ isOpen, onClose, initialTab = 'privacy', siteConfig }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const phoneDisplay = siteConfig?.phone || '+92 316 1056008';
  const whatsappNum = siteConfig?.whatsAppNumber || '923161056008';
  const emailSupport = siteConfig?.email || 'skilloraai87@gmail.com';
  const ownerName = siteConfig?.ownerName || 'Khizer Khan';

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true"></div>

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#070e1f] border border-cyan-500/30 rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-cyan-500/20 bg-[#091329] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
              {activeTab === 'privacy' && <ShieldCheck className="w-5 h-5" />}
              {activeTab === 'refund' && <RefreshCw className="w-5 h-5" />}
              {activeTab === 'terms' && <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-wide">
                {activeTab === 'privacy' && 'Privacy Policy'}
                {activeTab === 'refund' && 'Refund & Cancellation Policy'}
                {activeTab === 'terms' && 'Terms of Service'}
              </h2>
              <p className="text-xs text-slate-400">
                Official Creator Guidelines • Last Updated: October 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer border border-slate-700"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-[#050a17] px-6 gap-2 shrink-0 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'privacy'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('refund')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'refund'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refund Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'terms'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>
        </div>

        {/* Content Body (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
          
          {/* TAB 1: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 text-xs leading-relaxed">
                <strong>Skillora AI</strong> (Managed by <strong>{ownerName}</strong>) respects your privacy and is committed to protecting all personal information and creator asset details you share with us.
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  1. Information We Collect
                </h3>
                <p>
                  When you visit Skillora AI, submit generation inquiries, or subscribe to Pro prompt passes, we may collect your name, email address, WhatsApp contact information, and billing receipts. We never record or store full credit card credentials on our servers.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  2. How We Use Your Data
                </h3>
                <p>
                  Your information is solely used to deliver master AI video & image prompts, issue license confirmations, provide 24/7 creator support via WhatsApp or email, and share regular prompt pack updates.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  3. Strict Data Confidentiality
                </h3>
                <p>
                  We have a strict anti-selling policy. We never sell, rent, monetize, or disclose your creator identity or contact credentials to any third-party marketing brokers or advertising networks.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  4. Security & Local Storage
                </h3>
                <p>
                  Skillora AI uses modern SSL encryption protocols across all web endpoints. Your local saved bookmarks and Prompt Studio preferences are securely maintained within your browser's private local cache.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  5. Privacy Questions & Support
                </h3>
                <p>
                  If you have questions about our data practices or wish to request data removal, please contact our dedicated support team directly at{' '}
                  <a href={`mailto:${emailSupport}`} className="text-cyan-300 font-bold hover:underline">
                    {emailSupport}
                  </a>{' '}
                  or via WhatsApp at{' '}
                  <a href={`https://wa.me/${whatsappNum}`} target="_blank" rel="noreferrer" className="text-emerald-400 font-bold hover:underline">
                    {phoneDisplay}
                  </a>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: REFUND POLICY */}
          {activeTab === 'refund' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-400/30 text-purple-200 text-xs leading-relaxed">
                We take immense pride in the craftsmanship of our AI prompts and workflows. Our Refund & Cancellation Policy ensures you are completely satisfied with every purchase.
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  1. Digital Product Delivery
                </h3>
                <p>
                  All Skillora AI products (including Pro Passes, Storyboard Packs, and Master Prompt Collections) are digital assets accessible immediately upon payment confirmation.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  2. 7-Day Satisfaction Guarantee
                </h3>
                <p>
                  If you encounter technical issues, non-functional prompt outputs, or if a purchased plan does not match the specifications described on our website, you are eligible for an immediate review, prompt replacement, or a refund within <strong>7 days</strong> of your initial purchase.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  3. Non-Refundable Scenarios
                </h3>
                <p>
                  Refunds cannot be issued for completed custom bespoke 1-on-1 prompt engineering work that has already been delivered and approved, or after excessive bulk downloading of the complete prompt repository.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  4. How to Request a Refund
                </h3>
                <p>
                  To request a refund, simply send a message with your Order ID or payment screenshot to our customer support desk:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-[#030917] border border-purple-500/30 flex items-center gap-3">
                    <Mail className="w-5 h-5 text-purple-400 shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-400 font-bold">Email Support</div>
                      <a href={`mailto:${emailSupport}`} className="text-xs text-white hover:text-purple-300 font-semibold break-all">
                        {emailSupport}
                      </a>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#030917] border border-emerald-500/30 flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-400 font-bold">WhatsApp Support</div>
                      <a href={`https://wa.me/${whatsappNum}`} target="_blank" rel="noreferrer" className="text-xs text-white hover:text-emerald-300 font-semibold">
                        {phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  5. Fast Resolution Time
                </h3>
                <p>
                  Refund requests are acknowledged within 2 to 4 hours and finalized within <strong>24 to 48 business hours</strong> via original payment method (Easypaisa, JazzCash, Bank Transfer, or Card).
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-400/30 text-blue-200 text-xs leading-relaxed">
                By browsing Skillora AI and using our prompt blueprints, you agree to comply with the terms and licensing guidelines detailed below.
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  1. Commercial Creator License
                </h3>
                <p>
                  You receive full commercial and personal rights to all videos, images, social media posts, ads, and client assets generated using Skillora AI prompts. You retain 100% ownership of your rendered creations.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  2. Anti-Piracy & Reselling Restrictions
                </h3>
                <p>
                  You may not re-distribute, scrape, resell, or publicly clone the raw Skillora AI prompt database or proprietary system instructions as a competing service without written authorization from {ownerName}.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  3. Service Availability
                </h3>
                <p>
                  We strive for 99.9% platform availability. Our team regularly updates models (Runway Gen-3, Kling 1.5, Midjourney v6.1, Flux.1) to ensure optimal generation results across third-party AI generators.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#050a17] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>Direct Support:</span>
            <a
              href={`mailto:${emailSupport}`}
              className="text-cyan-300 hover:underline flex items-center gap-1 font-bold"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{emailSupport}</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs hover:brightness-110 transition cursor-pointer"
          >
            I Understand & Accept
          </button>
        </div>

      </div>
    </div>
  );
}
