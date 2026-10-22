import React, { useState } from 'react';
import { Users, Heart, Eye, Sparkles, Video, Play, MessageSquare, ExternalLink, Send } from 'lucide-react';
import { COMMUNITY_POSTS } from '../data/prompts';

export function SocialCorner({ onSelectPromptByTitle }) {
  const [likes, setLikes] = useState({ 1: false, 2: false, 3: false });
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const toggleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-3">
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          <span>CREATOR SOCIAL CORNER</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Viral Creations by Skillora Members
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          See actual viral Reels, TikToks, and Shorts created using Skillora AI master prompts and storyboards.
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-5 py-2.5 rounded-xl bg-[#082d36] hover:bg-[#0c3e4b] border border-cyan-500/40 text-cyan-300 font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Video className="w-4 h-4 text-cyan-400" />
            <span>Submit Your Generation</span>
          </button>
        </div>
      </div>

      {/* Community Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COMMUNITY_POSTS.map((post) => (
          <div
            key={post.id}
            className="rounded-2xl bg-[#061b20] border border-[#143b46] overflow-hidden flex flex-col justify-between hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Visual Thumbnail */}
            <div className="relative aspect-video w-full bg-[#030e12] overflow-hidden group">
              <img
                src={post.videoThumbnail}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

              {/* View stats badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 border border-white/10">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>{post.views}</span>
              </div>

              {/* Play overlay button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-cyan-400/90 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-400/30 group-hover:scale-110 transition">
                  <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                </div>
              </div>
            </div>

            {/* Post info */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Creator avatar & handle */}
                <div className="flex items-center gap-2.5 mb-3">
                  <img
                    src={post.avatar}
                    alt={post.creator}
                    className="w-8 h-8 rounded-full object-cover border border-cyan-400/40"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{post.creator}</div>
                    <div className="text-[11px] text-slate-400">{post.handle}</div>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {post.title}
                </h3>

                {/* Prompt badge */}
                <div className="mt-2.5 p-2 rounded-lg bg-[#031317] border border-[#11353e] text-xs">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Prompt Engine:</span>
                  <span className="text-cyan-300 font-semibold">{post.promptUsed}</span>
                </div>

                {/* Creator review quote */}
                <p className="mt-3 text-xs text-slate-300 italic border-l-2 border-cyan-400/60 pl-2.5">
                  "{post.comment}"
                </p>
              </div>

              {/* Tools & Like Footer */}
              <div className="mt-5 pt-3 border-t border-[#123640] flex items-center justify-between text-xs">
                <div className="flex gap-1.5">
                  {post.tools.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-[#08252d] text-slate-300 text-[10px] font-medium border border-[#153f4b]">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition cursor-pointer ${
                    likes[post.id] 
                      ? 'text-rose-400 bg-rose-500/10' 
                      : 'text-slate-400 hover:text-white hover:bg-[#08252d]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${likes[post.id] ? 'fill-rose-400' : ''}`} />
                  <span>{post.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#051a20] border border-[#174653] p-6 rounded-2xl max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Submit Your AI Video Generation
            </h3>
            <p className="text-xs text-slate-300">
              Share your video link or Reel created with Skillora prompts. Featured creators get free 1-month Pro access!
            </p>
            <input
              type="text"
              placeholder="Your Name / Creator Handle"
              className="w-full bg-[#031317] border border-[#153f4b] p-2.5 rounded-xl text-xs text-slate-100"
            />
            <input
              type="text"
              placeholder="Reel or TikTok URL (Instagram / TikTok / YouTube)"
              className="w-full bg-[#031317] border border-[#153f4b] p-2.5 rounded-xl text-xs text-slate-100"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Thank you! Your video was submitted for admin review.');
                  setShowSubmitModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs"
              >
                Submit Link
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
