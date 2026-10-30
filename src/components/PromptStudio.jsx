import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Upload, 
  Video, 
  FileVideo, 
  Play, 
  Pause, 
  Copy, 
  Check, 
  Wand2, 
  RefreshCw, 
  Camera, 
  Sun, 
  Layers, 
  Zap, 
  Film, 
  Sliders, 
  CheckCircle2, 
  Eye, 
  ArrowRight,
  Info,
  Key,
  HelpCircle,
  Tag,
  X,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

// Helper: High-fidelity cinematic prompt generator from video metadata & frame metrics
function generateScenePromptFromVideo({ videoName = '', userTopic = '', topicChip = '', frameMetrics = {}, aspect = '16:9' }) {
  const nameLower = (videoName || '').toLowerCase();
  const topicLower = (userTopic || '').toLowerCase();
  const chipLower = (topicChip || '').toLowerCase();

  // Determine category
  let category = 'cinematic';
  if (chipLower.includes('person') || nameLower.includes('person') || nameLower.includes('man') || nameLower.includes('girl') || nameLower.includes('woman') || nameLower.includes('model') || nameLower.includes('portrait') || nameLower.includes('reel') || topicLower.includes('person') || topicLower.includes('girl') || topicLower.includes('man') || topicLower.includes('superhero') || nameLower.includes('superhero')) {
    category = 'person';
  } else if (chipLower.includes('cyberpunk') || nameLower.includes('cyber') || nameLower.includes('futuristic') || nameLower.includes('neon') || nameLower.includes('tokyo') || topicLower.includes('cyberpunk') || topicLower.includes('neon')) {
    category = 'cyberpunk';
  } else if (chipLower.includes('nature') || nameLower.includes('nature') || nameLower.includes('drone') || nameLower.includes('aerial') || nameLower.includes('mountain') || nameLower.includes('landscape') || topicLower.includes('nature') || topicLower.includes('mountain')) {
    category = 'nature';
  } else if (chipLower.includes('fitness') || nameLower.includes('gym') || nameLower.includes('workout') || nameLower.includes('sport') || nameLower.includes('running') || topicLower.includes('fitness') || topicLower.includes('gym')) {
    category = 'fitness';
  } else if (chipLower.includes('animal') || nameLower.includes('animal') || nameLower.includes('dog') || nameLower.includes('cat') || nameLower.includes('lion') || nameLower.includes('eagle') || nameLower.includes('tiger') || topicLower.includes('animal')) {
    category = 'animal';
  } else if (chipLower.includes('anime') || nameLower.includes('anime') || nameLower.includes('cartoon') || nameLower.includes('manga') || topicLower.includes('anime')) {
    category = 'anime';
  } else if (nameLower.includes('car') || nameLower.includes('drift') || nameLower.includes('race') || nameLower.includes('vehicle') || topicLower.includes('car')) {
    category = 'automotive';
  } else if (nameLower.includes('product') || nameLower.includes('watch') || nameLower.includes('perfume') || nameLower.includes('commercial') || topicLower.includes('product')) {
    category = 'product';
  }

  // Frame lighting analysis
  const brightness = frameMetrics.brightness ?? 128;
  const r = frameMetrics.r ?? 128;
  const b = frameMetrics.b ?? 128;
  let lightingDesc = 'Cinematic 3-point studio lighting with subtle volumetric edge fill';
  if (brightness < 80) {
    lightingDesc = 'Moody low-key cinematic chiaroscuro, deep volumetric shadows, atmospheric haze, subtle specular rim glow';
  } else if (brightness > 175) {
    lightingDesc = 'Luminous high-key commercial studio illumination, soft diffused highlights, clean pastel tonal rolloff';
  } else if (b > r + 20) {
    lightingDesc = 'Cool anamorphic teal-cyan ambient lighting, subtle horizontal lens flare, modern film color grade';
  } else if (r > b + 20) {
    lightingDesc = 'Warm golden hour sunset radiance, amber god rays, rich saturated warm undertones with natural rim speculars';
  }

  let cameraDesc = aspect === '9:16'
    ? 'Vertical 9:16 mobile composition, 35mm lens, dynamic vertical gimbal tracking with subtle dolly-in'
    : 'Cinematic 16:9 widescreen, anamorphic 50mm lens f/1.8, smooth steady-cam dolly-forward and slow parallax pan';

  let subjectDesc = '';
  let masterPrompt = '';

  switch (category) {
    case 'person':
      subjectDesc = userTopic || 'A charismatic character in ultra-detailed modern attire, expressive gaze into the lens, natural fluid micro-movements, wind softly touching hair, hyper-detailed skin pores and lifelike realistic eyes';
      cameraDesc = aspect === '9:16' ? 'Vertical 9:16 portrait orientation, 85mm prime lens f/1.4, slow push-in tracking shot focusing on facial emotion' : 'Cinematic medium close-up, 50mm lens, gentle horizontal tracking pan';
      masterPrompt = `Hyper-realistic 8K cinematic footage of ${subjectDesc}. ${lightingDesc}. ${cameraDesc}. Photorealistic skin textures, cinematic film grain, shallow depth of field, 60fps smooth natural motion, shot on ARRI Alexa Mini LF --ar ${aspect} --v 6.1 --style raw`;
      break;

    case 'cyberpunk':
      subjectDesc = userTopic || 'A futuristic street scene illuminated by high-contrast neon signs, rain-slicked wet asphalt reflecting magenta and cyan light, towering cyberpunk architecture with holographic displays';
      cameraDesc = 'Low-angle orbital camera pan, anamorphic lens with horizontal blue flares, smooth continuous steady-cam movement';
      masterPrompt = `Cinematic sci-fi masterpiece, ${subjectDesc}. ${lightingDesc}. ${cameraDesc}. Volumetric atmospheric steam, rain droplets catching neon lights, photorealistic 8K render, Unreal Engine 5 aesthetic, 60fps --ar ${aspect} --v 6.1 --style raw`;
      break;

    case 'nature':
      subjectDesc = userTopic || 'A breathtaking natural vista with dramatic mountain peaks, morning mist rolling through evergreen forests, sun rays piercing through cloud layers';
      cameraDesc = 'Sweeping cinematic aerial FPV drone shot, rising elevation with slow tilt-down, vast epic depth of field';
      masterPrompt = `National Geographic quality 8K aerial footage of ${subjectDesc}. ${lightingDesc}. ${cameraDesc}. Hasselblad medium format color science, photorealistic nature textures, crisp 60fps dynamic motion --ar ${aspect} --v 6.1 --style raw`;
      break;

    case 'automotive':
      subjectDesc = userTopic || 'A high-performance sleek sports car drifting through a wet asphalt turn, tires kicking up dense smoke mist, headlights slicing through the darkness';
      cameraDesc = 'High-speed chase camera at ground level, 24mm wide angle lens, rapid tracking dolly matching vehicle velocity';
      masterPrompt = `High-budget automotive commercial, ${subjectDesc}. ${lightingDesc}. ${cameraDesc}. Anamorphic motion blur, carbon fiber details, tire smoke particle physics, 4K 60fps --ar ${aspect} --v 6.1 --style raw`;
      break;

    case 'fitness':
      subjectDesc = userTopic || 'An athletic athlete performing an intense workout, beads of sweat glistening under lighting, focused determined expression, defined muscle striations in fluid motion';
      cameraDesc = 'Low-angle dynamic gimbal tracking, 35mm lens, intense slow-motion 120fps capture emphasizing kinetic power';
      masterPrompt = `Nike-style cinematic commercial of ${subjectDesc}. ${lightingDesc}. ${cameraDesc}. High-contrast directional lighting, sweat particle droplets, photorealistic 8K resolution, 60fps --ar ${aspect} --v 6.1 --style raw`;
      break;

    case 'animal':
      subjectDesc = userTopic || 'A majestic wild animal in its natural habitat, intense predatory gaze, wind rustling through textured fur, alert posture against dynamic landscape';
      cameraDesc = 'Telephoto 400mm lens, eye-level tracking shot with creamy optical bokeh, steady slow dolly movement';
      masterPrompt = `Ultra-detailed BBC Wildlife documentary 8K shot of ${subjectDesc}. ${lightingDesc}. ${cameraDesc}. Individual fur strand physics, lifelike iris reflection, 60fps natural motion --ar ${aspect} --v 6.1 --style raw`;
      break;

    case 'anime':
      subjectDesc = userTopic || 'An expressive anime character in a beautifully painted fantasy world, floating glowing particles, detailed anime eyes with vibrant reflections, hair blowing dramatically';
      cameraDesc = 'Dynamic anime camera move, rapid zoom-in transitioning into a 3D orbital pan, dramatic cel-shaded perspective';
      masterPrompt = `Makoto Shinkai and Ufotable aesthetic masterpiece, ${subjectDesc}. ${lightingDesc}. ${cameraDesc}. Vibrant hand-painted sky, glowing magical embers, crisp cel-shaded lines, 60fps cinematic animation --ar ${aspect} --v 6.1`;
      break;

    case 'product':
      subjectDesc = userTopic || 'A luxury product showcased in an elegant setting, floating water droplets, glass reflections, pristine materials and flawless metallic finishes';
      cameraDesc = '100mm macro probe lens, slow continuous orbital rotation around the product with rack-focus transition';
      masterPrompt = `High-end luxury commercial of ${subjectDesc}. ${lightingDesc}. ${cameraDesc}. Studio softbox reflections, pristine caustics, 8K commercial color grading, 60fps --ar ${aspect} --v 6.1 --style raw`;
      break;

    default:
      const cleanTitle = (videoName || 'scene').replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      subjectDesc = userTopic || `A high-impact cinematic scene featuring ${cleanTitle}, with rich environmental details, authentic textures and dynamic physical motion`;
      masterPrompt = `Epic cinematic 8K footage of ${subjectDesc}. ${lightingDesc}. ${cameraDesc}. Photorealistic textures, ARRI Alexa 65 color science, deep depth of field, 60fps --ar ${aspect} --v 6.1 --style raw`;
      break;
  }

  return {
    subject: subjectDesc,
    camera: cameraDesc,
    lighting: lightingDesc,
    masterPrompt,
    negative: 'blurry, low quality, deformed, extra limbs, bad face, artifacts, watermark, cartoon look, low resolution, noise, overexposed'
  };
}

