import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PromptCard } from './components/PromptCard';
import { PromptModal } from './components/PromptModal';
import { PromptStudio } from './components/PromptStudio';
import { PricingSection } from './components/PricingSection';
import { SocialCorner } from './components/SocialCorner';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanel } from './components/AdminPanel';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Footer } from './components/Footer';
import { 
  CATEGORIES, 
  INITIAL_PROMPTS, 
  INITIAL_PRICING_PLANS, 
  INITIAL_SITE_CONFIG,
  loadStoredPrompts, 
  saveStoredPrompts, 
  loadStoredPricing, 
  saveStoredPricing, 
  loadStoredSiteConfig, 
  saveStoredSiteConfig 
} from './data/prompts';
import { 
  isSupabaseConfigured, 
  fetchPromptsFromSupabase, 
  fetchPricingFromSupabase,
  fetchSiteConfigFromSupabase
} from './lib/supabase';
import { Filter, Sparkles, AlertCircle, Film, Image as ImageIcon, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  // Persistent State
  const [prompts, setPrompts] = useState(loadStoredPrompts);
  const [pricingPlans, setPricingPlans] = useState(loadStoredPricing);
  const [siteConfig, setSiteConfig] = useState(loadStoredSiteConfig);

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('skillora_admin_auth') === 'true';
  });
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // Helper to check if URL targets admin
  const isTargetingAdminRoute = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return (
      path === '/admin' || 
      path.startsWith('/admin/') || 
      hash === '#admin' || 
      search.includes('admin')
    );
  };

  // UI Navigation & Filters
  const [activeTab, setActiveTab] = useState(() => {
    return isTargetingAdminRoute() ? 'admin' : 'browse';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'video', 'image'
  const [accessFilter, setAccessFilter] = useState('all'); // 'all', 'free', 'premium'

  // Sync to localStorage
  useEffect(() => {
    saveStoredPrompts(prompts);
  }, [prompts]);

  useEffect(() => {
    saveStoredPricing(pricingPlans);
  }, [pricingPlans]);

  useEffect(() => {
    saveStoredSiteConfig(siteConfig);
  }, [siteConfig]);

  // Load from Supabase on mount if configured
  useEffect(() => {
    if (isSupabaseConfigured) {
      fetchPromptsFromSupabase().then((data) => {
        if (data && data.length > 0) {
          setPrompts(data);
        }
      });
      fetchPricingFromSupabase().then((data) => {
        if (data && data.length > 0) {
          setPricingPlans(data);
        }
      });
      fetchSiteConfigFromSupabase().then((data) => {
        if (data) {
          setSiteConfig(data);
        }
      });
    }
  }, []);

  // Keyboard shortcut (Ctrl+Shift+A) or URL route (/admin, #admin, ?admin) to trigger admin
  useEffect(() => {
    const checkAdminRoute = () => {
      if (isTargetingAdminRoute()) {
        setActiveTab('admin');
        if (!isAdminAuthenticated) {
          setIsAdminLoginModalOpen(true);
        }
      }
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdminAuthenticated) {
          setActiveTab((prev) => (prev === 'admin' ? 'browse' : 'admin'));
        } else {
          setIsAdminLoginModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);

    // Initial trigger if URL contains admin
    checkAdminRoute();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, [isAdminAuthenticated]);
  
  // Modals & User state
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(null);
  const [isProMember, setIsProMember] = useState(false);
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('skillora_saved');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save Bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('skillora_saved', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  const toggleSave = (id) => {
    setSavedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Quick helper counts
  const videoCount = prompts.filter(p => p.type === 'video').length;
  const imageCount = prompts.filter(p => p.type === 'image').length;

  // Filtered prompts calculation
  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      // Direct tab override for Video / Image tabs
      if (activeTab === 'video-prompts' && prompt.type !== 'video') return false;
      if (activeTab === 'image-prompts' && prompt.type !== 'image') return false;

      // Type filter (if on 'browse' tab)
      if (typeFilter !== 'all' && prompt.type !== typeFilter) return false;

      // Search matching
      const matchesSearch = !searchQuery.trim() || 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (prompt.tags && prompt.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        String(prompt.id).includes(searchQuery);

      // Category matching
      const matchesCategory = 
        selectedCategory === 'all' || 
        (selectedCategory === 'trending' ? prompt.isTrending : prompt.categoryId === selectedCategory);

      // Access filter matching
      const matchesAccess = 
        accessFilter === 'all' || prompt.access === accessFilter;

      return matchesSearch && matchesCategory && matchesAccess;
    });
  }, [prompts, activeTab, typeFilter, searchQuery, selectedCategory, accessFilter]);

  const handleExplorePrompts = (type) => {
    if (type === 'video') {
      setActiveTab('video-prompts');
      setTypeFilter('video');
    } else if (type === 'image') {
      setActiveTab('image-prompts');
      setTypeFilter('image');
    } else if (type === 'pricing') {
      handleOpenPricing();
      return;
    } else {
      setActiveTab('browse');
      setTypeFilter('all');
    }

    setTimeout(() => {
      const el = document.getElementById('catalog-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleOpenPricing = () => {
    setActiveTab('pricing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequireUpgrade = (prompt) => {
    const proPlan = pricingPlans.find(p => p.id === 'pro') || pricingPlans[0];
    setSelectedPlanForCheckout(proPlan);
  };

  const handleResetDefaults = () => {
    setPrompts(INITIAL_PROMPTS);
    setPricingPlans(INITIAL_PRICING_PLANS);
    setSiteConfig(INITIAL_SITE_CONFIG);
    localStorage.removeItem('skillora_prompts_db');
    localStorage.removeItem('skillora_pricing_db');
    localStorage.removeItem('skillora_config_db');
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem('skillora_admin_auth', 'true');
    setActiveTab('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('skillora_admin_auth');
    setActiveTab('browse');
    if (window.location.hash === '#admin') {
      window.location.hash = '';
    }
    if (window.location.pathname.includes('admin')) {
      window.history.pushState(null, '', '/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-black">
      
      {/* 1. Top Navigation Bar (Hidden Admin Panel: visitors only see public links) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isProMember={isProMember}
        setIsProMember={setIsProMember}
        onOpenPricing={handleOpenPricing}
        siteConfig={siteConfig}
        videoCount={videoCount}
        imageCount={imageCount}
        isAdminAuthenticated={isAdminAuthenticated}
        onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
      />

      {/* 2. Main Page Content */}
      <main className="flex-1">
        
        {/* ADMIN HUB (Only visible when authenticated) */}
        {activeTab === 'admin' ? (
          isAdminAuthenticated ? (
            <AdminPanel
              prompts={prompts}
              setPrompts={setPrompts}
              pricingPlans={pricingPlans}
              setPricingPlans={setPricingPlans}
              siteConfig={siteConfig}
              setSiteConfig={setSiteConfig}
              onResetDefaults={handleResetDefaults}
              onExitAdmin={() => setActiveTab('browse')}
              onLogoutAdmin={handleAdminLogout}
            />
          ) : (
            <div className="py-28 px-4 text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-black text-white">Staff Admin Hub</h2>
              <p className="text-xs text-slate-400 mt-2">
                This area is restricted to authorized administrators.
              </p>
              <button 
                onClick={() => setIsAdminLoginModalOpen(true)}
                className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:brightness-110 transition cursor-pointer"
              >
                Enter Admin PIN
              </button>
            </div>
          )
        ) : (
          <>
            {/* HERO SLIDER SECTION (Only on Home / Catalog views) */}
            {(activeTab === 'browse' || activeTab === 'video-prompts' || activeTab === 'image-prompts') && (
              <Hero
                onExplorePrompts={handleExplorePrompts}
                onOpenPricing={handleOpenPricing}
                siteConfig={siteConfig}
                totalVideoPrompts={videoCount}
                totalImagePrompts={imageCount}
              />
            )}

            {/* CATALOG SECTION (For Browse, Video Prompts, and Image Prompts) */}
            {(activeTab === 'browse' || activeTab === 'video-prompts' || activeTab === 'image-prompts') && (
              <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-8 py-12 scroll-mt-24">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>
                        {activeTab === 'video-prompts' 
                          ? 'AI VIDEO GENERATION LIBRARY (RUNWAY, KLING, LUMA)' 
                          : activeTab === 'image-prompts' 
                          ? 'AI IMAGE GENERATION LIBRARY (MIDJOURNEY, FLUX.1)' 
                          : 'MASTER PROMPT CATALOG'}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-heading">
                      {activeTab === 'video-prompts' 
                        ? 'AI Video Prompts (10+ Free & Pro)' 
                        : activeTab === 'image-prompts' 
                        ? 'AI Image Prompts (10+ Free & Pro)' 
                        : 'Explore Handcrafted AI Prompts'}
                    </h2>
                  </div>

                  {/* Type Filter Pills (Video vs Image vs All) */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#091122] border border-cyan-500/20 text-xs font-bold">
                    <button
                      onClick={() => { setActiveTab('browse'); setTypeFilter('all'); }}
                      className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
                        activeTab === 'browse' && typeFilter === 'all'
                          ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-black shadow-md shadow-cyan-500/25'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      All ({prompts.length})
                    </button>

                    <button
                      onClick={() => { setActiveTab('video-prompts'); setTypeFilter('video'); }}
                      className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'video-prompts' || typeFilter === 'video'
                          ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-black shadow-md shadow-cyan-500/25'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Film className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Video ({videoCount})</span>
                    </button>

                    <button
                      onClick={() => { setActiveTab('image-prompts'); setTypeFilter('image'); }}
                      className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'image-prompts' || typeFilter === 'image'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black shadow-md shadow-purple-500/25'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-purple-300" />
                      <span>Image ({imageCount})</span>
                    </button>
                  </div>
                </div>

                {/* Sub-Filters: Categories & Free/Premium */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-cyan-500/15">
                  
                  {/* Category Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            if (searchQuery) setSearchQuery('');
                          }}
                          className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                            isSelected
                              ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_-3px_rgba(56,189,248,0.3)]'
                              : 'bg-[#091122] hover:bg-[#0e1b38] text-slate-300 border-cyan-500/15'
                          }`}
                        >
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>

                  {/* Free vs Premium Toggle */}
                  <div className="flex items-center gap-1 p-1 rounded-lg bg-[#091122] border border-cyan-500/20 text-xs font-semibold shrink-0">
                    {[
                      { id: 'all', label: `All Access (${prompts.length})` },
                      { id: 'free', label: `100% Free (${prompts.filter(p => p.access === 'free').length})` },
                      { id: 'premium', label: `Pro Members (${prompts.filter(p => p.access === 'premium').length})` }
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setAccessFilter(f.id)}
                        className={`px-3 py-1 rounded-md transition cursor-pointer ${
                          accessFilter === f.id
                            ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                </div>

                {/* Prompts Cards Grid */}
                {filteredPrompts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredPrompts.map((prompt) => (
                      <PromptCard
                        key={prompt.id}
                        prompt={prompt}
                        onSelectPrompt={setSelectedPrompt}
                        isProMember={isProMember}
                        isSaved={savedIds.includes(prompt.id)}
                        onToggleSave={toggleSave}
                        onRequireUpgrade={handleRequireUpgrade}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-[#081022] border border-cyan-500/20 rounded-2xl p-8 max-w-md mx-auto">
                    <AlertCircle className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-white">No Prompts Found</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      No prompts match your current filters. Try changing category or search keyword.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setAccessFilter('all');
                        setTypeFilter('all');
                      }}
                      className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}

              </section>
            )}

            {/* AI PROMPT STUDIO TAB */}
            {activeTab === 'generator' && (
              <div className="py-8">
                <PromptStudio />
              </div>
            )}

            {/* PRICING TAB */}
            {activeTab === 'pricing' && (
              <div className="py-8">
                <PricingSection 
                  plans={pricingPlans}
                  onSelectPlan={(plan) => setSelectedPlanForCheckout(plan)} 
                />
              </div>
            )}

            {/* COMMUNITY / SOCIAL CORNER TAB */}
            {activeTab === 'community' && (
              <div className="py-8">
                <SocialCorner onSelectPromptByTitle={(title) => {
                  const found = prompts.find(p => p.title.toLowerCase().includes(title.toLowerCase()));
                  if (found) setSelectedPrompt(found);
                }} />
              </div>
            )}
          </>
        )}

      </main>

      {/* 3. Footer with discreet Admin Access link */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenPricing={handleOpenPricing}
        onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
        siteConfig={siteConfig}
      />

      {/* 4. Prompt Detail Modal */}
      {selectedPrompt && (
        <PromptModal
          prompt={selectedPrompt}
          onClose={() => setSelectedPrompt(null)}
          isProMember={isProMember}
          onRequireUpgrade={handleRequireUpgrade}
          isSaved={savedIds.includes(selectedPrompt.id)}
          onToggleSave={toggleSave}
        />
      )}

      {/* 5. Checkout Modal */}
      {selectedPlanForCheckout && (
        <CheckoutModal
          plan={selectedPlanForCheckout}
          onClose={() => setSelectedPlanForCheckout(null)}
          onActivatePreviewPro={() => {
            setIsProMember(true);
            alert('🎉 Pro mode activated in preview! You can now view all premium prompts.');
          }}
          siteConfig={siteConfig}
        />
      )}

      {/* 6. Admin Login PIN Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
        correctPin={siteConfig?.adminPin || '569646'}
      />

    </div>
  );
}
