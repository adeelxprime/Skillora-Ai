import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Film, 
  Image as ImageIcon, 
  Sliders, 
  ShieldCheck, 
  ArrowRight,
  Cpu,
  Layers,
  Zap
} from 'lucide-react';

export function Hero({ 
  onExplorePrompts, 
  onOpenPricing,
  siteConfig,
  totalVideoPrompts,
  totalImagePrompts
}) {
  const slides = [
    {
      id: 1,
      subtitle: siteConfig?.heroSubtitle || 'WELCOME TO SKILLORA AI',
      title: 'QUALITY AI PROMPTS, BUILT FOR VIRAL CREATORS',
      description: 'OUR TEAM OF PROMPT ENGINEERS WILL HELP YOU TURN YOUR CREATIVE IDEAS INTO REALITY: PLANNED WITH CARE, TESTED FOR RETENTION, AND FINISHED TO A VIRAL STANDARD.',
      bgImage: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1920&q=80',
      badge: 'FEATURED #1005060: EAGLE REUNION ENGINE',
      ctaText: 'EXPLORE VIDEO PROMPTS',
      type: 'video'
    },
    {
      id: 2,
      subtitle: 'MIDJOURNEY v6.1 & FLUX.1 PRO',
      title: 'HYPER-REALISTIC IMAGERY, CRAFTED WITH PRECISION',
      description: 'EXPLORE MASTER PROMPTS FOR EDITORIAL PORTRAITURE, ARCHITECTURAL CONCEPT DESIGN, LUXURY COMMERCIALS, AND CINEMATIC FRAMES.',
      bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
      badge: 'NEW: NORDIC FJORD GLASS VILLA',
      ctaText: 'EXPLORE IMAGE PROMPTS',
      type: 'image'
    },
    {
      id: 3,
      subtitle: 'RUNWAY GEN-3 & KLING 1.5 WORKFLOWS',
      title: 'TURN VIRAL IDEAS INTO REPEATABLE CONTENT ENGINES',
      description: 'COMPLETE STORYBOARDS WITH CAMERA SPEEDS, SEED CONTROLS, AND SOUND DESIGN WORKFLOWS DESIGNED SPECIFICALLY FOR REELS AND TIKTOKS.',
      bgImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80',
      badge: 'TRENDING: TOKYO CYBERPUNK DRIFT',
      ctaText: 'CLAIM CREATOR PASS',
      type: 'pricing'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto advance slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-[#030712]">
      
      {/* 1. HERO SLIDER BANNER (Styled with Logo Cyan & Purple Gradients) */}
      <div className="relative min-h-[520px] sm:min-h-[600px] lg:min-h-[640px] flex items-center justify-center">
        
        {/* Background Image with Dark Contrast Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
          style={{ backgroundImage: `url(${active.bgImage})` }}
        ></div>
        
        {/* Futuristic Blue/Purple Gradient Overlay matching Logo */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/90 via-[#030712]/75 to-[#0b1026]/85 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-radial-gradient opacity-60"></div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Left Slider Arrow Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-8 z-20 p-2.5 sm:p-3 rounded-xl bg-[#070e20]/80 hover:bg-cyan-500/20 text-white hover:text-cyan-300 transition border border-cyan-500/30 backdrop-blur-md cursor-pointer hover:border-cyan-400"
          title="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Right Slider Arrow Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-8 z-20 p-2.5 sm:p-3 rounded-xl bg-[#070e20]/80 hover:bg-cyan-500/20 text-white hover:text-cyan-300 transition border border-cyan-500/30 backdrop-blur-md cursor-pointer hover:border-cyan-400"
          title="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Center Content Box (Aligned with Logo Aesthetics) */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white py-12">
          
          {/* Subtitle with Circuit/Tech Dots */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_-3px_rgba(56,189,248,0.3)]">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>{active.subtitle}</span>
          </div>

          {/* Big Bold Headline with Logo Cyan-to-Purple Gradient */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] uppercase font-heading">
            QUALITY AI PROMPTS,{' '}
            <span className="brand-text-gradient underline decoration-cyan-400/40 decoration-wavy decoration-2">
              BUILT FOR VIRAL CREATORS
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto uppercase tracking-wide leading-relaxed font-medium">
            {active.description}
          </p>

          {/* Buttons: Primary Gradient (Logo Colors) + Secondary Glass */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onExplorePrompts(active.type)}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:via-blue-400 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition shadow-lg shadow-cyan-500/30 border border-cyan-300/40 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{active.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-cyan-200" />
            </button>

            <button
              onClick={onOpenPricing}
              className="px-6 py-3.5 rounded-xl bg-[#0a1226]/80 hover:bg-[#0f1b38] text-cyan-300 hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-cyan-500/40 backdrop-blur-md transition cursor-pointer"
            >
              GET PRO ACCESS ($10)
            </button>
          </div>

          {/* Slide Indicator Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 transition-all rounded-full ${
                  currentSlide === idx ? 'w-8 bg-gradient-to-r from-cyan-400 to-purple-500' : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* 2. 4-FEATURE CARDS BAR BELOW HERO (Clickable & Interactive) */}
      <div className="bg-[#070d1d] border-y border-cyan-500/20 py-10 px-4 sm:px-8 shadow-2xl relative cyber-grid">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Column 1: AI Video Engine */}
          <div 
            onClick={() => onExplorePrompts('video')}
            className="p-6 rounded-2xl bg-[#0a1329]/80 border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(56,189,248,0.2)] group text-center sm:text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition shadow-inner">
              <Film className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition">
                AI Video Engine
              </h3>
              <ArrowRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              {totalVideoPrompts}+ master prompts tested on Kling AI 1.5, Runway Gen-3 Alpha, and Luma Dream Machine.
            </p>
          </div>

          {/* Column 2: Image Generation */}
          <div 
            onClick={() => onExplorePrompts('image')}
            className="p-6 rounded-2xl bg-[#0a1329]/80 border border-purple-500/20 hover:border-purple-400/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(168,85,247,0.2)] group text-center sm:text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition shadow-inner">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-white tracking-tight group-hover:text-purple-300 transition">
                Image Generation
              </h3>
              <ArrowRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              {totalImagePrompts}+ ultra-detailed prompts crafted for Midjourney v6.1 (--style raw) and Flux.1 Pro.
            </p>
          </div>

          {/* Column 3: Storyboards & Motion */}
          <div 
            onClick={() => onExplorePrompts('video')}
            className="p-6 rounded-2xl bg-[#0a1329]/80 border border-blue-500/20 hover:border-blue-400/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(59,130,246,0.2)] group text-center sm:text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition shadow-inner">
              <Sliders className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-white tracking-tight group-hover:text-blue-300 transition">
                Master Storyboards
              </h3>
              <ArrowRight className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Scene-by-scene multi-frame guides, camera motions, FPS, seeds, and negative exclusions for high retention.
            </p>
          </div>

          {/* Column 4: Admin Controlled */}
          <div 
            onClick={onOpenPricing}
            className="p-6 rounded-2xl bg-[#0a1329]/80 border border-emerald-500/20 hover:border-emerald-400/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(16,185,129,0.2)] group text-center sm:text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-white tracking-tight group-hover:text-emerald-300 transition">
                Creator Pass
              </h3>
              <ArrowRight className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Unlock the entire library of 20+ viral prompts and creator workflows with one-click access.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}