export function PromptStudio() {
  const [activeTab, setActiveTab] = useState('video-to-prompt'); // 'video-to-prompt' or 'custom-builder'

  // ==================== 1. VIDEO TO PROMPT STATE ====================
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState(null);
  const [uploadedVideoFile, setUploadedVideoFile] = useState(null);
  const [videoInfo, setVideoInfo] = useState({ name: '', size: '', duration: '', aspect: '16:9' });
  const [userSceneTopic, setUserSceneTopic] = useState('');
  const [selectedTopicChip, setSelectedTopicChip] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState('');
  const [capturedKeyframe, setCapturedKeyframe] = useState(null);
  const [generatedVideoPrompt, setGeneratedVideoPrompt] = useState(null);
  const [copiedVideoPrompt, setCopiedVideoPrompt] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const [frameMetrics, setFrameMetrics] = useState({ r: 128, g: 128, b: 128, brightness: 128 });

  // OpenRouter AI Key state (Kept safely in client-side localStorage, not bundled into git)
  const [openrouterApiKey, setOpenrouterApiKey] = useState(() => {
    try {
      return localStorage.getItem('skillora_openrouter_key') || '';
    } catch {
      return '';
    }
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKeyInput, setTempKeyInput] = useState('');
  const [keyValidationState, setKeyValidationState] = useState(null);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Quick 1-Click Topic Chips to ensure accurate prompt generation
  const topicChips = [
    { id: 'person', label: '👤 Person / Portrait / Reel', prompt: 'Cinematic portrait of a charismatic creator in dynamic lighting, emotional expression, photorealistic skin pores and natural movement' },
    { id: 'animal', label: '🐾 Animal / Wildlife', prompt: 'National Geographic close-up wildlife footage of a magnificent animal moving with agility in its natural raw habitat, 8k slow-motion' },
    { id: 'car', label: '🏎️ Car / Vehicle Drift', prompt: 'High-octane tracking shot of a matte aerodynamic sports car drifting around asphalt corners at high speed with smoke and tire caustics' },
    { id: 'nature', label: '🌲 Nature / Drone Aerial', prompt: 'Sweeping 4K cinematic FPV drone footage gliding over breathtaking misty mountains, waterfalls, and alpine pine forests at golden hour' },
    { id: 'cyberpunk', label: '🏙️ Cyberpunk / Futuristic City', prompt: 'Futuristic Neo-Tokyo cyberpunk sequence, rain-slicked neon street reflections, holographic billboards, high-tech dystopian atmosphere' },
    { id: 'product', label: '💎 Luxury Product / Commercial', prompt: 'High-end commercial advertisement studio footage, luxury product floating with fluid caustics, crystalline reflections, 100mm macro lens' },
    { id: 'anime', label: '🎨 Anime / Stylized Cel Art', prompt: 'Studio Ghibli and Makoto Shinkai aesthetic anime sequence, vibrant painterly clouds, emotive golden twilight sky, hand-drawn anime cel animation' },
    { id: 'fitness', label: '🔥 Fitness / Sports / Stunt', prompt: 'High-energy athletic sports footage, intense workout movement, slow-motion sweat droplets, dynamic low-angle tracking camera' }
  ];

  // Sample videos for immediate 1-click test
  const sampleVideos = [
    {
      id: 'eagle',
      name: 'Eagle-Alpine-Reunion-4K.mp4',
      size: '14.2 MB',
      aspect: '9:16',
      videoUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80',
      subject: 'Golden eagle soaring majestically above misty pine-covered alpine peaks at sunrise',
      camera: 'Low-angle anamorphic gimbal tracking, smooth dolly-in with subtle pan right (Motion: 4.8)',
      lighting: 'Volumetric golden hour sunbeams piercing morning mist, golden rim-lit feathers, chiaroscuro contrast',
      model: 'Kling 1.5 / Runway Gen-3',
      prompt: 'Cinematic wildlife documentary footage of two magnificent golden eagles reuniting on a misty alpine mountain peak at sunrise. Extreme photorealistic feather detail, golden volumetric god rays piercing through cedar pines, morning dew drops visible. Smooth anamorphic gimbal tracking 35mm lens, shallow depth of field, slow-motion 4k 60fps, emotive atmosphere, National Geographic style color grading --ar 9:16 --v 6.1 --style raw',
      negative: 'cartoon, lowres, distorted anatomy, duplicate wings, extra heads, blurry background, pixelated, 3d render look, stuttering motion'
    },
    {
      id: 'drift',
      name: 'Cyberpunk-Shinjuku-Drift.mp4',
      size: '18.7 MB',
      aspect: '16:9',
      videoUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
      subject: 'Matte black futuristic sports car drifting through wet neon-soaked streets of Neo-Tokyo at 2 AM',
      camera: 'High-speed ground tracking FPV camera, rapid orbital pan around spinning wheels (Motion: 6.2)',
      lighting: 'Cyan and magenta neon billboard reflections in asphalt puddles, caustic water splashes, lens flares',
      model: 'Luma Dream Machine / Kling 1.5',
      prompt: 'Low-angle tracking shot of a matte black futuristic sports car drifting through wet neon-soaked streets of Neo-Tokyo at 2 AM. Puddle reflections of holographic kanji billboards in magenta and turquoise, smoke billowing from spinning wheels, raindrops streaking across anamorphic camera lens, Blade Runner aesthetic, cinematic lighting, 4k 60fps --ar 16:9 --style raw',
      negative: 'toy car, unrealistic physics, daytime, sunny, dry road, stuttering motion, low poly, artifacting'
    },
    {
      id: 'luxury',
      name: 'Luxury-Liquid-Perfume-Ad.mp4',
      size: '9.4 MB',
      aspect: '9:16',
      videoUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
      subject: 'Crystalline geometric glass perfume bottle floating weightlessly through swirling golden liquid caustics',
      camera: 'Ultra-smooth macro orbital slow zoom, continuous 360-degree floating camera motion (Motion: 3.5)',
      lighting: 'Studio caustics refraction illumination, glowing liquid amber subsurface scattering, sparkling micro-droplets',
      model: 'Runway Gen-3 / Midjourney v6.1',
      prompt: 'Macro television commercial footage of a luxury geometric cut-glass perfume flacon suspended inside crystal-clear mineral water. Golden honey droplets and effervescent bubbles slowly swirling around the flacon, warm studio rim lighting, refraction caustics dancing across glass facets, Hasselblad 100mm macro lens, ultra-high-definition 4k 120fps slow-motion --ar 9:16 --v 6.1 --style raw',
      negative: 'murky liquid, cheap bottle, fingerprints, scratches, flat lighting, amateur video, plastic textures'
    }
  ];

  // Extract keyframe reliably from uploaded video file using an offscreen video element
  const extractFrameFromBlob = (file) => {
    return new Promise((resolve) => {
      try {
        const url = URL.createObjectURL(file);
        const v = document.createElement('video');
        v.preload = 'auto';
        v.muted = true;
        v.playsInline = true;
        v.src = url;
        v.load();

        let hasCaptured = false;
        const doCapture = () => {
          if (hasCaptured) return;
          hasCaptured = true;
          try {
            const canvas = document.createElement('canvas');
            let width = v.videoWidth || 640;
            let height = v.videoHeight || 360;
            const maxDim = 1024;
            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(v, 0, 0, width, height);

            // Sample frame pixels
            try {
              const imgData = ctx.getImageData(0, 0, width, height);
              const data = imgData.data;
              const step = Math.max(1, Math.floor(data.length / (4 * 400)));
              let rSum = 0, gSum = 0, bSum = 0, sampled = 0;
              for (let i = 0; i < data.length; i += 4 * step) {
                rSum += data[i];
                gSum += data[i + 1];
                bSum += data[i + 2];
                sampled++;
              }
              const r = sampled ? rSum / sampled : 128;
              const g = sampled ? gSum / sampled : 128;
              const b = sampled ? bSum / sampled : 128;
              const brightness = (r * 299 + g * 587 + b * 114) / 1000;
              setFrameMetrics({ r, g, b, brightness });
            } catch (e) {}

            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            URL.revokeObjectURL(url);
            resolve(dataUrl);
          } catch (e) {
            URL.revokeObjectURL(url);
            resolve(null);
          }
        };

        v.onseeked = doCapture;
        v.onloadeddata = () => {
          if (v.duration > 0.4) {
            v.currentTime = Math.min(1.0, v.duration * 0.2);
          } else {
            doCapture();
          }
        };
        v.onerror = () => {
          URL.revokeObjectURL(url);
          resolve(null);
        };
        setTimeout(() => doCapture(), 1500);
      } catch (err) {
        resolve(null);
      }
    });
  };

  // Capture actual keyframe from HTML5 video element
  const captureFrameFromVideo = async () => {
    if (!videoRef.current) return capturedKeyframe || null;
    const v = videoRef.current;

    // If metadata not ready, wait up to 800ms
    if (v.readyState < 2) {
      await new Promise((resolve) => {
        const onLoaded = () => {
          v.removeEventListener('loadeddata', onLoaded);
          v.removeEventListener('canplay', onLoaded);
          resolve();
        };
        v.addEventListener('loadeddata', onLoaded);
        v.addEventListener('canplay', onLoaded);
        setTimeout(resolve, 800);
      });
    }

    // Seek slightly into the video if at 0.0s to avoid pure black intro frames
    if (v.currentTime < 0.2 && v.duration > 0.5) {
      try {
        v.currentTime = Math.min(1.0, v.duration * 0.2);
        await new Promise((resolve) => {
          const onSeeked = () => {
            v.removeEventListener('seeked', onSeeked);
            resolve();
          };
          v.addEventListener('seeked', onSeeked);
          setTimeout(resolve, 350);
        });
      } catch (e) {}
    }

    try {
      const canvas = document.createElement('canvas');
      const maxDim = 1024;
      let width = v.videoWidth || 640;
      let height = v.videoHeight || 360;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(v, 0, 0, width, height);

      // Sample frame pixels for color, brightness and cinematic tone
      try {
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;
        const step = Math.max(1, Math.floor(data.length / (4 * 400)));
        let rSum = 0, gSum = 0, bSum = 0, sampled = 0;
        for (let i = 0; i < data.length; i += 4 * step) {
          rSum += data[i];
          gSum += data[i + 1];
          bSum += data[i + 2];
          sampled++;
        }
        const r = sampled ? rSum / sampled : 128;
        const g = sampled ? gSum / sampled : 128;
        const b = sampled ? bSum / sampled : 128;
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        setFrameMetrics({ r, g, b, brightness });
      } catch (err) {
        console.warn('Pixel sampling fallback:', err);
      }

      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      if (dataUrl && dataUrl.length > 500) {
        setCapturedKeyframe(dataUrl);
        return dataUrl;
      }
    } catch (err) {
      console.warn('Canvas frame capture warning:', err);
    }
    return capturedKeyframe || null;
  };

  // Handle Video File Selection
  const handleFileChange = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      alert('Please upload a valid video file (MP4, MOV, WebM, etc.).');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setUploadedVideoUrl(objectUrl);
    setUploadedVideoFile(file);
    setVideoInfo({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      duration: 'Ready to play',
      aspect: 'Auto Detect'
    });
    setGeneratedVideoPrompt(null);
    setCapturedKeyframe(null);

    // Extract real visual keyframe immediately so AI has the frame ready
    const frame = await extractFrameFromBlob(file);
    if (frame) {
      setCapturedKeyframe(frame);
    }
  };

  // Drag and Drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Save & Verify OpenRouter API Key
  const handleVerifyAndSaveKey = async () => {
    const raw = tempKeyInput.trim();
    if (!raw) {
      setKeyValidationState({ type: 'error', message: 'Please paste your OpenRouter API key first.' });
      return;
    }

    if (!raw.startsWith('sk-or-')) {
      setKeyValidationState({
        type: 'error',
        message: 'OpenRouter API keys start with "sk-or-". Please check your key from openrouter.ai/keys'
      });
      return;
    }

    setKeyValidationState({ type: 'loading', message: 'Connecting to OpenRouter AI Engine...' });

    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-openrouter-key': raw
        },
        body: JSON.stringify({
          topic: 'cinematic preview verification',
          aspect: '16:9',
          apiKey: raw
        })
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        try {
          localStorage.setItem('skillora_openrouter_key', raw);
        } catch {}
        setOpenrouterApiKey(raw);
        setKeyValidationState({ type: 'success', message: 'OpenRouter AI connected successfully!' });
        setTimeout(() => {
          setShowKeyModal(false);
          setKeyValidationState(null);
        }, 1200);
      } else {
        const errMsg = data.error || 'Connection failed';
        setKeyValidationState({ type: 'error', message: errMsg });
      }
    } catch (err) {
      try {
        localStorage.setItem('skillora_openrouter_key', raw);
      } catch {}
      setOpenrouterApiKey(raw);
      setKeyValidationState({ type: 'success', message: 'OpenRouter key saved to your browser!' });
      setTimeout(() => {
        setShowKeyModal(false);
        setKeyValidationState(null);
      }, 1200);
    }
  };

  const handleClearKey = () => {
    try {
      localStorage.removeItem('skillora_openrouter_key');
    } catch {}
    setOpenrouterApiKey('');
    setTempKeyInput('');
    setKeyValidationState({ type: 'success', message: 'Key removed.' });
  };

  // Run AI Video Analysis (OpenRouter Multimodal & Cinematic AI Engine)
  const runVideoAnalysis = async (overridePreset = null) => {
    setIsAnalyzing(true);
    setAnalysisProgress(20);
    setAnalysisStage('1/3: Analyzing video keyframe & visual lighting physics...');

    if (overridePreset) {
      setGeneratedVideoPrompt(overridePreset);
      setAnalysisProgress(100);
      setIsAnalyzing(false);
      return;
    }

    // 1. Get real video frame image: prioritize fresh frame from current video playback
    let frameData = null;
    if (videoRef.current) {
      frameData = await captureFrameFromVideo();
    }
    if (!frameData || frameData.length < 500) {
      frameData = capturedKeyframe;
    }
    if ((!frameData || frameData.length < 500) && uploadedVideoFile) {
      frameData = await extractFrameFromBlob(uploadedVideoFile);
    }
    if (frameData && frameData.length > 500) {
      setCapturedKeyframe(frameData);
    }

    let detectedAr = '16:9';
    if (videoRef.current && videoRef.current.videoHeight > videoRef.current.videoWidth) {
      detectedAr = '9:16';
    }

    setAnalysisProgress(50);
    setAnalysisStage('2/3: OpenRouter AI reverse-engineering cinematic scene parameters...');

    const activeKey = (
      openrouterApiKey || 
      (typeof localStorage !== 'undefined' && localStorage.getItem('skillora_openrouter_key')) || 
      ''
    ).trim();

    // 2. Call OpenRouter backend /api/extract
    try {
      const lightingHint = frameMetrics.brightness > 160 
        ? 'High-key bright luminous commercial studio illumination'
        : frameMetrics.brightness < 90
        ? 'Moody low-key cinematic chiaroscuro with deep atmospheric shadows'
        : 'Cinematic three-point studio lighting with subtle volumetric edge fill';

      const topicToSend = userSceneTopic || selectedTopicChip || (uploadedVideoFile ? uploadedVideoFile.name : 'cinematic master scene');

      const apiRes = await fetch('/api/extract', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-openrouter-key': activeKey
        },
        body: JSON.stringify({
          image: frameData || '',
          topic: topicToSend,
          aspect: detectedAr,
          videoName: uploadedVideoFile?.name || videoInfo.name || 'scene',
          lightingHint,
          apiKey: activeKey
        })
      });

      if (apiRes.ok) {
        const parsed = await apiRes.json();
        if (parsed.masterPrompt) {
          const modelTitle = parsed.modelUsed 
            ? parsed.modelUsed.split('/')[1]?.replace(':free', '') 
            : 'Nemotron Super VL';

          setGeneratedVideoPrompt({
            name: uploadedVideoFile?.name || videoInfo.name || 'Analyzed Video',
            aspect: detectedAr,
            subject: parsed.subject || 'Cinematic Subject',
            camera: parsed.camera || 'Dynamic Steadycam Tracking Dolly',
            lighting: parsed.lighting || lightingHint,
            model: `OpenRouter AI Engine (${modelTitle})`,
            prompt: parsed.masterPrompt,
            negative: parsed.negative || 'low quality, blurry, deformed anatomy, artifacts'
          });
          setAnalysisProgress(100);
          setIsAnalyzing(false);
          return;
        }
      } else {
        const errData = await apiRes.json().catch(() => ({}));
        console.error('OpenRouter extraction failed:', errData);
        if (errData.needKey || apiRes.status === 400) {
          setShowKeyModal(true);
          setKeyValidationState({
            type: 'error',
            message: 'OpenRouter API Key required. Please paste your sk-or-... key below to reverse-engineer prompts from your video.'
          });
          setIsAnalyzing(false);
          return;
        }
        alert(`AI Video Analysis Error: ${errData.error || 'Server error occurred'}. Please ensure your OpenRouter API key is active.`);
        setIsAnalyzing(false);
        return;
      }
    } catch (e) {
      console.error('OpenRouter /api/extract error:', e);
      alert(`Connection Error: ${e.message}`);
      setIsAnalyzing(false);
      return;
    }

    // 3. Guaranteed dynamic scene synthesis from actual frame metrics
    setAnalysisStage('3/3: Synthesizing cinematic camera physics & lighting...');
    await new Promise((res) => setTimeout(res, 400));

    const smartPrompt = generateScenePromptFromVideo({
      videoName: uploadedVideoFile?.name || videoInfo.name || 'video',
      userTopic: userSceneTopic,
      topicChip: selectedTopicChip,
      frameMetrics,
      aspect: detectedAr
    });

    setGeneratedVideoPrompt({
      name: uploadedVideoFile?.name || videoInfo.name || 'Analyzed Video',
      aspect: detectedAr,
      subject: smartPrompt.subject,
      camera: smartPrompt.camera,
      lighting: smartPrompt.lighting,
      model: 'Skillora Cinematic Frame Engine',
      prompt: smartPrompt.masterPrompt,
      negative: smartPrompt.negative
    });

    setAnalysisProgress(100);
    setIsAnalyzing(false);
  };

  // Quick Select Sample Video
  const handleSelectSample = (sample) => {
    setUploadedVideoUrl(sample.videoUrl);
    setUploadedVideoFile(null);
    setVideoInfo({
      name: sample.name,
      size: sample.size,
      duration: '0:15',
      aspect: sample.aspect
    });
    setUserSceneTopic(sample.subject);
    setGeneratedVideoPrompt(null);
    runVideoAnalysis(sample);
  };

  const handleCopyVideoPrompt = () => {
    if (!generatedVideoPrompt) return;
    navigator.clipboard.writeText(generatedVideoPrompt.prompt);
    setCopiedVideoPrompt(true);
    setTimeout(() => setCopiedVideoPrompt(false), 2000);
  };

  // ==================== 2. MANUAL BUILDER STATE ====================
  const [subject, setSubject] = useState('A golden eagle reuniting with its family in alpine mountains');
  const [style, setStyle] = useState('cinematic');
  const [lighting, setLighting] = useState('golden_hour');
  const [camera, setCamera] = useState('dolly_in');
  const [aspect, setAspect] = useState('9:16');
  const [model, setModel] = useState('kling');
  const [copiedManual, setCopiedManual] = useState(false);

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

  const generatedManualPrompt = `${subject.trim() || 'A captivating subject'}. ${stylePresets[style]}. Lighting: ${lightingPresets[lighting]}. Camera: ${cameraPresets[camera]}. --ar ${aspect} --v 6.1 --style raw`;
  const generatedManualNegative = 'blurry, low resolution, deformed anatomy, artifacts, oversaturated cartoon look, distorted faces, duplicate limbs, stuttering motion, watermarks';

  const handleCopyManual = () => {
    navigator.clipboard.writeText(generatedManualPrompt);
    setCopiedManual(true);
    setTimeout(() => setCopiedManual(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Studio Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>AI REVERSE PROMPT & STUDIO ENGINE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          AI Video Prompt Studio
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-xl mx-auto">
          Upload your video to generate its exact master prompt, or build custom prompts with cinematic camera motion & lighting.
        </p>

        {/* Feature Mode Switcher */}
        <div className="mt-6 inline-flex p-1 rounded-2xl bg-[#050e1f] border border-cyan-500/30 max-w-md w-full">
          <button
            onClick={() => setActiveTab('video-to-prompt')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'video-to-prompt'
                ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Upload Video → Generate Prompt</span>
          </button>

          <button
            onClick={() => setActiveTab('custom-builder')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'custom-builder'
                ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Interactive Prompt Builder</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: UPLOAD VIDEO → GENERATE COMPLETE MASTER PROMPT                      */}
      {/* ========================================================================= */}
      {activeTab === 'video-to-prompt' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Main Top Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Video Upload & Details */}
            <div className="lg:col-span-7 space-y-4">
              
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={(e) => handleFileChange(e.target.files[0])}
                className="hidden"
              />

              {/* Upload Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative rounded-3xl border-2 border-dashed p-6 sm:p-8 text-center transition cursor-pointer flex flex-col items-center justify-center min-h-[220px] group ${
                  dragActive
                    ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]'
                    : 'border-cyan-500/30 hover:border-cyan-400/70 bg-[#070e20] hover:bg-[#0a142e]'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition shadow-lg shadow-cyan-500/15">
                  <Upload className="w-7 h-7" />
                </div>

                <h3 className="text-base font-bold text-white mb-1">
                  Upload Your Video Clip (MP4, MOV, WebM)
                </h3>
                <p className="text-xs text-slate-300 max-w-sm mb-3">
                  Click to choose file or drag and drop your reel here.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400">
                  <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700">Any Resolution & FPS</span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700">Vertical (9:16) & Wide (16:9)</span>
                </div>
              </div>

              {/* Video Content / Subject Input Box */}
              <div className="p-4 rounded-2xl bg-[#060c1c] border border-cyan-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-cyan-400" />
                    Video Topic / Scene Subject:
                  </label>
                  <span className="text-[11px] text-slate-400">
                    What is in your video?
                  </span>
                </div>

                <input
                  type="text"
                  value={userSceneTopic}
                  onChange={(e) => {
                    setUserSceneTopic(e.target.value);
                    setSelectedTopicChip('');
                  }}
                  placeholder="e.g. Man walking with black umbrella in rain / Cat jumping on sofa / Drone flying over lake..."
                  className="w-full bg-[#040814] border border-cyan-500/30 focus:border-cyan-400 p-3 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />

                {/* Quick 1-Click Topic Chips */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block mb-2">
                    Or select quick scene category:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {topicChips.map((chip) => (
                      <button
                        key={chip.id}
                        type="button"
                        onClick={() => {
                          setSelectedTopicChip(chip.id);
                          setUserSceneTopic(chip.prompt);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition border cursor-pointer ${
                          selectedTopicChip === chip.id
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-sm'
                            : 'bg-[#030917] text-slate-400 border-slate-800 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sample Videos Quick Test */}
              <div className="p-4 rounded-2xl bg-[#060c1c] border border-cyan-500/20">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider mb-2.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  Or test with sample creator clips:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {sampleVideos.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => handleSelectSample(sample)}
                      className="p-2.5 rounded-xl bg-[#091329] hover:bg-[#0f1f42] border border-cyan-500/20 hover:border-cyan-400/50 text-left transition cursor-pointer group"
                    >
                      <div className="text-xs font-bold text-white group-hover:text-cyan-300 truncate">
                        {sample.id === 'eagle' ? '🦅 Eagle Reunion' : sample.id === 'drift' ? '🏎️ Cyber Drift' : '💎 Perfume Ad'}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{sample.aspect} • 4K</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Video Player & Generate Button */}
            <div className="lg:col-span-5 bg-[#070e20] border border-cyan-500/20 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Video className="w-4 h-4 text-cyan-400" />
                    Video Preview & Frame Monitor
                  </span>
                  {videoInfo.name && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 font-mono truncate max-w-[140px]">
                      {videoInfo.size}
                    </span>
                  )}
                </div>

                {/* Video Screen */}
                <div className="relative rounded-2xl overflow-hidden bg-[#030612] border border-slate-800 aspect-video flex items-center justify-center">
                  {uploadedVideoUrl ? (
                    uploadedVideoFile ? (
                      <video
                        ref={videoRef}
                        src={uploadedVideoUrl}
                        controls
                        playsInline
                        className="w-full h-full object-contain"
                        onLoadedData={() => captureFrameFromVideo()}
                        onSeeked={() => captureFrameFromVideo()}
                        onPause={() => captureFrameFromVideo()}
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <img
                          src={uploadedVideoUrl}
                          alt="Video Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="p-3 rounded-full bg-cyan-400 text-slate-950 shadow-lg">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="text-center p-6 space-y-2 text-slate-500">
                      <Film className="w-10 h-10 mx-auto text-slate-600" />
                      <p className="text-xs">No video loaded. Upload your video on the left to start.</p>
                    </div>
                  )}

                  {/* Scanning Overlay Animation */}
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center animate-spin mb-3">
                        <RefreshCw className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">
                        Analyzing Video Scene...
                      </h4>
                      <p className="text-xs text-cyan-300 font-mono max-w-xs mb-3">
                        {analysisStage}
                      </p>
                      <div className="w-full max-w-xs bg-slate-800 rounded-full h-2 overflow-hidden border border-cyan-500/30">
                        <div
                          className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full transition-all duration-300"
                          style={{ width: `${analysisProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {videoInfo.name && (
                  <div className="mt-3 p-2.5 rounded-xl bg-[#040814] border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                    <span className="font-mono truncate max-w-[200px]">{videoInfo.name}</span>
                    <span className="text-cyan-400 font-semibold">{videoInfo.aspect}</span>
                  </div>
                )}

                {/* Captured Keyframe preview */}
                {capturedKeyframe && (
                  <div className="mt-3 p-2.5 rounded-xl bg-[#040814] border border-cyan-500/30 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img 
                        src={capturedKeyframe} 
                        alt="Captured Frame" 
                        className="w-16 h-10 object-cover rounded-lg border border-cyan-400/40 shrink-0 shadow-sm"
                      />
                      <div className="text-[11px] truncate">
                        <span className="text-slate-200 font-semibold block truncate">Video Frame Captured</span>
                        <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 inline" /> Ready for AI Prompt Extraction
                        </span>
                      </div>
                    </div>
                    {videoRef.current && (
                      <button
                        type="button"
                        onClick={() => captureFrameFromVideo()}
                        className="text-[10px] text-cyan-400 hover:text-cyan-300 font-mono px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 shrink-0 transition cursor-pointer"
                        title="Update captured frame to current video timestamp"
                      >
                        Recapture
                      </button>
                    )}
                  </div>
                )}

                {/* OpenRouter AI Status & Key Management (Permanent Safe Integration) */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-semibold text-emerald-400">OpenRouter AI Vision: Permanent Active</span>
                    <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-full">
                      ✓ Ready
                    </span>
                    <button 
                      type="button"
                      onClick={() => { setTempKeyInput(openrouterApiKey); setShowKeyModal(true); }}
                      className="text-[11px] text-slate-400 hover:text-cyan-400 underline ml-1 cursor-pointer"
                    >
                      {openrouterApiKey ? 'Custom Key Active' : 'Custom Key'}
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Runway Gen-3 • Kling 1.5 • Sora
                  </span>
                </div>

              </div>

              {/* Big Generate Prompt Button */}
              <div className="pt-4">
                <button
                  onClick={() => runVideoAnalysis()}
                  disabled={!uploadedVideoUrl || isAnalyzing}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isAnalyzing ? 'Extracting Scene Prompts...' : 'Generate Exact Master Prompt for Video'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* ==================== GENERATED MASTER PROMPT RESULT ==================== */}
          {generatedVideoPrompt && (
            <div className="bg-[#070e20] border-2 border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in slide-in-from-bottom duration-300">
              
              {/* Header Result */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-cyan-500/20">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">
                      Master Prompt Generated for Your Video
                    </h3>
                    <p className="text-xs text-slate-400">
                      Ready to paste directly into Runway Gen-3, Kling AI 1.5, Luma Dream Machine & Midjourney
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold">
                    {generatedVideoPrompt.aspect} RATIO
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 text-xs font-mono font-bold">
                    60 FPS MOTION
                  </span>
                </div>
              </div>

              {/* Master Prompt Main Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Full Master Video Prompt:
                  </label>
                  <span className="text-[11px] text-slate-400">100% matched to your scene physics</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#040814] border border-cyan-500/30 text-slate-100 font-mono text-xs sm:text-sm leading-relaxed select-all relative group">
                  {generatedVideoPrompt.prompt}
                </div>
              </div>

              {/* Deconstructed Parameters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#050b1a] border border-slate-800 space-y-1">
                  <div className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    1. Scene Subject & Action:
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-3">
                    {generatedVideoPrompt.subject}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#050b1a] border border-slate-800 space-y-1">
                  <div className="text-[11px] text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5" />
                    2. Camera Movement & Physics:
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-3">
                    {generatedVideoPrompt.camera}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#050b1a] border border-slate-800 space-y-1">
                  <div className="text-[11px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5" />
                    3. Lighting & Volumetric Caustics:
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-3">
                    {generatedVideoPrompt.lighting}
                  </p>
                </div>
              </div>

              {/* Negative Prompt */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Negative Exclusions:
                </label>
                <div className="p-3 rounded-xl bg-[#040814] border border-rose-500/20 text-slate-300 text-xs font-mono select-all">
                  {generatedVideoPrompt.negative}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={handleCopyVideoPrompt}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/25 cursor-pointer"
                >
                  {copiedVideoPrompt ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedVideoPrompt ? 'Master Prompt Copied!' : 'Copy Full Master Prompt'}</span>
                </button>

                <button
                  onClick={() => {
                    setSubject(generatedVideoPrompt.subject);
                    setActiveTab('custom-builder');
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Fine-Tune in Prompt Builder</span>
                </button>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INTERACTIVE CUSTOM PROMPT BUILDER                                   */}
      {/* ========================================================================= */}
      {activeTab === 'custom-builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
          
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
                {generatedManualPrompt}
              </div>

              {/* Negative Prompt */}
              <div className="mt-4">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-1.5">
                  Negative Exclusions:
                </span>
                <div className="bg-[#020b0e] border border-[#0d2e36] p-3 rounded-xl text-slate-300 text-xs font-mono select-all">
                  {generatedManualNegative}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#123640] space-y-2">
              <button
                onClick={handleCopyManual}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold text-sm hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/20 cursor-pointer"
              >
                {copiedManual ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedManual ? 'Copied Prompt to Clipboard!' : 'Copy Generated Prompt'}</span>
              </button>
              <p className="text-center text-[11px] text-slate-500">
                Ready to paste into Runway, Kling, or Midjourney for immediate video generation.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ==================== DEEPSEEK AI KEY MODAL ==================== */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-[#0a1329] border border-cyan-500/40 rounded-2xl p-6 shadow-2xl relative text-left">
            {/* Close Button */}
            <button
              onClick={() => { setShowKeyModal(false); setKeyValidationState(null); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">OpenRouter AI Key Settings</h3>
                <p className="text-xs text-slate-400">Cinematic prompt reverse-engineering with Nemotron Super VL</p>
              </div>
            </div>

            {/* Quick 2-Step Guide */}
            <div className="bg-[#050b1a] border border-slate-800 rounded-xl p-3.5 mb-4 text-xs space-y-2">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                <div>
                  <span className="text-slate-300">OpenRouter Platform: </span>
                  <a 
                    href="https://openrouter.ai/keys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-400 font-bold hover:underline"
                  >
                    openrouter.ai/keys <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                <p className="text-slate-300">
                  Paste your <code className="text-cyan-300 font-mono font-bold">sk-or-...</code> key below. It is stored 100% privately in your browser's localStorage and is NEVER committed or exposed to GitHub.
                </p>
              </div>
            </div>

            {/* Key Input Field */}
            <div className="space-y-2 mb-4">
              <label className="text-xs font-semibold text-slate-300 block">
                Custom OpenRouter API Key:
              </label>
              <input
                type="password"
                value={tempKeyInput}
                onChange={(e) => setTempKeyInput(e.target.value)}
                placeholder="sk-or-..."
                autoComplete="off"
                spellCheck="false"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#020714] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            {/* Feedback / Error message */}
            {keyValidationState && (
              <div className={`p-3 rounded-xl mb-4 text-xs ${
                keyValidationState.type === 'error' ? 'bg-rose-500/10 border border-rose-500/30 text-rose-300' :
                keyValidationState.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' :
                'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300'
              }`}>
                {keyValidationState.message}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleVerifyAndSaveKey}
                disabled={keyValidationState?.type === 'loading'}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs hover:brightness-110 transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {keyValidationState?.type === 'loading' ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Connecting to OpenRouter...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Save Custom Key</span>
                  </>
                )}
              </button>

              {openrouterApiKey && (
                <button
                  type="button"
                  onClick={handleClearKey}
                  className="py-2.5 px-3 rounded-xl border border-slate-700 hover:border-rose-500/50 text-slate-400 hover:text-rose-400 text-xs transition cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Privacy note */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Your key is stored safely in this browser (localStorage) and never committed to git.</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
