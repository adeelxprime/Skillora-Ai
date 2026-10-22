import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Lock, 
  Flame, 
  Sparkles, 
  Eye, 
  Bookmark, 
  BookmarkCheck, 
  Layers, 
  Cpu, 
  Film,
  Image as ImageIcon
} from 'lucide-react';

export function PromptCard({ 
  prompt, 
  onSelectPrompt, 
  isProMember, 
  isSaved, 
  onToggleSave,
  onRequireUpgrade
}) {
  const [copied, setCopied] = useState(false);

  const isLocked = prompt.access === 'premium' && !isProMember;

  const handleCopy = (e) => {
    e.stopPropagation();
    if (isLocked) {
      onRequireUpgrade(prompt);
      return;
    }
    navigator.clipboard.writeText(prompt.promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={() => onSelectPrompt(prompt)}
      className="group relative rounded-2xl bg-[#081022] border border-cyan-500/15 hover:border-cyan-400/70 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.8),0_0_25px_-5px_rgba(56,189,248,0.25)] cursor-pointer"
    >
      {/* Thumbnail Container */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-[#040814]">
        <img 
          src={prompt.coverImage} 
          alt={prompt.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081022] via-[#081022]/30 to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Type badge: Video (Cyan) vs Image (Purple) */}
            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-sm border ${
              prompt.type === 'video'
                ? 'bg-cyan-500/80 text-slate-950 border-cyan-300'
                : 'bg-purple-600/85 text-white border-purple-400'
            }`}>
              {prompt.type === 'video' ? '🎬 VIDEO' : '🖼️ IMAGE'}
            </span>

            {prompt.isTrending && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white backdrop-blur-md">
                <Flame className="w-3 h-3 fill-white" />
                HOT
              </span>
            )}

            <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide backdrop-blur-md border ${
              prompt.access === 'premium'
                ? 'bg-purple-500/30 text-purple-200 border-purple-400/40'
                : 'bg-blue-500/30 text-blue-200 border-blue-400/40'
            }`}>
              {prompt.access === 'premium' ? 'PREMIUM' : 'FREE'}
            </span>
          </div>

          {/* Aspect Ratio Badge */}
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 text-slate-200 border border-white/20 backdrop-blur-md">
            {prompt.aspectRatio}
          </span>
        </div>

        {/* Bookmark Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(prompt.id);
          }}
          className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black/90 border border-white/20 text-slate-200 hover:text-cyan-400 backdrop-blur-md transition z-10 cursor-pointer"
          title={isSaved ? 'Remove from Saved' : 'Save prompt'}
        >
          {isSaved ? (
            <BookmarkCheck className="w-4 h-4 text-cyan-400 fill-cyan-400" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </button>

        {/* Storyboard Count (for video prompts) */}
        {prompt.storyboards && prompt.storyboards.length > 0 && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/70 border border-white/20 text-[10px] font-bold text-cyan-300 backdrop-blur-md">
            <Layers className="w-3 h-3" />
            <span>{prompt.storyboards.length} Scenes</span>
          </div>
        )}
      </div>

      {/* Content Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & ID */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-cyan-400 font-bold tracking-wide uppercase text-[11px]">
              {prompt.category}
            </span>
            <span className="text-slate-500 text-[11px] font-mono">
              #{prompt.id}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition line-clamp-1">
            {prompt.title}
          </h3>

          {/* AI Model Tag */}
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{prompt.model}</span>
          </div>

          {/* Excerpt */}
          <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {prompt.description}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
          {/* Quick Copy Button with Logo Cyan/Blue Gradient */}
          <button
            onClick={handleCopy}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer border ${
              isLocked
                ? 'bg-slate-900 border-slate-700 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40'
                : copied
                ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 border-cyan-400/40'
            }`}
          >
            {isLocked ? (
              <>
                <Lock className="w-3.5 h-3.5 text-purple-400" />
                <span>Unlock Prompt</span>
              </>
            ) : copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Prompt</span>
              </>
            )}
          </button>

          {/* View Details Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectPrompt(prompt);
            }}
            className="p-2 rounded-xl bg-[#0b162f] hover:bg-[#102042] text-slate-300 hover:text-white border border-cyan-500/20 transition cursor-pointer"
            title="View Full Parameters & Storyboard"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
