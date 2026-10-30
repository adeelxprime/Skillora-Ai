import React, { useState } from 'react';
import { 
  Check, 
  Crown, 
  Zap, 
  ShieldCheck, 
  MessageCircle, 
  HelpCircle, 
  Sparkles, 
  ArrowRight,
  Lock
} from 'lucide-react';
import { PRICING_PLANS } from '../data/prompts';

export function PricingSection({ onSelectPlan, plans = PRICING_PLANS }) {
  const [selectedPlanId, setSelectedPlanId] = useState('pro');

  const displayPlans = (plans && plans.length > 0 ? plans : PRICING_PLANS)
    .filter(p => p.id !== 'custom' && !p.name?.toLowerCase().includes('bespoke') && p.price !== 'Custom Quote');

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-4 shadow-[0_0_15px_-3px_rgba(56,189,248,0.3)]">
          <Crown className="w-3.5 h-3.5 text-cyan-400" />
          <span>CREATOR MEMBERSHIP PLANS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase font-heading">
          TURN VIRAL IDEAS INTO A{' '}
          <span className="brand-text-gradient">
            REPEATABLE CONTENT
          </span>{' '}
          SYSTEM.
        </h2>
        <p className="mt-4 text-base text-slate-300 leading-relaxed">
          Choose the creator plan built for your next level. Unlock premium video & image master prompts, 
          viral storyboard references, and lifetime workflows.
        </p>

        {/* Assurances Banner */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Admin Verified Access
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-cyan-400" />
            No Auto-Renewal (One-Time)
          </span>
          <span className="flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            WhatsApp Creator Support
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid (3-Column Layout for Starter, Pro, LMS Masterclass) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
        {displayPlans.map((plan) => {
          const isSelected = plan.id === selectedPlanId;
          const isPro = plan.popular;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border cursor-pointer ${
                isPro
                  ? 'bg-gradient-to-b from-[#0b1736] via-[#091126] to-[#050a16] border-cyan-400 shadow-[0_0_35px_-5px_rgba(56,189,248,0.35)] ring-2 ring-cyan-400/40 lg:-translate-y-2'
                  : 'bg-[#081022] border-cyan-500/15 hover:border-cyan-400/50 hover:bg-[#0c1833]'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md whitespace-nowrap ${
                    isPro 
                      ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white shadow-cyan-500/30' 
                      : 'bg-[#0a1530] text-cyan-300 border border-cyan-500/30'
                  }`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mt-2">
                  {plan.name}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {plan.audience}
                </div>

                {/* Pricing Display */}
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">
                    {plan.price}
                  </span>
                  {plan.originalPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      {plan.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 font-medium">
                    / {plan.billing}
                  </span>
                </div>

                <div className="text-[11px] text-cyan-400/90 font-medium mt-1">
                  {plan.saveText}
                </div>

                <p className="mt-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
                  {plan.description}
                </p>

                {/* Feature List */}
                <div className="mt-6 space-y-2.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Included Benefits:
                  </div>
                  {plan.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                      <div className="p-0.5 rounded bg-cyan-500/20 text-cyan-400 shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-slate-800">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPlan(plan);
                  }}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
                    isPro
                      ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:brightness-110 text-white font-black shadow-cyan-500/30'
                      : 'bg-[#0a1530] hover:bg-[#10224d] text-cyan-300 border border-cyan-500/30'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* WhatsApp Help Callout */}
      <div className="mt-12 p-6 rounded-2xl bg-[#081022] border border-cyan-500/20 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Any payment or custom access questions?</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Chat directly with our prompt engineering & admin team on WhatsApp.
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/923161056008?text=Hi%20Skillora%20AI%20Team%2C%20I%20have%20a%20question%20about%20the%20creator%20plans."
          target="_blank"
          rel="noreferrer"
          className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
