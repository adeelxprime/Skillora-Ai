import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Search, 
  Menu, 
  X, 
  Crown, 
  Sparkles, 
  Film, 
  Image as ImageIcon, 
  Sliders, 
  CreditCard, 
  Users,
  Zap,
  ArrowRight,
  Lock
} from 'lucide-react';

export function Navbar({ 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  isProMember, 
  setIsProMember,
  onOpenPricing,
  siteConfig,
  videoCount,
  imageCount,
  isAdminAuthenticated,
  onOpenAdminLogin
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hidden admin panel: Only public navigation items here for visitors; Admin Hub appears once authenticated
  const navLinks = [
    { 
      id: 'home', 
      label: 'HOME', 
      action: () => { 
        setActiveTab('browse'); 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
      } 
    },
    { 
      id: 'video', 
      label: 'VIDEO PROMPTS', 
      badge: `${videoCount}`, 
      action: () => { 
        setActiveTab('video-prompts'); 
        setTimeout(() => {
          document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      } 
    },
    { 
      id: 'image', 
      label: 'IMAGE PROMPTS', 
      badge: `${imageCount}`, 
      action: () => { 
        setActiveTab('image-prompts'); 
        setTimeout(() => {
          document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      } 
    },
    { 
      id: 'generator', 
      label: 'AI STUDIO', 
      badge: 'NEW', 
      action: () => { 
        setActiveTab('generator'); 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
      } 
    },
    { 
      id: 'pricing', 
      label: 'PRICING', 
      action: () => { 
        setActiveTab('pricing'); 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
      } 
    },
    { 
      id: 'community', 
      label: 'COMMUNITY', 
      action: () => { 
        setActiveTab('community'); 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
      } 
    },
    ...(isAdminAuthenticated ? [{
      id: 'admin',
      label: 'ADMIN HUB',
      badge: 'STAFF',
      action: () => { 
        setActiveTab('admin'); 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
      } 
    }] : [])
  ];

  const phoneDisplay = siteConfig?.phone || '+92 316 1056008';
  const whatsappNum = siteConfig?.whatsAppNumber || '923161056008';

  return (
    <header className="sticky top-0 z-40 w-full shadow-2xl">
      {/* MAIN HEADER (Starts directly with Logo - Top Contact Bar Removed) */}
      <div className="bg-[#070d1d]/95 backdrop-blur-xl text-slate-100 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo with Cyan/Purple Glow */}
            <div 
              onClick={() => { setActiveTab('browse'); setSearchQuery(''); }}
              className="flex items-center gap-3 cursor-pointer py-2 group relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-600/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-90 transition duration-500"></div>
              <img 
                src="/assets/skillora-logo.png" 
                alt="Skillora AI Logo" 
                className="relative h-12 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]"
              />
            </div>

            {/* Desktop Navigation Links (Admin Panel is hidden from public view!) */}
            <nav className="hidden xl:flex items-center gap-6 text-xs font-bold tracking-wider">
              {navLinks.map((item) => {
                const isActive = 
                  (item.id === 'home' && activeTab === 'browse') || 
                  (item.id === 'video' && activeTab === 'video-prompts') ||
                  (item.id === 'image' && activeTab === 'image-prompts') ||
                  activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className={`relative py-2 transition cursor-pointer flex items-center gap-1.5 ${
                      isActive 
                        ? 'text-cyan-300 font-extrabold border-b-2 border-cyan-400 text-shadow-[0_0_10px_rgba(56,189,248,0.5)]' 
                        : 'text-slate-300 hover:text-cyan-400'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        item.badge === 'NEW' 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                          : 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/30'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Block */}
            <div className="flex items-center gap-3">
              
              {/* Pro Preview Switch (Optional Staff Testing) */}
              {isAdminAuthenticated && (
                <button
                  onClick={() => setIsProMember(!isProMember)}
                  className={`hidden md:inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold transition cursor-pointer border ${
                    isProMember
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-400/50'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                  title="Toggle Pro membership preview for testing"
                >
                  {isProMember ? 'PRO ACTIVE' : 'PREVIEW'}
                </button>
              )}

              {/* Admin Hub Toggle (ONLY visible when authenticated) */}
              {isAdminAuthenticated && (
                <button
                  onClick={() => {
                    setActiveTab(activeTab === 'admin' ? 'browse' : 'admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border shadow-sm ${
                    activeTab === 'admin'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 hover:bg-rose-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 hover:bg-emerald-500/30'
                  }`}
                  title="Admin Control Hub"
                >
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{activeTab === 'admin' ? 'Exit Admin' : 'Admin Hub'}</span>
                </button>
              )}

              {/* Search input in navbar */}
              <div className="hidden lg:flex relative w-44">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cyan-400/70" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activeTab !== 'browse' && activeTab !== 'video-prompts' && activeTab !== 'image-prompts') {
                      setActiveTab('browse');
                    }
                  }}
                  placeholder="Search prompts..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-[#0a1226] border border-cyan-500/20 focus:outline-none focus:border-cyan-400 text-slate-100 placeholder:text-slate-500 transition"
                />
              </div>

              {/* Glowing Brand Gradient Button */}
              <button
                onClick={onOpenPricing}
                className="hidden sm:flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:via-blue-400 hover:to-purple-500 text-white font-extrabold text-xs tracking-wider transition shadow-lg shadow-cyan-500/25 border border-cyan-300/40 cursor-pointer"
              >
                <span>GET PRO ACCESS</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-cyan-200" />
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#070d1d] border-b border-cyan-500/20 p-4 space-y-3 shadow-2xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'browse') setActiveTab('browse');
              }}
              placeholder="Search prompts..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-slate-100"
            />
          </div>

          <div className="grid grid-cols-1 gap-1 pt-2">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  item.action();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left p-3 rounded-lg text-xs font-bold flex items-center justify-between text-slate-300 hover:bg-slate-900"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-cyan-300 border border-cyan-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}

            {/* Mobile Admin Access Button (Only visible when authenticated) */}
            {isAdminAuthenticated && (
              <button
                onClick={() => {
                  setActiveTab(activeTab === 'admin' ? 'browse' : 'admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left p-3 rounded-lg text-xs font-bold flex items-center justify-between text-cyan-300 hover:bg-slate-900 border border-cyan-500/20 bg-[#040814]"
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{activeTab === 'admin' ? 'Exit Admin' : 'Staff Admin Hub'}</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-mono">
                  ACTIVE
                </span>
              </button>
            )}
          </div>

          <button
            onClick={() => {
              onOpenPricing();
              setMobileMenuOpen(false);
            }}
            className="w-full py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-extrabold text-xs rounded-xl text-center shadow-lg shadow-cyan-500/20"
          >
            CLAIM 70% CREATOR DISCOUNT
          </button>
        </div>
      )}

    </header>
  );
}
