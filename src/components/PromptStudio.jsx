import React, { useState } from 'react';
import { Sparkles, Sliders, Copy, Check, Wand2, RefreshCw, Layers, Zap } from 'lucide-react';

export function PromptStudio() {
  const [subject, setSubject] = useState('A golden eagle reuniting with its family in alpine mountains');
  const [style, setStyle] = useState('cinematic');
  const [lighting, setLighting] = useState('golden_hour');
  const [camera, setCamera] = useState('dolly_in');
  const [aspect, setAspect] = useState('9:16');
  const [model, setModel] = useState('kling');
  const [copied, setCopied] = useState(false);

  const stylePresets = {
    cinematic: 'Cinematic 35mm anamorphic footage, extreme photorealistic textures, emotive film tone, Panavision lens, shallow depth of field, 8k resolution',
    wildlife: 'National Geographic 8k wildlife documentary, pristine raw animal anatomy, hyper-detailed fur and feathers, authentic natural habitat, 60fps slow-motion',
    cyberpunk: 'Neo-Tokyo cyberpunk aesthetic, holographic neon lights, rain reflections on asphalt, high-tech dystopian atmosphere, cinematic bloom',
    commercial: 'High-end luxury brand television commercial, crystalline studio product lighting, Hasselblad medium format camera, caustic refractions, Vogue editorial',
    science3d: 'Ultra-detailed 3D scientific explainer animation, Octane render 5.4, biological subsurface scattering, glowing electron microscope aesthetics',
    anime: 'Makoto Shinkai and Studio Ghibli painterly aesthetic, gigantic fluffy clouds, emotive twilight sunset, hand-drawn anime cel shading'
  };

  const lightingPresets = {
    golden_hour: 'Warm volumetric golden hour sunbeams piercing through mist, amber rim lighting, soft natural shadows',
    cyber_neon: 'Pulsing turquoise and magenta neon backlight, high-contrast chiaroscuro shadows, reflective specular highlights',
    studio_rim: 'Flawless three-point studio softbox illumination, subtle warm edge rim light, pure commercial clarity',
    bioluminescent: 'Ethereal underwater bioluminescence, cyan and violet pulsing glow organs, deep abyssal contrast',
    dramatic_torch: 'Flickering warm torchlight casting dancing shadows against ancient stone, high dynamic range'
  };

  const cameraPresets = {
    dolly_in: 'Smooth gimbal dolly in with subtle upward tilt, 35mm lens, motion scale 4.5',
    slow_orbit: 'Continuous 360-degree orbital rotation around the central subject, slow and hypnotic, motion scale 3.0',
    fpv_drift: 'Dynamic low-angle high-speed tracking shot with subtle camera vibration, motion scale 6.0',
    macro_zoom: 'Extreme continuous macro zoom-in traveling through microscopic layers, motion scale 5.0'
  };

  const generatedPrompt = `${subject.trim() || 'A captivating subject'}. ${stylePresets[style]}. Lighting: ${lightingPresets[lighting]}. Camera: ${cameraPresets[camera]}. --ar ${aspect} --v 6.1 --style raw`;
  
  const generatedNegative = 'blurry, low resolution, deformed anatomy, artifacts, oversaturated cartoon look, distorted faces, duplicate limbs, stuttering motion, watermarks';

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Studio Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-3">
          <Wand2 className="w-3.5 h-3.5" />
          <span>SKILLORA PROMPT GENERATOR</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
          AI Video Prompt Studio
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Craft high-retention master prompts for Runway Gen-3, Kling AI, and Midjourney in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-5 bg-[#061c22] border border-[#143d49] p-5 sm:p-6 rounded-2xl shadow-xl">
          
          {/* Subject Input */}
          <div>
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
              1. Subject or Action Idea:
            </label>
            <textarea
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              rows={2}
              placeholder="e.g. A robotic falcon landing on a futuristic skyscraper..."
              className="w-full bg-[#031317] border border-[#174350] focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 p-3 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 transition"
            />
          </div>

          {/* Style Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
              2. Visual Niche & Aesthetic:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'cinematic', label: '🎬 Cinematic 35mm' },
                { id: 'wildlife', label: '🦅 NatGeo Wildlife' },
                { id: 'cyberpunk', label: '🚀 Cyberpunk Neon' },
                { id: 'commercial', label: '💎 Luxury TV Ad' },
                { id: 'science3d', label: '🧬 3D Microscopic' },
                { id: 'anime', label: '🎨 Anime Cel Shade' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setStyle(item.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left transition border cursor-pointer ${
                    style === item.id
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-sm'
                      : 'bg-[#031418] text-slate-400 border-[#123640] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lighting Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
              3. Lighting Mood:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'golden_hour', label: '🌅 Golden Sunbeams' },
                { id: 'cyber_neon', label: '⚡ Cyberpunk Neon' },
                { id: 'studio_rim', label: '✨ Studio Rim Light' },
                { id: 'bioluminescent', label: '🌊 Deep Sea Glow' },
                { id: 'dramatic_torch', label: '🔥 Ancient Torch' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setLighting(item.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left transition border cursor-pointer ${
                    lighting === item.id
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-sm'
                      : 'bg-[#031418] text-slate-400 border-[#123640] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Camera Motion */}
          <div>
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
              4. Camera Movement & Direction:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'dolly_in', label: 'Smooth Gimbal Dolly In' },
                { id: 'slow_orbit', label: '360° Hypnotic Orbit' },
                { id: 'fpv_drift', label: 'Dynamic FPV Speed Drift' },
                { id: 'macro_zoom', label: 'Microscopic Continuous Zoom' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCamera(item.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left transition border cursor-pointer ${
                    camera === item.id
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-sm'
                      : 'bg-[#031418] text-slate-400 border-[#123640] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio & Target Platform */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                Aspect Ratio:
              </label>
              <div className="flex gap-2">
                {['9:16', '16:9', '1:1'].map((ar) => (
                  <button
                    key={ar}
                    onClick={() => setAspect(ar)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition border cursor-pointer ${
                      aspect === ar
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                        : 'bg-[#031317] text-slate-400 border-[#143e49]'
                    }`}
                  >
                    {ar}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                Target AI Engine:
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-[#031317] border border-[#143e49] text-xs font-semibold text-cyan-300 py-2.5 px-3 rounded-lg focus:outline-none"
              >
                <option value="kling">Kling AI 1.5</option>
                <option value="runway">Runway Gen-3 Alpha</option>
                <option value="luma">Luma Dream Machine</option>
                <option value="midjourney">Midjourney v6.1</option>
              </select>
            </div>
          </div>

        </div>

        {/* Live Output Column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-[#04151b] border border-[#15424e] p-5 sm:p-6 rounded-2xl shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Live Generated Prompt
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                {aspect} • {model.toUpperCase()}
              </span>
            </div>

            {/* Generated Output Box */}
            <div className="bg-[#020b0e] border border-[#0d2e36] p-4 rounded-xl text-slate-100 text-sm font-mono leading-relaxed select-all min-h-[160px]">
              {generatedPrompt}
            </div>

            {/* Negative Prompt */}
            <div className="mt-4">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-1.5">
                Negative Exclusions:
              </span>
              <div className="bg-[#020b0e] border border-[#0d2e36] p-3 rounded-xl text-slate-300 text-xs font-mono select-all">
                {generatedNegative}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#123640] space-y-2">
            <button
              onClick={handleCopy}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold text-sm hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/20 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Prompt to Clipboard!' : 'Copy Generated Prompt'}</span>
            </button>
            <p className="text-center text-[11px] text-slate-500">
              Ready to paste into Runway, Kling, or Midjourney for immediate video generation.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
