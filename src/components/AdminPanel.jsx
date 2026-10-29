import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  DollarSign, 
  Film, 
  Image, 
  Sparkles, 
  Save, 
  RefreshCw, 
  X, 
  Check, 
  Search, 
  Sliders, 
  Database, 
  ExternalLink,
  Layers,
  ArrowLeft,
  Lock,
  Cloud,
  CheckCircle2,
  AlertTriangle,
  Key
} from 'lucide-react';
import { CATEGORIES } from '../data/prompts';
import { 
  isSupabaseConfigured, 
  supabaseUrl,
  upsertPromptToSupabase, 
  deletePromptFromSupabase, 
  upsertPricingToSupabase,
  upsertSiteConfigToSupabase 
} from '../lib/supabase';

export function AdminPanel({ 
  prompts, 
  setPrompts, 
  pricingPlans, 
  setPricingPlans, 
  siteConfig, 
  setSiteConfig,
  onResetDefaults,
  onExitAdmin,
  onLogoutAdmin
}) {
  const [adminTab, setAdminTab] = useState('prompts'); // 'prompts', 'pricing', 'supabase', 'settings'
  const [promptFilterType, setPromptFilterType] = useState('all'); // 'all', 'video', 'image'
  const [searchTable, setSearchTable] = useState('');
  
  // Modal state for Add/Edit
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Filter prompts in table
  const tablePrompts = prompts.filter(p => {
    const matchesType = promptFilterType === 'all' || p.type === promptFilterType;
    const matchesQuery = !searchTable.trim() || 
      p.title.toLowerCase().includes(searchTable.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTable.toLowerCase()) ||
      String(p.id).includes(searchTable);
    return matchesType && matchesQuery;
  });

  // Handle Delete
  const handleDeletePrompt = async (id) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      const updated = prompts.filter(p => p.id !== id);
      setPrompts(updated);
      if (isSupabaseConfigured) {
        await deletePromptFromSupabase(id);
      }
      showToast('Prompt deleted successfully!');
    }
  };

  // Handle Save Prompt (Add or Edit)
  const handleSavePrompt = async (e) => {
    e.preventDefault();
    if (!editingPrompt.title || !editingPrompt.promptText) {
      alert('Please fill in at least Title and Prompt Text.');
      return;
    }

    let savedObj = null;

    if (isCreatingNew) {
      savedObj = {
        ...editingPrompt,
        id: Date.now(),
        numericId: Math.floor(1000 + Math.random() * 9000),
        publishedLabel: 'Just now',
        tags: editingPrompt.tags || ['Custom', editingPrompt.type === 'video' ? 'AI Video' : 'AI Image']
      };
      setPrompts([savedObj, ...prompts]);
      showToast('New prompt added successfully!');
    } else {
      savedObj = editingPrompt;
      const updated = prompts.map(p => p.id === editingPrompt.id ? editingPrompt : p);
      setPrompts(updated);
      showToast('Prompt updated successfully!');
    }

    if (isSupabaseConfigured && savedObj) {
      await upsertPromptToSupabase(savedObj);
    }

    setEditingPrompt(null);
    setIsCreatingNew(false);
  };

  // Start creating new
  const startCreateNew = (type = 'video') => {
    setIsCreatingNew(true);
    setEditingPrompt({
      type: type,
      title: '',
      category: 'Cinematic & Film',
      categoryId: 'cinematic',
      access: 'free',
      aspectRatio: type === 'video' ? '9:16' : '4:5',
      model: type === 'video' ? 'Kling 1.5 / Runway Gen-3' : 'Midjourney v6.1 / Flux.1',
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      description: '',
      promptText: '',
      negativePrompt: 'blurry, low resolution, deformed, bad anatomy, ugly',
      settings: {
        cameraMotion: 'Smooth Dolly In',
        fps: '60 FPS',
        seed: String(Math.floor(100000000 + Math.random() * 900000000)),
        motionBucket: 100
      }
    });
  };

  const [isSyncingAll, setIsSyncingAll] = useState(false);

  // Pricing edit helpers
  const handleUpdatePrice = async (planId, field, value) => {
    const updated = pricingPlans.map(plan => {
      if (plan.id === planId) {
        return { ...plan, [field]: value };
      }
      return plan;
    });
    setPricingPlans(updated);
    if (isSupabaseConfigured) {
      await upsertPricingToSupabase(updated);
    }
    showToast(`Updated ${field} for ${planId}!`);
  };

  const handleUpdateFeatures = async (planId, featuresText) => {
    const list = featuresText.split('\n').filter(f => f.trim().length > 0);
    const updated = pricingPlans.map(plan => {
      if (plan.id === planId) {
        return { ...plan, features: list };
      }
      return plan;
    });
    setPricingPlans(updated);
    if (isSupabaseConfigured) {
      await upsertPricingToSupabase(updated);
    }
    showToast('Updated features!');
  };

  // Save Settings & Sync to Supabase
  const handleSaveSettings = async (e) => {
    if (e) e.preventDefault();
    if (isSupabaseConfigured) {
      const ok = await upsertSiteConfigToSupabase(siteConfig);
      if (ok) {
        showToast('Settings saved & synced to Supabase!');
      } else {
        showToast('Saved locally (Supabase update failed)');
      }
    } else {
      showToast('Settings saved to localStorage!');
    }
  };

  // Password / PIN Management State
  const [pinInput, setPinInput] = useState(siteConfig?.adminPin || '569646');
  const [showPin, setShowPin] = useState(false);
  const [isSavingPin, setIsSavingPin] = useState(false);

  // Dedicated Password Change Handler
  const handleUpdatePassword = async (e) => {
    if (e) e.preventDefault();
    const clean = pinInput.trim();
    if (!clean) {
      alert('Password / PIN cannot be empty.');
      return;
    }
    setIsSavingPin(true);
    const updated = { ...siteConfig, adminPin: clean };
    setSiteConfig(updated);
    
    // Save to localStorage immediately
    try {
      localStorage.setItem('skillora_config_db', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    // Save to Supabase if configured
    if (isSupabaseConfigured) {
      const ok = await upsertSiteConfigToSupabase(updated);
      if (ok) {
        showToast(`PIN changed to "${clean}" & synced to Supabase!`);
      } else {
        showToast(`PIN changed to "${clean}" (saved locally)`);
      }
    } else {
      showToast(`PIN changed to "${clean}"!`);
    }
    setIsSavingPin(false);
  };

  // Sync all Prompts, Pricing, and Settings to Supabase
  const handleSyncAllToSupabase = async () => {
    if (!isSupabaseConfigured) return;
    setIsSyncingAll(true);
    showToast('Syncing all prompts & config to Supabase...');
    try {
      let count = 0;
      for (const prompt of prompts) {
        await upsertPromptToSupabase(prompt);
        count++;
      }
      await upsertPricingToSupabase(pricingPlans);
      await upsertSiteConfigToSupabase(siteConfig);
      showToast(`Success! ${count} prompts & config synced to Supabase.`);
    } catch (err) {
      console.error(err);
      showToast('Sync encountered an error.');
    } finally {
      setIsSyncingAll(false);
    }
  };

  return (
    <div className="bg-[#030712] min-h-screen text-slate-100 pb-20 cyber-grid">
      
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Banner */}
      <div className="bg-[#070e1f] border-b border-cyan-500/20 px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-400/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Skillora AI Admin Control Hub
                </h1>
                
                {/* Supabase status badge */}
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold flex items-center gap-1 ${
                  isSupabaseConfigured 
                    ? 'bg-emerald-500 text-slate-950' 
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                }`}>
                  <Cloud className="w-3 h-3" />
                  <span>{isSupabaseConfigured ? 'SUPABASE CONNECTED' : 'LOCAL / FALLBACK SYNC'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage video & image prompts, update pricing, and connect Supabase database.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExitAdmin}
              className="px-3.5 py-2 rounded-xl bg-[#0a142c] hover:bg-[#112046] text-cyan-300 text-xs font-bold border border-cyan-500/30 transition flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Site</span>
            </button>

            <button
              onClick={onLogoutAdmin}
              className="px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold border border-rose-500/30 transition flex items-center gap-1.5 cursor-pointer"
              title="Lock Admin Panel"
            >
              <Lock className="w-4 h-4" />
              <span>Lock Admin</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-[#091226] border border-cyan-500/20 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Prompts</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white mt-2">{prompts.length}</div>
            <div className="text-[11px] text-cyan-400 mt-1">
              {prompts.filter(p => p.access === 'free').length} Free • {prompts.filter(p => p.access === 'premium').length} Pro
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#091226] border border-cyan-500/20 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Video Prompts</span>
              <Film className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-cyan-400 mt-2">
              {prompts.filter(p => p.type === 'video').length}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {prompts.filter(p => p.type === 'video' && p.access === 'free').length} Free Prompts
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#091226] border border-purple-500/20 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Image Prompts</span>
              <Image className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-black text-purple-400 mt-2">
              {prompts.filter(p => p.type === 'image').length}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {prompts.filter(p => p.type === 'image' && p.access === 'free').length} Free Prompts
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#091226] border border-blue-500/20 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Support WhatsApp</span>
              <DollarSign className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-lg font-black text-emerald-400 mt-3 truncate">
              {siteConfig?.phone || '+92 316 1056008'}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Live customer link</div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-3 mb-6 overflow-x-auto">
          <button
            onClick={() => setAdminTab('prompts')}
            className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
              adminTab === 'prompts'
                ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-black shadow-lg shadow-cyan-500/25'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Manage Prompts ({prompts.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('pricing')}
            className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
              adminTab === 'pricing'
                ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-black shadow-lg shadow-cyan-500/25'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Manage Pricing & Tiers</span>
          </button>

          <button
            onClick={() => setAdminTab('supabase')}
            className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
              adminTab === 'supabase'
                ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-black shadow-lg shadow-cyan-500/25'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>Supabase & Vercel Setup</span>
          </button>

          <button
            onClick={() => setAdminTab('settings')}
            className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
              adminTab === 'settings'
                ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-black shadow-lg shadow-cyan-500/25'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Admin PIN & Settings</span>
          </button>
        </div>

        {/* TAB 1: PROMPT MANAGEMENT */}
        {adminTab === 'prompts' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#091226] p-4 rounded-2xl border border-cyan-500/20">
              
              {/* Type Switcher */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#060c1a] border border-cyan-500/20 text-xs">
                {[
                  { id: 'all', label: `All (${prompts.length})` },
                  { id: 'video', label: `🎬 Video (${prompts.filter(p => p.type === 'video').length})` },
                  { id: 'image', label: `🖼️ Image (${prompts.filter(p => p.type === 'image').length})` }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPromptFilterType(item.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                      promptFilterType === item.id
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Search in table */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/60" />
                <input
                  type="text"
                  value={searchTable}
                  onChange={(e) => setSearchTable(e.target.value)}
                  placeholder="Search prompts in table..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#050a16] border border-cyan-500/20 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Add buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => startCreateNew('video')}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:brightness-110 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md shadow-cyan-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Video Prompt</span>
                </button>

                <button
                  onClick={() => startCreateNew('image')}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 hover:brightness-110 text-white font-black text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md shadow-purple-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Image Prompt</span>
                </button>
              </div>

            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-cyan-500/20 bg-[#070e1f] shadow-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#050a16] border-b border-cyan-500/20 text-slate-400 uppercase tracking-wider font-bold">
                    <th className="p-3.5">ID & Cover</th>
                    <th className="p-3.5">Title</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Access</th>
                    <th className="p-3.5">Model</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {tablePrompts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/60 transition">
                      <td className="p-3.5">
                        <div className="flex items-center gap-2.5">
                          <img 
                            src={p.coverImage} 
                            alt={p.title} 
                            className="w-10 h-10 object-cover rounded-lg border border-slate-700" 
                          />
                          <span className="font-mono text-cyan-400">#{p.id}</span>
                        </div>
                      </td>

                      <td className="p-3.5 font-bold text-white max-w-xs truncate">
                        {p.title}
                      </td>

                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                          p.type === 'video' 
                            ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40' 
                            : 'bg-purple-400/20 text-purple-300 border border-purple-400/40'
                        }`}>
                          {p.type === 'video' ? '🎬 VIDEO' : '🖼️ IMAGE'}
                        </span>
                      </td>

                      <td className="p-3.5 text-slate-300">
                        {p.category}
                      </td>

                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.access === 'premium'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                        }`}>
                          {p.access === 'premium' ? 'PREMIUM' : 'FREE'}
                        </span>
                      </td>

                      <td className="p-3.5 text-slate-400 truncate max-w-[150px]">
                        {p.model}
                      </td>

                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setIsCreatingNew(false);
                              setEditingPrompt(p);
                            }}
                            className="p-1.5 rounded-lg bg-[#0a142c] hover:bg-cyan-500/20 text-cyan-400 transition"
                            title="Edit Prompt"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeletePrompt(p.id)}
                            className="p-1.5 rounded-lg bg-[#0a142c] hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition"
                            title="Delete Prompt"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {tablePrompts.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  No prompts match your filter or search.
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: PRICING MANAGEMENT */}
        {adminTab === 'pricing' && (
          <div className="space-y-6">
            <div className="bg-[#091226] p-5 rounded-2xl border border-cyan-500/20">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-cyan-400" />
                Live Pricing Plans Editor
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                You can change prices, original prices, titles, and benefits. Changes apply immediately to the website.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pricingPlans.map((plan) => (
                <div 
                  key={plan.id}
                  className="bg-[#070e1f] border border-cyan-500/20 p-6 rounded-2xl space-y-4 shadow-xl"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{plan.id}</span>
                      <h4 className="text-lg font-black text-white">{plan.name}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#0a142c] text-cyan-300 border border-cyan-500/30 text-xs font-bold">
                      {plan.popular ? '★ Most Popular' : 'Standard'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                        Active Price:
                      </label>
                      <input
                        type="text"
                        value={plan.price}
                        onChange={(e) => handleUpdatePrice(plan.id, 'price', e.target.value)}
                        className="w-full bg-[#050a16] border border-cyan-500/30 p-2 rounded-lg text-sm font-black text-cyan-300 focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                        Original Compare Price:
                      </label>
                      <input
                        type="text"
                        value={plan.originalPrice || ''}
                        onChange={(e) => handleUpdatePrice(plan.id, 'originalPrice', e.target.value)}
                        className="w-full bg-[#050a16] border border-slate-700 p-2 rounded-lg text-sm text-slate-400 line-through focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                        Discount / Badge Text:
                      </label>
                      <input
                        type="text"
                        value={plan.badge || ''}
                        onChange={(e) => handleUpdatePrice(plan.id, 'badge', e.target.value)}
                        className="w-full bg-[#050a16] border border-slate-700 p-2 rounded-lg text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                        Billing Frequency:
                      </label>
                      <input
                        type="text"
                        value={plan.billing || ''}
                        onChange={(e) => handleUpdatePrice(plan.id, 'billing', e.target.value)}
                        className="w-full bg-[#050a16] border border-slate-700 p-2 rounded-lg text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                      Marketing Headline / Title:
                    </label>
                    <input
                      type="text"
                      value={plan.title || ''}
                      onChange={(e) => handleUpdatePrice(plan.id, 'title', e.target.value)}
                      className="w-full bg-[#050a16] border border-slate-700 p-2 rounded-lg text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                      Included Features (One per line):
                    </label>
                    <textarea
                      rows={4}
                      value={plan.features?.join('\n') || ''}
                      onChange={(e) => handleUpdateFeatures(plan.id, e.target.value)}
                      className="w-full bg-[#050a16] border border-slate-700 p-2.5 rounded-lg text-xs font-mono text-slate-200 focus:outline-none"
                    />
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: SUPABASE & VERCEL SETUP GUIDE */}
        {adminTab === 'supabase' && (
          <div className="space-y-6 max-w-3xl">
            
            {/* Live Connection Status */}
            <div className="bg-[#070e1f] border border-cyan-500/20 p-6 rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Supabase Cloud Database Status</h3>
                    <p className="text-xs text-slate-400">
                      Realtime PostgreSQL database for Skillora AI
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>ONLINE & CONNECTED</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#040814] border border-cyan-500/20 space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-slate-400">Database Project URL:</span>
                  <span className="font-mono text-cyan-300 font-bold break-all">{supabaseUrl}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-slate-400">Live Synced Prompts:</span>
                  <span className="font-bold text-white">{prompts.length} Prompts (Images & Videos)</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-slate-400">Live Pricing Plans:</span>
                  <span className="font-bold text-white">{pricingPlans.length} Active Plans</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  disabled={isSyncingAll}
                  onClick={handleSyncAllToSupabase}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 hover:opacity-95 transition cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncingAll ? 'animate-spin' : ''}`} />
                  <span>{isSyncingAll ? 'Syncing to Supabase...' : 'Resync / Push All Prompts to Supabase'}</span>
                </button>
              </div>
            </div>

            {/* Vercel Deployment Guide */}
            <div className="bg-[#070e1f] border border-cyan-500/20 p-6 rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Vercel Live Deployment Guide</h3>
                  <p className="text-xs text-slate-400">
                    Deploy your website online on Vercel with 100% cloud database support
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#040814] border border-cyan-500/20 space-y-3 text-xs">
                <div>
                  <div className="font-bold text-cyan-300">Step 1: Push Code to GitHub</div>
                  <p className="text-slate-300 mt-0.5">
                    Commit your changes and push to your GitHub repository.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-cyan-300">Step 2: Connect Repository to Vercel</div>
                  <p className="text-slate-300 mt-0.5">
                    In <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline">vercel.com</a>, click <strong>Add New Project</strong> and import your GitHub repo.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-cyan-300">Step 3: Add Environment Variables in Vercel Settings</div>
                  <p className="text-slate-300 mt-0.5 mb-2">
                    In Vercel &gt; Project Settings &gt; Environment Variables, paste these exact values:
                  </p>
                  <div className="bg-slate-900 p-3 rounded-lg font-mono text-[11px] text-cyan-200 space-y-2 border border-slate-800 select-all">
                    <div>
                      <span className="text-slate-400">NAME:</span> <span className="text-white">VITE_SUPABASE_URL</span><br />
                      <span className="text-slate-400">VALUE:</span> <span className="text-cyan-300 break-all">{supabaseUrl}</span>
                    </div>
                    <div className="pt-1 border-t border-slate-800">
                      <span className="text-slate-400">NAME:</span> <span className="text-white">VITE_SUPABASE_ANON_KEY</span><br />
                      <span className="text-slate-400">VALUE:</span> <span className="text-cyan-300 break-all">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-bold text-cyan-300">Step 4: Click Deploy</div>
                  <p className="text-slate-300 mt-0.5">
                    Vercel will build your website with <code className="text-cyan-300">vercel.json</code> routing configured so all pages, modals, and prompts load instantly without 404 errors!
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: SETTINGS & MASTER PIN */}
        {adminTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            {/* Dedicated Change Password / PIN Card */}
            <div className="bg-[#070e1f] border border-cyan-500/20 p-6 rounded-2xl space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-400/30">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Change Admin Password / PIN</h3>
                    <p className="text-xs text-slate-400">
                      Update the password used to access your hidden Admin Panel anytime.
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold shrink-0">
                  Active PIN: {siteConfig?.adminPin || '569646'}
                </div>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    New Admin Password or PIN:
                  </label>
                  <div className="flex items-center gap-2 max-w-md">
                    <input
                      type={showPin ? 'text' : 'password'}
                      required
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      placeholder="Enter new PIN or password..."
                      className="w-full bg-[#050a16] border border-cyan-500/30 p-2.5 rounded-xl text-sm font-mono text-cyan-300 font-bold tracking-widest focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold shrink-0 transition cursor-pointer"
                    >
                      {showPin ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Default PIN is set to <strong className="text-cyan-300 font-mono">569646</strong>. You can change this to any new PIN or word password whenever you want.
                  </p>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSavingPin}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 flex items-center gap-2 hover:brightness-110 transition cursor-pointer disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isSavingPin ? 'Saving...' : 'Save & Update Password'}</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-[#070e1f] border border-cyan-500/20 p-6 rounded-2xl space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-400" />
                Website Ownership, Contact & Social Links
              </h3>
              <p className="text-xs text-slate-400">
                You have full control over all website details, customer support channels, and footer links.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Owner Name (Footer Copyright & Admin Portal):
                  </label>
                  <input
                    type="text"
                    value={siteConfig.ownerName || 'Adeel Murtaza'}
                    onChange={(e) => setSiteConfig({ ...siteConfig, ownerName: e.target.value })}
                    className="w-full bg-[#050a16] border border-slate-700 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. Adeel Murtaza"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Brand Name:
                  </label>
                  <input
                    type="text"
                    value={siteConfig.brandName || 'Skillora AI'}
                    onChange={(e) => setSiteConfig({ ...siteConfig, brandName: e.target.value })}
                    className="w-full bg-[#050a16] border border-slate-700 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Customer Support Email:
                  </label>
                  <input
                    type="email"
                    value={siteConfig.email || 'skilloraai87@gmail.com'}
                    onChange={(e) => setSiteConfig({ ...siteConfig, email: e.target.value })}
                    className="w-full bg-[#050a16] border border-slate-700 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. skilloraai87@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Support Phone Display:
                  </label>
                  <input
                    type="text"
                    value={siteConfig.phone || '+92 316 1056008'}
                    onChange={(e) => setSiteConfig({ ...siteConfig, phone: e.target.value })}
                    className="w-full bg-[#050a16] border border-slate-700 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    WhatsApp Support Number (without +, e.g. 923161056008):
                  </label>
                  <input
                    type="text"
                    value={siteConfig.whatsAppNumber || '923161056008'}
                    onChange={(e) => setSiteConfig({ ...siteConfig, whatsAppNumber: e.target.value })}
                    className="w-full bg-[#050a16] border border-slate-700 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Official WhatsApp Channel Link:
                  </label>
                  <input
                    type="url"
                    value={siteConfig.whatsAppChannelUrl || 'https://whatsapp.com/channel/0029Vb3SkilloraAI'}
                    onChange={(e) => setSiteConfig({ ...siteConfig, whatsAppChannelUrl: e.target.value })}
                    className="w-full bg-[#050a16] border border-slate-700 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    placeholder="https://whatsapp.com/channel/..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Facebook Page Link:
                  </label>
                  <input
                    type="url"
                    value={siteConfig.facebookUrl || 'https://www.facebook.com/share/1Ed2AnopHN/'}
                    onChange={(e) => setSiteConfig({ ...siteConfig, facebookUrl: e.target.value })}
                    className="w-full bg-[#050a16] border border-slate-700 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Instagram Profile Link:
                  </label>
                  <input
                    type="url"
                    value={siteConfig.instagramUrl || 'https://www.instagram.com/skilloraai1?vrfl=cDcyam42enlrMXN0'}
                    onChange={(e) => setSiteConfig({ ...siteConfig, instagramUrl: e.target.value })}
                    className="w-full bg-[#050a16] border border-slate-700 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 hover:opacity-95 transition cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Settings & Sync to Supabase</span>
                </button>
              </div>
            </div>

            <div className="bg-[#070e1f] border border-cyan-500/20 p-6 rounded-2xl space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-400" />
                Reset & Data Management
              </h3>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(prompts, null, 2));
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.setAttribute("href", dataStr);
                    downloadAnchor.setAttribute("download", `skillora_prompts_${Date.now()}.json`);
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0a142c] hover:bg-[#112046] text-cyan-300 text-xs font-bold transition cursor-pointer border border-cyan-500/30"
                >
                  Export Prompts as JSON
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Reset all prompts, pricing, and settings back to original defaults?')) {
                      onResetDefaults();
                      showToast('Reset to original factory defaults!');
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition cursor-pointer"
                >
                  Reset All to Factory Defaults
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* CREATE / EDIT PROMPT MODAL */}
      {editingPrompt && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#070e1f] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-black text-white">
                  {isCreatingNew ? `Add New ${editingPrompt.type === 'video' ? 'Video' : 'Image'} Prompt` : 'Edit Prompt'}
                </h3>
              </div>
              <button
                onClick={() => setEditingPrompt(null)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePrompt} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Prompt Type:</label>
                  <select
                    value={editingPrompt.type}
                    onChange={(e) => setEditingPrompt({ ...editingPrompt, type: e.target.value })}
                    className="w-full bg-[#050a16] border border-slate-700 p-2.5 rounded-xl text-xs text-white"
                  >
                    <option value="video">🎬 Video Generation (Runway, Kling)</option>
                    <option value="image">🖼️ Image Generation (Midjourney, Flux)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Access Level:</label>
                  <select
                    value={editingPrompt.access}
                    onChange={(e) => setEditingPrompt({ ...editingPrompt, access: e.target.value })}
                    className="w-full bg-[#050a16] border border-slate-700 p-2.5 rounded-xl text-xs text-white"
                  >
                    <option value="free">Free Access (Available to everyone)</option>
                    <option value="premium">Premium (Members Only)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Prompt Title:</label>
                <input
                  type="text"
                  required
                  value={editingPrompt.title}
                  onChange={(e) => setEditingPrompt({ ...editingPrompt, title: e.target.value })}
                  placeholder="e.g. Golden Eagle Cinematic Flight"
                  className="w-full bg-[#050a16] border border-cyan-500/30 p-2.5 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Category:</label>
                  <select
                    value={editingPrompt.category}
                    onChange={(e) => {
                      const found = CATEGORIES.find(c => c.name === e.target.value);
                      setEditingPrompt({ 
                        ...editingPrompt, 
                        category: e.target.value,
                        categoryId: found ? found.id : 'cinematic'
                      });
                    }}
                    className="w-full bg-[#050a16] border border-slate-700 p-2.5 rounded-xl text-xs text-white"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all' && c.id !== 'trending').map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Recommended AI Model:</label>
                  <input
                    type="text"
                    value={editingPrompt.model}
                    onChange={(e) => setEditingPrompt({ ...editingPrompt, model: e.target.value })}
                    placeholder="e.g. Kling 1.5, Runway Gen-3, Midjourney v6.1"
                    className="w-full bg-[#050a16] border border-slate-700 p-2.5 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Aspect Ratio:</label>
                  <input
                    type="text"
                    value={editingPrompt.aspectRatio}
                    onChange={(e) => setEditingPrompt({ ...editingPrompt, aspectRatio: e.target.value })}
                    placeholder="9:16, 16:9, 4:5, 1:1"
                    className="w-full bg-[#050a16] border border-slate-700 p-2.5 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Cover Image URL:</label>
                  <input
                    type="url"
                    value={editingPrompt.coverImage}
                    onChange={(e) => setEditingPrompt({ ...editingPrompt, coverImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-[#050a16] border border-slate-700 p-2.5 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Short Description / Excerpt:</label>
                <input
                  type="text"
                  value={editingPrompt.description}
                  onChange={(e) => setEditingPrompt({ ...editingPrompt, description: e.target.value })}
                  placeholder="Brief summary of what this prompt creates..."
                  className="w-full bg-[#050a16] border border-slate-700 p-2.5 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Full Master Prompt Text:</label>
                <textarea
                  rows={4}
                  required
                  value={editingPrompt.promptText}
                  onChange={(e) => setEditingPrompt({ ...editingPrompt, promptText: e.target.value })}
                  placeholder="Enter detailed prompt text with parameters..."
                  className="w-full bg-[#050a16] border border-cyan-500/30 p-3 rounded-xl text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Negative Parameters / Exclusions:</label>
                <textarea
                  rows={2}
                  value={editingPrompt.negativePrompt || ''}
                  onChange={(e) => setEditingPrompt({ ...editingPrompt, negativePrompt: e.target.value })}
                  placeholder="blurry, distorted, oversaturated, etc."
                  className="w-full bg-[#050a16] border border-slate-700 p-2.5 rounded-xl text-xs font-mono text-rose-300 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPrompt(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white text-xs font-black shadow-lg shadow-cyan-500/25 flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Prompt</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
