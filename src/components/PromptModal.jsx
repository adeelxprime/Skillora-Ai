import React, { useState, useEffect } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Lock, 
  Sparkles, 
  Film, 
  Cpu, 
  Sliders, 
  Layers, 
  Crown, 
  ArrowRight, 
  Share2, 
  Bookmark, 
  BookmarkCheck,
  Video,
  Info
} from 'lucide-react';
import { getMediaBlob } from '../lib/mediaStorage';

export function PromptModal({ 
  prompt, 
  onClose, 
  isProMember, 
  onRequireUpgrade,
  isSaved,
  onToggleSave
}) {
  const [activeTab, setActiveTab] = useState('prompt'); // 'prompt', 'settings', 'storyboard'
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedNegative, setCopiedNegative] = useState(false);
  const [localVideoUrl, setLocalVideoUrl] = useState(prompt?.videoUrl || '');

  useEffect(() => {
    if (!prompt) return;
    setLocalVideoUrl(prompt.videoUrl || '');
    if (!prompt.videoUrl && prompt.type === 'video') {
      getMediaBlob(prompt.id).then((blobUrl) => {
        if (blobUrl) setLocalVideoUrl(blobUrl);
      });
    }
  }, [prompt]);

  if (!prompt) return null;

  const videoSrc = localVideoUrl || prompt.videoUrl;

  const isLocked = prompt.access === 'premium' && !isProMember;

  const handleCopyPrompt = () => {
    if (isLocked) {
      onRequireUpgrade(prompt);
      return;
    }
    navigator.clipboard.writeText(prompt.promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopyNegative = () => {
    if (isLocked) {
      onRequireUpgrade(prompt);
      return;
    }
    navigator.clipboard.writeText(prompt.negativePrompt);
    setCopiedNegative(true);
    setTimeout(() => setCopiedNegative(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#05181e] border border-[#184855] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#133742] bg-[#041318] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#07242a] text-cyan-400 border border-cyan-500/30">
              ID #{prompt.id}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#0a2f38] text-slate-300">
              {prompt.category}
            </span>
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
              prompt.access === 'premium' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' 
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
            }`}>
              {prompt.access === 'premium' ? 'PREMIUM ACCESS' : 'FREE PROMPT'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(prompt.id)}
              className="p-2 rounded-xl bg-[#082329] hover:bg-[#0c3640] text-slate-300 hover:text-cyan-300 transition"
              title={isSaved ? 'Saved' : 'Save'}
            >
              {isSaved ? <BookmarkCheck className="w-5 h-5 text-cyan-400" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#082329] hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Scrollable */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          
          {/* Title & Description */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {prompt.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
              {prompt.description}
            </p>
          </div>

          {/* Visual Showcase: Storyboards Carousel / Preview */}
          <div className="rounded-2xl overflow-hidden bg-[#030e12] border border-[#143d47]">
            <div className="relative aspect-video sm:aspect-[16/9] max-h-[380px] w-full bg-black flex items-center justify-center">
              {videoSrc ? (
                <video
                  src={videoSrc}
                  poster={prompt.coverImage}
                  controls
                  playsInline
                  className="w-full h-full object-contain bg-black"
                />
              ) : (
                <img
                  src={
                    prompt.storyboards && prompt.storyboards[activeSceneIndex]
                      ? prompt.storyboards[activeSceneIndex].imageUrl
                      : prompt.coverImage
                  }
                  alt={prompt.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              )}
              {!videoSrc && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>
              )}

              {/* Scene Caption Overlay */}
              {prompt.storyboards && prompt.storyboards[activeSceneIndex] && (
                <div className="absolute bottom-4 left-4 right-4 bg-[#05191fb3] backdrop-blur-md p-3 rounded-xl border border-cyan-500/20 text-xs sm:text-sm">
                  <span className="font-bold text-cyan-400">
                    Scene {prompt.storyboards[activeSceneIndex].scene}: {prompt.storyboards[activeSceneIndex].title} —{' '}
                  </span>
                  <span className="text-slate-200">
                    {prompt.storyboards[activeSceneIndex].description}
                  </span>
                </div>
              )}
            </div>

            {/* Storyboard Scene Selector Pills */}
            {prompt.storyboards && prompt.storyboards.length > 1 && (
              <div className="p-3 bg-[#04151a] border-t border-[#133742] flex items-center gap-2 overflow-x-auto">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">
                  Storyboards:
                </span>
                {prompt.storyboards.map((scene, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSceneIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      activeSceneIndex === idx
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                        : 'bg-[#072127] text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>Scene {scene.scene}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 border-b border-[#143d47] pb-2">
            <button
              onClick={() => setActiveTab('prompt')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'prompt'
                  ? 'bg-[#0a313b] text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-[#07242b]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Prompt & Negative</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'settings'
                  ? 'bg-[#0a313b] text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-[#07242b]'
              }`}
            >
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Camera & AI Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('workflow')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'workflow'
                  ? 'bg-[#0a313b] text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-[#07242b]'
              }`}
            >
              <Film className="w-4 h-4 text-cyan-400" />
              <span>Viral Video Workflow</span>
            </button>
          </div>

          {/* Tab Content: Prompt & Negative */}
          {activeTab === 'prompt' && (
            <div className="space-y-4">
              
              {/* If locked banner */}
              {isLocked ? (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-[#072a33] via-[#093540] to-[#041a1f] border border-cyan-500/40 text-center space-y-4 relative overflow-hidden">
                  <div className="inline-flex p-3 rounded-2xl bg-cyan-400/10 text-cyan-400 border border-cyan-400/30">
                    <Crown className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">This Master Prompt is Locked for Members</h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
                      Unlock full prompt text, storyboard generation seed, and negative parameters with Skillora AI Pro.
                    </p>
                  </div>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => onRequireUpgrade(prompt)}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-cyan-400/20 flex items-center gap-2 cursor-pointer"
                    >
                      <span>Unlock with Basic Pro ($10)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Master Prompt Box */}
                  <div className="rounded-2xl bg-[#041318] border border-[#16434e] p-4 sm:p-5 relative group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Master Video Prompt
                      </span>
                      <button
                        onClick={handleCopyPrompt}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                          copiedPrompt
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                            : 'bg-[#082c35] border-cyan-500/40 text-cyan-300 hover:bg-[#0c3d4a]'
                        }`}
                      >
                        {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPrompt ? 'Copied Prompt!' : 'Copy Prompt'}</span>
                      </button>
                    </div>
                    <p className="text-sm sm:text-base text-slate-100 font-mono leading-relaxed select-all bg-[#020b0e] p-4 rounded-xl border border-[#0d2e36]">
                      {prompt.promptText}
                    </p>
                  </div>

                  {/* Negative Prompt Box */}
                  <div className="rounded-2xl bg-[#041318] border border-[#16434e] p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" />
                        Negative Parameters / Exclusions
                      </span>
                      <button
                        onClick={handleCopyNegative}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                          copiedNegative
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                            : 'bg-[#082c35] border-[#1d4d5a] text-slate-300 hover:text-white'
                        }`}
                      >
                        {copiedNegative ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedNegative ? 'Copied!' : 'Copy Negative'}</span>
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 font-mono select-all bg-[#020b0e] p-3 rounded-xl border border-[#0d2e36]">
                      {prompt.negativePrompt}
                    </p>
                  </div>
                </>
              )}

            </div>
          )}

          {/* Tab Content: Settings & Parameters */}
          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#04151b] border border-[#143e49]">
                <div className="text-xs text-slate-400 font-medium">Recommended Models</div>
                <div className="text-sm font-bold text-cyan-300 mt-1">{prompt.model}</div>
              </div>

              <div className="p-4 rounded-xl bg-[#04151b] border border-[#143e49]">
                <div className="text-xs text-slate-400 font-medium">Aspect Ratio</div>
                <div className="text-sm font-bold text-white mt-1">{prompt.settings?.aspectRatio || prompt.aspectRatio}</div>
              </div>

              <div className="p-4 rounded-xl bg-[#04151b] border border-[#143e49]">
                <div className="text-xs text-slate-400 font-medium">Camera Motion Setting</div>
                <div className="text-sm font-bold text-white mt-1">{prompt.settings?.cameraMotion}</div>
              </div>

              <div className="p-4 rounded-xl bg-[#04151b] border border-[#143e49]">
                <div className="text-xs text-slate-400 font-medium">Motion Bucket / Strength</div>
                <div className="text-sm font-bold text-white mt-1">{prompt.settings?.motionBucket} (CFG {prompt.settings?.cfgScale})</div>
              </div>

              <div className="p-4 rounded-xl bg-[#04151b] border border-[#143e49]">
                <div className="text-xs text-slate-400 font-medium">Render FPS</div>
                <div className="text-sm font-bold text-white mt-1">{prompt.settings?.fps}</div>
              </div>

              <div className="p-4 rounded-xl bg-[#04151b] border border-[#143e49]">
                <div className="text-xs text-slate-400 font-medium">Seed Lock</div>
                <div className="text-sm font-mono font-bold text-cyan-400 mt-1">{prompt.settings?.seed}</div>
              </div>
            </div>
          )}

          {/* Tab Content: Workflow */}
          {activeTab === 'workflow' && (
            <div className="space-y-3">
              {prompt.workflowGuide?.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#04161c] border border-[#15424e] flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.step}</h4>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Bottom Sticky Bar */}
        <div className="p-4 bg-[#030e12] border-t border-[#133742] flex items-center justify-between gap-3">
          <div className="text-xs text-slate-400 hidden sm:block">
            Published: <span className="text-slate-200">{prompt.publishedLabel}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopyPrompt}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 transition flex items-center justify-center gap-1.5 shadow-md shadow-cyan-400/20 cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedPrompt ? 'Copied to Clipboard!' : 'Copy Master Prompt'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#07242a] hover:bg-[#0b333c] text-slate-300 text-xs sm:text-sm border border-[#143e49]"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
