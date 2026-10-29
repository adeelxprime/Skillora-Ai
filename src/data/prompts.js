export const CATEGORIES = [
  { id: 'all', name: 'All Prompts' },
  { id: 'trending', name: 'Trending 🔥' },
  { id: 'nature', name: 'Nature & Wildlife' },
  { id: 'scifi', name: 'Sci-Fi & Cyberpunk' },
  { id: 'cinematic', name: 'Cinematic & Film' },
  { id: 'portrait', name: 'Portraits & People' },
  { id: 'science', name: 'Science & 3D' },
  { id: 'architecture', name: 'Architecture & Spaces' },
  { id: 'commercial', name: 'Commercial & Ads' },
  { id: 'anime', name: 'Anime & Stylized' },
  { id: 'fantasy', name: 'Fantasy & Myth' },
];

export const INITIAL_PROMPTS = [
  // ==================== VIDEO GENERATION PROMPTS ====================
  // 1. Eagle Reunion Engine (Premium #1005060)
  {
    id: 1005060,
    numericId: 5060,
    type: 'video',
    title: 'EAGLE REUNION ENGINE',
    slug: 'eagle-reunion-engine',
    category: 'Nature & Wildlife',
    categoryId: 'nature',
    access: 'premium',
    isTrending: true,
    aspectRatio: '9:16',
    model: 'Kling 1.5 / Runway Gen-3',
    publishedLabel: '21 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    tags: ['Eagles', 'Wildlife', 'Emotional', 'Viral Shorts', '4K Documentary'],
    description: 'A viral storytelling engine designed to generate emotional, cinematic reunions between magnificent golden eagles in misty alpine peaks.',
    storyboards: [
      {
        scene: 1,
        title: 'Dawn Misty Perch',
        description: 'An elder golden eagle sits perched on an ancient pine bough overlooking a foggy canyon at golden hour.',
        imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80'
      },
      {
        scene: 2,
        title: 'Descent through Clouds',
        description: 'A second younger eagle descends gracefully from the mountain clouds with colossal 7-foot wingspan banking left.',
        imageUrl: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?auto=format&fit=crop&w=800&q=80'
      }
    ],
    promptText: `Cinematic wildlife documentary footage of two majestic golden eagles reuniting on a misty alpine mountain peak at sunrise. Extreme photorealistic detail, golden volumetric god rays piercing through cedar pines, morning dew drops visible on feathers. Camera moves smoothly on a 35mm anamorphic gimbal, shallow depth of field, slow-motion 4k 60fps, emotive atmosphere, National Geographic style, warm cinematic color grading --ar 9:16 --v 6.1 --style raw`,
    negativePrompt: `cartoon, lowres, distorted anatomy, duplicate wings, extra heads, blurry background, pixelated, 3d render look`,
    settings: {
      aspectRatio: '9:16 (Vertical Reels / TikTok / Shorts)',
      cameraMotion: 'Smooth Dolly In + Slow Pan Right (Speed: 4.5)',
      fps: '60 FPS Ultra-Smooth',
      seed: '849204917',
      cfgScale: 7.5,
      motionBucket: 127
    },
    workflowGuide: [
      { step: '1. Text-to-Image Base', detail: 'Generate keyframe first frame in Midjourney v6.1 to lock animal anatomy.' },
      { step: '2. Kling / Runway Gen-3', detail: 'Use Kling AI Professional mode with Motion Brush on wings.' }
    ]
  },

  // 2. Tokyo Cyberpunk Rain Drift (FREE VIDEO #1)
  {
    id: 1005072,
    numericId: 5072,
    type: 'video',
    title: 'Tokyo Cyberpunk Rain Drift: Night Neon',
    slug: 'tokyo-cyberpunk-rain-drift',
    category: 'Sci-Fi & Cyberpunk',
    categoryId: 'scifi',
    access: 'free',
    isTrending: true,
    aspectRatio: '16:9',
    model: 'Luma Dream Machine / Kling',
    publishedLabel: '20 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    tags: ['Cyberpunk', 'Tokyo', 'Cars', 'Drift', 'Neon'],
    description: 'Hyper-stylized midnight drift sequence through rain-slicked Shinjuku streets with magenta neon reflections and tire smoke.',
    promptText: `Low-angle tracking shot of a matte black futuristic sports car drifting through wet neon-soaked streets of Neo-Tokyo at 2 AM. Puddle reflections of holographic kanji billboards in magenta and turquoise, smoke billowing from spinning wheels, raindrops streaking across anamorphic camera lens, Blade Runner aesthetic, cinematic lighting, 4k 60fps --ar 16:9 --style raw`,
    negativePrompt: `toy car, unrealistic physics, daytime, sunny, dry road, stuttering motion`,
    settings: {
      aspectRatio: '16:9',
      cameraMotion: 'Low Tracking Pan + Rapid Dynamic Shake',
      fps: '60 FPS',
      seed: '992019284',
      cfgScale: 6.8,
      motionBucket: 140
    }
  },

  // 3. Luxury Liquid Glass Perfume Commercial (FREE VIDEO #2)
  {
    id: 1005088,
    numericId: 5088,
    type: 'video',
    title: 'Luxury Liquid Glass Perfume Commercial',
    slug: 'luxury-liquid-glass-perfume',
    category: 'Commercial & Ads',
    categoryId: 'commercial',
    access: 'free',
    isTrending: true,
    aspectRatio: '9:16',
    model: 'Runway Gen-3 / Sora',
    publishedLabel: '18 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    tags: ['Commercial', 'Luxury', 'Perfume', 'CGI Ads', 'High Fashion'],
    description: 'High-end cosmetics commercial showing a crystal perfume bottle emerging from crystalline rippling rose water and gold dust.',
    promptText: `High-end luxury perfume TV commercial shot, crystalline glass fragrance bottle levitating above liquid crystal ripples, gentle water crown splash in ultra slow-motion 1000fps, floating floating rose petals, soft studio golden rim lighting, caustic reflections, Dior aesthetic, Hasselblad medium format camera --ar 9:16 --style raw`,
    negativePrompt: `cheap bottle, cloudy water, distorted glass, bad typography, low resolution`,
    settings: {
      aspectRatio: '9:16',
      cameraMotion: 'Vertical Slow Rise + 360 Orbit',
      fps: '60 FPS',
      seed: '719284019',
      cfgScale: 7.2,
      motionBucket: 110
    }
  },

  // 4. Arctic Polar Bear Aurora Night (FREE VIDEO #3)
  {
    id: 1005102,
    numericId: 5102,
    type: 'video',
    title: 'Arctic Polar Bear Aurora Borealis Night',
    slug: 'arctic-polar-bear-aurora',
    category: 'Nature & Wildlife',
    categoryId: 'nature',
    access: 'free',
    isTrending: false,
    aspectRatio: '9:16',
    model: 'Kling 1.5 / Luma',
    publishedLabel: '16 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=800&q=80',
    tags: ['Polar Bear', 'Northern Lights', 'Arctic', 'Wildlife', 'Shorts'],
    description: 'Mother polar bear and cub resting beneath vivid undulating green and violet aurora borealis ribbons dancing in the Svalbard night sky.',
    promptText: `Breathtaking National Geographic wildlife footage in the Arctic wilderness, a mother polar bear and her small cub resting atop a glowing blue glacier under dancing vivid green Aurora Borealis ribbons. Emerald reflections on snow crystals, breath condensing into icy fog, starry night sky, hyper-realistic fur detail, cinematic slow panning camera --ar 9:16 --v 6.1`,
    negativePrompt: `zoo cage, fake fur, daylight, blurry aurora, deformed paws`,
    settings: {
      aspectRatio: '9:16',
      cameraMotion: 'Gentle Tilt Up to Aurora',
      fps: '30 FPS',
      seed: '190284712',
      cfgScale: 7.0,
      motionBucket: 80
    }
  },

  // 5. Steampunk Royal Airship Fleet (FREE VIDEO #4)
  {
    id: 1005124,
    numericId: 5124,
    type: 'video',
    title: 'Steampunk Royal Airship Fleet Cloud Voyage',
    slug: 'steampunk-airship-cloud-voyage',
    category: 'Fantasy & Myth',
    categoryId: 'fantasy',
    access: 'free',
    isTrending: false,
    aspectRatio: '16:9',
    model: 'Kling 1.5 / Luma',
    publishedLabel: '13 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    tags: ['Steampunk', 'Airship', 'Clouds', 'Victorian', 'Adventure'],
    description: 'Magnificent armada of brass and mahogany Victorian zeppelin airships cruising through golden sunset sea of clouds.',
    promptText: `Epic cinematic wide aerial shot of a majestic Victorian steampunk airship armada navigating above an endless golden cloud ocean at sundown. Polished copper envelopes, turning mechanical bronze propellers venting white steam plumes, stained glass observation deck glowing warmly, Hayao Miyazaki scale, IMAX 70mm film grain --ar 16:9`,
    negativePrompt: `modern jet, ugly shapes, flat lighting, digital noise, cartoon colors`,
    settings: {
      aspectRatio: '16:9',
      cameraMotion: 'Sweeping Drone Flyby from Deck to Bow',
      fps: '30 FPS',
      seed: '334901824',
      cfgScale: 7.4,
      motionBucket: 90
    }
  },

  // 6. Cybernetic Nano-Surgery in Futuristic Hospital (FREE VIDEO #5)
  {
    id: 1005138,
    numericId: 5138,
    type: 'video',
    title: 'Cybernetic Nano-Surgery in Futuristic Hospital',
    slug: 'cybernetic-nano-surgery-hospital',
    category: 'Sci-Fi & Cyberpunk',
    categoryId: 'scifi',
    access: 'free',
    isTrending: false,
    aspectRatio: '16:9',
    model: 'Luma Dream Machine / Kling',
    publishedLabel: '11 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    tags: ['Medical', 'Cyberpunk', 'Robotics', 'Hospital', 'Sci-Fi'],
    description: 'Robotic surgical arms with optical fiber lasers performing precision microscopic surgery in a clean room cyber hospital.',
    promptText: `Cinematic medical sci-fi sequence, four ultra-precision surgical robotic arms with titanium joints and micro-needles repairing biometric neural cyberware. Soft sterile hospital lighting, floating cyan volumetric HUD telemetry displays, carbon fiber details, Westworld aesthetic, Hasselblad 8k --ar 16:9`,
    negativePrompt: `dirty room, bloody mess, rusty tools, horror gore, distorted hands`,
    settings: {
      aspectRatio: '16:9',
      cameraMotion: 'Slow Circular Orbit Around Operating Table',
      fps: '30 FPS',
      seed: '901847291',
      cfgScale: 7.6,
      motionBucket: 75
    }
  },

  // 7. Neon Cyber City Rain Umbrella Walk (FREE VIDEO #6)
  {
    id: 1005145,
    numericId: 5145,
    type: 'video',
    title: 'Neon Cyber City Transparent Umbrella Walk',
    slug: 'neon-cyber-city-umbrella-walk',
    category: 'Cinematic & Film',
    categoryId: 'cinematic',
    access: 'free',
    isTrending: true,
    aspectRatio: '9:16',
    model: 'Kling 1.5 / Runway Gen-3',
    publishedLabel: '10 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
    tags: ['Cyberpunk', 'Rain', 'Umbrella', 'Reels', 'Cinematic'],
    description: 'Cinematic slow-motion tracking shot of an Asian woman in techwear holding a glowing clear vinyl umbrella through downpour in Hong Kong.',
    promptText: `Cinematic 4k slow-motion 60fps tracking shot following an elegant woman walking through a rainy neon-lit alleyway in cyberpunk Hong Kong. Clear holographic umbrella reflecting pink and cyan neon signs, rain droplets streaming down the dome, wet asphalt puddle reflections, cinematic color grading, shallow depth of field --ar 9:16`,
    negativePrompt: `daylight, cartoon, 3d render, blurry, distorted face, bad anatomy`,
    settings: {
      aspectRatio: '9:16',
      cameraMotion: 'Smooth Steadicam Reverse Track at Eye Level',
      fps: '60 FPS',
      seed: '619284019',
      cfgScale: 7.0,
      motionBucket: 85
    }
  },

  // 8. Hyper-Realistic Espresso Extraction Slow-Mo (FREE VIDEO #7)
  {
    id: 1005152,
    numericId: 5152,
    type: 'video',
    title: 'Artisan Espresso Extraction 1000fps Macro Commercial',
    slug: 'artisan-espresso-extraction-macro',
    category: 'Commercial & Ads',
    categoryId: 'commercial',
    access: 'free',
    isTrending: true,
    aspectRatio: '9:16',
    model: 'Runway Gen-3 Alpha',
    publishedLabel: '9 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    tags: ['Coffee', 'Macro', 'Commercial', 'Slow Motion', 'Food'],
    description: 'Phantom Flex 4k commercial shot showing rich golden crema espresso extracting from a bottomless portafilter into a crystal glass.',
    promptText: `Commercial TV advertisement, extreme macro close-up of a bottomless espresso portafilter pulling a rich dark golden crema shot in 1000fps slow-motion. Thick syrupy honey-like streams merging together into a glass cup, gentle steam rising, soft studio rim lighting, Hasselblad medium format sharpness --ar 9:16`,
    negativePrompt: `watery coffee, dirty machine, lowres, shaky camera, dark lighting`,
    settings: {
      aspectRatio: '9:16',
      cameraMotion: 'Subtle Macro Tilt Down',
      fps: '120 FPS High Speed',
      seed: '448102938',
      cfgScale: 7.2,
      motionBucket: 70
    }
  },

  // 9. Golden Retriever Puppy Sunset Beach Run (FREE VIDEO #8)
  {
    id: 1005160,
    numericId: 5160,
    type: 'video',
    title: 'Golden Retriever Puppy Sunset Beach Ocean Run',
    slug: 'golden-retriever-puppy-beach-run',
    category: 'Nature & Wildlife',
    categoryId: 'nature',
    access: 'free',
    isTrending: true,
    aspectRatio: '9:16',
    model: 'Kling 1.5 / Luma',
    publishedLabel: '8 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    tags: ['Puppy', 'Dogs', 'Beach', 'Sunset', 'Viral Shorts'],
    description: 'Heartwarming 60fps slow-motion clip of an adorable golden retriever puppy happily sprinting along ocean waves at sunset.',
    promptText: `Heartwarming slow motion 60fps footage of an adorable fluffy 3-month-old golden retriever puppy joyfully galloping along the wet sand shoreline at California sunset. Golden fur blowing in ocean breeze, joyful eyes, tiny water splashes sparkling in sunlight, warm lens flare, photorealistic cinematic documentary style --ar 9:16 --v 6.1`,
    negativePrompt: `fake dog, distorted paws, duplicate legs, low resolution, ugly face`,
    settings: {
      aspectRatio: '9:16',
      cameraMotion: 'Low Angle Tracking Gimbal Moving Backwards',
      fps: '60 FPS',
      seed: '819203948',
      cfgScale: 7.0,
      motionBucket: 95
    }
  },

  // 10. Dune Desert Sandstorm Ornithopter Flight (FREE VIDEO #9)
  {
    id: 1005168,
    numericId: 5168,
    type: 'video',
    title: 'Dune Desert Sandstorm Ornithopter Flight',
    slug: 'dune-desert-ornithopter-flight',
    category: 'Sci-Fi & Cyberpunk',
    categoryId: 'scifi',
    access: 'free',
    isTrending: false,
    aspectRatio: '16:9',
    model: 'Runway Gen-3 / Kling',
    publishedLabel: '7 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    tags: ['Dune', 'Desert', 'Sci-Fi', 'Ornithopter', 'Cinema'],
    description: 'Epic cinematic scene of a dragonfly-winged ornithopter aircraft diving between colossal Saharan sand dunes in a sunset dust storm.',
    promptText: `Cinematic sci-fi movie scene inspired by Dune, a military dragonfly ornithopter with rapidly beating mechanical wings banking sharply around a giant desert sand dune. Roaring sandstorm vortex swirling in orange atmospheric sunlight, heat distortion ripples, IMAX 70mm cinematography, Hans Zimmer tone, 8k --ar 16:9`,
    negativePrompt: `cartoon helicopter, modern jet, blurry sand, cheap CGI, low quality`,
    settings: {
      aspectRatio: '16:9',
      cameraMotion: 'Aerial Chase Cam Following Aircraft Bank',
      fps: '30 FPS',
      seed: '501928471',
      cfgScale: 7.8,
      motionBucket: 115
    }
  },

  // 11. Macro Honeycomb Dripping Liquid Amber (FREE VIDEO #10)
  {
    id: 1005175,
    numericId: 5175,
    type: 'video',
    title: 'Golden Honeycomb Pure Dripping Honey Macro',
    slug: 'golden-honeycomb-dripping-macro',
    category: 'Science & 3D',
    categoryId: 'science',
    access: 'free',
    isTrending: true,
    aspectRatio: '9:16',
    model: 'Runway Gen-3 / Midjourney',
    publishedLabel: '6 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    tags: ['Honey', 'Macro', 'Satisfying', 'Food', 'ASMR'],
    description: 'Hypnotic ASMR slow-motion macro shot of thick pure organic golden honey oozing from beeswax honeycomb cells.',
    promptText: `Ultra-high-definition macro 1000fps slow-motion capture of viscous raw golden organic honey dripping from raw hexagonal beeswax honeycomb. Liquid amber transparency with tiny air bubbles suspended inside, warm sunlight glinting off glistening honey threads, National Geographic nature photography, 8k resolution --ar 9:16`,
    negativePrompt: `dirty honey, cloudy liquid, flat lighting, digital noise, cartoon textures`,
    settings: {
      aspectRatio: '9:16',
      cameraMotion: 'Extreme Macro Slow Pan Downwards',
      fps: '60 FPS',
      seed: '301984719',
      cfgScale: 7.0,
      motionBucket: 60
    }
  },

  // Premium Video: 3D Human Body Microscopic Cell Discovery
  {
    id: 1005066,
    numericId: 5066,
    type: 'video',
    title: '3D Human Body Microscopic Cell Discovery',
    slug: '3d-human-body-microscopic',
    category: 'Science & 3D',
    categoryId: 'science',
    access: 'premium',
    isTrending: true,
    aspectRatio: '9:16',
    model: 'Runway Gen-3 / Midjourney',
    publishedLabel: '22 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    tags: ['Microbiology', '3D Medical', 'Nanotech', 'Explainer', 'Educational'],
    description: 'Ultra-high detail 3D medical animation showing microscopic nanobots healing human heart tissue at cellular level.',
    promptText: `Medical 3D animation, macro close-up inside human vascular system, glowing microscopic nanorobots repairing cellular membrane with cyan laser filaments. Volumetric fluid dynamics, deep biological translucency, Octane render, unreal engine 5.4, chromatic aberration, medical science journal cover aesthetic, 8k resolution --ar 9:16`,
    negativePrompt: `low quality, messy blood, inaccurate anatomy, flat textures, clay look`,
    settings: {
      aspectRatio: '9:16',
      cameraMotion: 'Continuous Macro Zoom In + Circular Rotation',
      fps: '30 FPS',
      seed: '448201948',
      cfgScale: 8.0,
      motionBucket: 90
    }
  },

  // ==================== IMAGE GENERATION PROMPTS ====================
  // 12. Himalayan Master Woodcarver (FREE IMAGE #1)
  {
    id: 2001010,
    numericId: 1010,
    type: 'image',
    title: 'Himalayan Elderly Master Woodcarver 85mm Portrait',
    slug: 'himalayan-master-woodcarver-portrait',
    category: 'Portraits & People',
    categoryId: 'portrait',
    access: 'free',
    isTrending: true,
    aspectRatio: '4:5',
    model: 'Midjourney v6.1 / Flux.1 Pro',
    publishedLabel: '21 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    tags: ['Portrait', 'Photorealism', 'Himalayas', 'Craftsman', '85mm'],
    description: 'Hyper-detailed National Geographic portrait of an 80-year-old Tibetan woodcarver with weathered wrinkles and silver beard.',
    promptText: `An intimate close-up portrait of an 82-year-old Tibetan master woodcarver in Ladakh. Deep dignified facial wrinkles, wise laughing hazel eyes, silver braided beard, wearing weathered yak wool tunic dusted with fine cedar shavings. Holding an antique steel carving gouge. Soft natural window sidelight inside a rustic wooden workshop, cedar wood chips scattered on table, shallow depth of field, shot on Sony A7R V with 85mm f/1.2 GM lens, photorealistic skin pores, National Geographic cover masterwork --ar 4:5 --v 6.1 --style raw`,
    negativePrompt: `plastic skin, airbrushed, cartoon, oversaturated, deformed hands, extra fingers`,
    settings: {
      aspectRatio: '4:5 (Instagram / Fine Art Print)',
      recommendedModel: 'Midjourney v6.1 (--style raw) or Flux.1 Pro',
      guidanceScale: '3.5 (Flux) / Stylize 250 (Midjourney)',
      sampler: 'Euler / DPM++ 2M Karras'
    }
  },

  // 13. Vintage 1962 Havana Street Leica (FREE IMAGE #2)
  {
    id: 2001040,
    numericId: 1040,
    type: 'image',
    title: 'Vintage 1962 Havana Street Leica M3 Photography',
    slug: 'vintage-havana-leica-photography',
    category: 'Cinematic & Film',
    categoryId: 'cinematic',
    access: 'free',
    isTrending: true,
    aspectRatio: '3:2',
    model: 'Flux.1 Dev / Midjourney',
    publishedLabel: '18 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tags: ['Vintage', 'Street Photography', 'Havana', 'Leica M3', '1960s'],
    description: 'Authentic 1960s Kodachrome street photograph in Havana Cuba with classic pastel pink Chevrolet and historic colonial balconies.',
    promptText: `Street photography in Old Havana Cuba 1962, a mint pastel pink vintage 1957 Chevrolet Bel Air parked along cobblestone alley beneath decaying Spanish colonial balconies with vibrant bougainvillea flowers. Golden tropical afternoon sun casting long diagonal shadows, warm Kodak Kodachrome 64 film stock grain, rich color saturation, authentic vintage texture, shot on Leica M3 with Summicron 50mm f/2 lens, Vivian Maier documentary style --ar 3:2 --style raw`,
    negativePrompt: `modern cars, smartphones, modern clothing, oversaturated HDR, digital look`,
    settings: {
      aspectRatio: '3:2 (Classic 35mm Film Frame)',
      recommendedModel: 'Flux.1 Dev / Midjourney v6.1',
      guidanceScale: '3.5',
      sampler: 'Euler A'
    }
  },

  // 14. Cybernetic Geisha Chrome Mask (FREE IMAGE #3)
  {
    id: 2001060,
    numericId: 1060,
    type: 'image',
    title: 'Cybernetic Geisha with Chrome Ceramic Mask',
    slug: 'cybernetic-geisha-chrome-mask',
    category: 'Sci-Fi & Cyberpunk',
    categoryId: 'scifi',
    access: 'free',
    isTrending: true,
    aspectRatio: '9:16',
    model: 'Midjourney v6.1 / Flux.1',
    publishedLabel: '16 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    tags: ['Cyberpunk', 'Geisha', 'Chrome', 'Fashion', 'Futuristic'],
    description: 'Avant-garde futuristic haute couture portrait of a Japanese cyber geisha with polished white porcelain and mirrored chrome face plates.',
    promptText: `Haute couture high-fashion portrait of an elegant futuristic cybernetic geisha. Half of face covered in polished white lacquer porcelain with gold kintsugi seams, the other half exposed chrome titanium mechanics and glowing fiber-optic hair pins. Traditional silk kimono embroidered with neon circuit board patterns, moody dark studio portrait, soft cyan and crimson rim light, shot on Canon 1D X Mark III, 100mm macro lens, 8k --ar 9:16 --v 6.1`,
    negativePrompt: `ugly, blurry, bad anatomy, deformed eyes, amateur cosplay, anime 2d`,
    settings: {
      aspectRatio: '9:16',
      recommendedModel: 'Midjourney v6.1',
      guidanceScale: 'Stylize 200',
      sampler: 'DPM++ 2M'
    }
  },

  // 15. Michelin Truffle Wagyu Steak Plating (FREE IMAGE #4)
  {
    id: 2001080,
    numericId: 1080,
    type: 'image',
    title: 'Michelin-Star Truffle Wagyu Steak Plating',
    slug: 'michelin-truffle-wagyu-steak',
    category: 'Commercial & Ads',
    categoryId: 'commercial',
    access: 'free',
    isTrending: false,
    aspectRatio: '4:5',
    model: 'Midjourney v6.1',
    publishedLabel: '14 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    tags: ['Food Photography', 'Gourmet', 'Wagyu', 'Michelin', 'Editorial'],
    description: 'Gastronomy food editorial photograph of seared A5 Miyazaki Wagyu beef steak with shaved black Perigord truffles.',
    promptText: `Michelin 3-star culinary food editorial photograph, perfectly seared rare A5 Miyazaki Wagyu beef medallion sliced to reveal marbling, garnished with fresh shaved black Perigord winter truffles, glossy bone marrow demi-glace drizzle, micro-greens, coarse smoked sea salt crystals. Plated on a dark hand-thrown textured slate dish, moody restaurant spotlighting, shallow depth of field, Bon Appétit magazine cover quality, shot on Hasselblad H6D-100c --ar 4:5 --style raw`,
    negativePrompt: `burnt meat, messy plate, greasy, unappetizing, flat lighting`,
    settings: {
      aspectRatio: '4:5',
      recommendedModel: 'Midjourney v6.1 (--style raw)',
      guidanceScale: 'Stylize 150',
      sampler: 'Default'
    }
  },

  // 16. Retro 1984 Synthwave DeLorean (FREE IMAGE #5)
  {
    id: 2001090,
    numericId: 1090,
    type: 'image',
    title: 'Retro 1984 Synthwave DeLorean at Sunset Grid',
    slug: 'retro-synthwave-delorean-sunset',
    category: 'Sci-Fi & Cyberpunk',
    categoryId: 'scifi',
    access: 'free',
    isTrending: true,
    aspectRatio: '16:9',
    model: 'Flux.1 Dev / Midjourney',
    publishedLabel: '13 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    tags: ['Outrun', 'Synthwave', 'DeLorean', 'Retro', 'Neon Grid'],
    description: 'Brushed stainless steel DeLorean parked on an infinite glowing digital grid road facing an enormous low-poly magenta sunset.',
    promptText: `Classic 1980s synthwave aesthetic, brushed stainless steel DeLorean DMC-12 sports car rear three-quarter view parked on reflective wet purple grid highway. Enormous glowing striped neon sunset on horizon in cadmium orange and magenta, wireframe mountains, cyan grid lines stretching into vanishing point, nostalgic VHS film grain texture, Outrun album cover artwork, 8k resolution --ar 16:9`,
    negativePrompt: `modern supercar, daylight, muddy colors, low resolution, bad car shape`,
    settings: {
      aspectRatio: '16:9',
      recommendedModel: 'Flux.1 Dev',
      guidanceScale: '4.0',
      sampler: 'Euler A'
    }
  },

  // 17. Water Droplet Refracting Milky Way (FREE IMAGE #6)
  {
    id: 2001120,
    numericId: 1120,
    type: 'image',
    title: 'Water Droplet Refracting Milky Way Galaxy Macro',
    slug: 'water-droplet-milky-way-macro',
    category: 'Science & 3D',
    categoryId: 'science',
    access: 'free',
    isTrending: true,
    aspectRatio: '1:1',
    model: 'Flux.1 Pro / Midjourney',
    publishedLabel: '10 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    tags: ['Macro', 'Water Drop', 'Milky Way', 'Cosmic', 'Physics'],
    description: 'A single crystal-clear water droplet suspended on a dandelion seed, acting as a natural optical lens refracting the spiral galaxy.',
    promptText: `Extreme macro photograph of a single perfect spherical water droplet suspended from the tip of a fine dandelion pappus seed. Inside the droplet, the entire spiral Milky Way galaxy is inverted and crisply refracted in astronomical detail with billions of stars and magenta nebula dust. Deep velvety black space background, soft rim lighting on water meniscus, Canon MP-E 65mm 5:1 macro lens, focus stacked 50 shots, ultra-sharp scientific photography --ar 1:1 --style raw`,
    negativePrompt: `blurry droplet, dirty water, noisy background, artificial glitter, lowres`,
    settings: {
      aspectRatio: '1:1',
      recommendedModel: 'Flux.1 Pro / Midjourney v6.1',
      guidanceScale: '3.0',
      sampler: 'Euler'
    }
  },

  // 18. Japanese Zen Rock Garden Autumn Fog (FREE IMAGE #7)
  {
    id: 2001130,
    numericId: 1130,
    type: 'image',
    title: 'Kyoto Zen Rock Garden Autumn Morning Fog',
    slug: 'kyoto-zen-rock-garden-autumn',
    category: 'Architecture & Spaces',
    categoryId: 'architecture',
    access: 'free',
    isTrending: false,
    aspectRatio: '16:9',
    model: 'Midjourney v6.1 / Flux.1',
    publishedLabel: '9 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    tags: ['Japan', 'Zen', 'Garden', 'Architecture', 'Peaceful'],
    description: 'Tranquil Japanese temple dry rock garden in Kyoto with raked white gravel circles, moss boulders, and falling red maple leaves in morning mist.',
    promptText: `Peaceful Japanese dry rock Karesansui Zen garden in a 14th-century Kyoto temple at sunrise. Concentric ripples raked into pristine white gravel around moss-covered volcanic boulders, scarlet Japanese maple leaves resting gently on gravel, ethereal morning fog weaving through cedar temple veranda, Hasselblad X2D 100C, natural diffused light --ar 16:9 --style raw`,
    negativePrompt: `people, tourists, plastic, bright modern objects, cartoon, low resolution`,
    settings: {
      aspectRatio: '16:9',
      recommendedModel: 'Midjourney v6.1',
      guidanceScale: 'Stylize 180',
      sampler: 'Default'
    }
  },

  // 19. Cyberpunk Street Food Night Vendor (FREE IMAGE #8)
  {
    id: 2001140,
    numericId: 1140,
    type: 'image',
    title: 'Cyberpunk Ramen Street Food Night Vendor',
    slug: 'cyberpunk-ramen-street-vendor',
    category: 'Sci-Fi & Cyberpunk',
    categoryId: 'scifi',
    access: 'free',
    isTrending: true,
    aspectRatio: '4:5',
    model: 'Flux.1 Dev / Midjourney',
    publishedLabel: '8 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    tags: ['Cyberpunk', 'Ramen', 'Street Food', 'Neon', 'Cinematic'],
    description: 'An atmospheric night photography shot of a crowded cyber street ramen cart with glowing neon signs and piping hot broth steam.',
    promptText: `Night street photography of a tiny open-air ramen stall in futuristic Neo-Seoul. A chef with cybernetic mechanical forearms serving a steaming bowl of spicy tonkotsu ramen with soft-boiled egg and nori, thick aromatic steam illuminated by vertical holographic Korean signage in red and turquoise, rain puddle reflections on wet asphalt, shot on 35mm f/1.4 lens, cinematic mood --ar 4:5`,
    negativePrompt: `blurry, messy face, oversaturated cartoon, flat lighting, digital noise`,
    settings: {
      aspectRatio: '4:5',
      recommendedModel: 'Flux.1 Dev',
      guidanceScale: '3.5',
      sampler: 'DPM++ 2M'
    }
  },

  // 20. Golden Hour Moroccan Riad Architecture (FREE IMAGE #9)
  {
    id: 2001150,
    numericId: 1150,
    type: 'image',
    title: 'Moroccan Oasis Riad Courtyard & Turquoise Pool',
    slug: 'moroccan-oasis-riad-courtyard',
    category: 'Architecture & Spaces',
    categoryId: 'architecture',
    access: 'free',
    isTrending: false,
    aspectRatio: '4:5',
    model: 'Midjourney v6.1',
    publishedLabel: '7 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    tags: ['Morocco', 'Riad', 'Architecture', 'Interior', 'Luxury'],
    description: 'A breathtaking Marrakech palace courtyard with emerald zellige mosaic tiles, banana palms, and crystal turquoise plunge pool.',
    promptText: `Architectural Digest photography, a secluded luxury traditional riad courtyard in Marrakech at golden hour. Hand-carved plaster arches, intricate cobalt blue and emerald green zellige mosaic tilework, tranquil turquoise reflection pool scattered with floating fresh jasmine petals, giant banana palm trees, sunbeams streaming down central skylight, interior design masterpiece, shot on Leica SL2 --ar 4:5 --style raw`,
    negativePrompt: `crooked walls, blurry tiles, distorted arches, messy pool, cheap plastic`,
    settings: {
      aspectRatio: '4:5',
      recommendedModel: 'Midjourney v6.1',
      guidanceScale: 'Stylize 200',
      sampler: 'Default'
    }
  },

  // 21. Minimalist Matte Black Wireless Headphones (FREE IMAGE #10)
  {
    id: 2001160,
    numericId: 1160,
    type: 'image',
    title: 'Minimalist Matte Black Wireless Audio Studio Shot',
    slug: 'minimalist-matte-black-headphones',
    category: 'Commercial & Ads',
    categoryId: 'commercial',
    access: 'free',
    isTrending: true,
    aspectRatio: '1:1',
    model: 'Flux.1 Pro / Midjourney',
    publishedLabel: '6 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    tags: ['Product Design', 'Commercial', 'Audio', 'Headphones', 'Minimalism'],
    description: 'Clean Apple/Bang & Olufsen style commercial product shot of luxury matte black wireless over-ear headphones floating against stone.',
    promptText: `Commercial product advertising photograph, sleek ultra-premium matte black over-ear wireless headphones with brushed titanium earcups and soft Italian memory foam leather pads levitating above a dark textured slate plinth. Subtle three-point softbox studio rim lighting accentuating clean industrial curves, pure commercial aesthetic, Hasselblad H6D-100c, crystal clarity --ar 1:1 --style raw`,
    negativePrompt: `cheap plastic, scratches, dust, fingerprints, messy wire, lowres`,
    settings: {
      aspectRatio: '1:1',
      recommendedModel: 'Flux.1 Pro',
      guidanceScale: '3.0',
      sampler: 'Euler'
    }
  },

  // Premium Image: Nordic Glass Cantilever Cliff Villa
  {
    id: 2001020,
    numericId: 1020,
    type: 'image',
    title: 'Nordic Glass Cantilever Cliff Villa in Fjord',
    slug: 'nordic-glass-cliff-villa',
    category: 'Architecture & Spaces',
    categoryId: 'architecture',
    access: 'premium',
    isTrending: true,
    aspectRatio: '16:9',
    model: 'Flux.1 Pro / Midjourney',
    publishedLabel: '20 Oct 2026',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tags: ['Architecture', 'Nordic', 'Luxury Villa', 'Fjord', 'Modernist'],
    description: 'Ultra-modern glass and charred timber cantilever villa perched dramatically over a misty Norwegian fjord at twilight.',
    promptText: `Architectural digest photography, a modern luxury glass and black charred Yakisugi cedar wood villa cantilevered over a dramatic sheer cliff above Geirangerfjord Norway. Huge floor-to-ceiling illuminated glass walls showing minimalist warm Scandinavian interior with fireplace, reflection on infinity pool, misty pine mountains in dusk background, architectural photography, shot on tilt-shift 24mm lens, golden warm interior against cool blue twilight exterior --ar 16:9 --style raw`,
    negativePrompt: `distorted geometry, crooked lines, messy architecture, cartoon textures`,
    settings: {
      aspectRatio: '16:9',
      recommendedModel: 'Flux.1 Pro / Midjourney v6.1',
      guidanceScale: '3.0',
      sampler: 'DPM++ SDE'
    }
  },

  // 12. Cyberpunk Ronin Assassin in Shinjuku Rain (FREE IMAGE)
  {
    id: 2001021,
    numericId: 1021,
    type: 'image',
    title: 'Cyberpunk Ronin Assassin in Shinjuku Rain',
    slug: 'cyberpunk-ronin-assassin-shinjuku',
    category: 'Sci-Fi & Cyberpunk',
    categoryId: 'scifi',
    access: 'free',
    isTrending: true,
    aspectRatio: '4:5',
    model: 'Midjourney v6.1 / Flux.1',
    publishedLabel: 'Just now',
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    tags: ['Cyberpunk', 'Ronin', 'Samurai', 'Rain', 'Neon', 'Katana'],
    description: 'Hyper-detailed futuristic cyber-samurai standing under torrential rain in Neo-Shinjuku with glowing turquoise neon katana and holographic visor reflections.',
    promptText: `Full-body cinematic portrait of a cybernetic ronin assassin standing on wet asphalt in a rainy Neo-Tokyo alleyway at midnight. Matte carbon-fiber armor with glowing turquoise fiber optics, translucent raincoat with realistic water droplets, holding an illuminated cyan energy katana. Chiaroscuro lighting, neon holographic signs reflecting in puddles, steam rising from sewer grates, anamorphic 85mm f/1.4 lens, hyper-realistic skin texture, Blade Runner aesthetic --ar 4:5 --v 6.1 --style raw`,
    negativePrompt: `cartoon, anime drawing, low quality, bad anatomy, deformed fingers, blurry, oversaturated`,
    settings: {
      aspectRatio: '4:5',
      recommendedModel: 'Midjourney v6.1 / Flux.1 Pro',
      guidanceScale: '3.5',
      sampler: 'Euler A'
    }
  },

  // 13. Bioluminescent Abyssal Jellyfish Galaxy Cavern (FREE IMAGE)
  {
    id: 2001022,
    numericId: 1022,
    type: 'image',
    title: 'Bioluminescent Abyssal Jellyfish Galaxy Cavern',
    slug: 'bioluminescent-jellyfish-galaxy-cavern',
    category: 'Nature & Wildlife',
    categoryId: 'nature',
    access: 'free',
    isTrending: true,
    aspectRatio: '16:9',
    model: 'Midjourney v6.1',
    publishedLabel: 'Just now',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    tags: ['Deep Sea', 'Bioluminescence', 'Jellyfish', 'Nature', 'Underwater'],
    description: 'Mesmerizing ethereal underwater photography of giant glowing translucent jellyfish illuminating a submerged crystalline cavern with cyan and violet light.',
    promptText: `National Geographic underwater macro photography, giant translucent deep-sea bell jellyfish pulsating through an ancient submerged crystal cavern. Bioluminescent internal organs glowing in neon cyan and soft violet, delicate trailing tentacles with sparkling caustics, volumetric god rays piercing from surface through crystal-clear dark water, extreme micro-detail, shot on Sony A1 in Nauticam underwater housing --ar 16:9 --v 6.1 --style raw`,
    negativePrompt: `lowres, murky water, plastic look, blurry, distorted tentacles, cartoon`,
    settings: {
      aspectRatio: '16:9',
      recommendedModel: 'Midjourney v6.1',
      guidanceScale: '4.0',
      sampler: 'DPM++ 2M'
    }
  },

  // 14. Vogue Haute Couture Baroque Empress in Gilded Palace (PREMIUM IMAGE)
  {
    id: 2001023,
    numericId: 1023,
    type: 'image',
    title: 'Vogue Haute Couture Baroque Empress in Gilded Palace',
    slug: 'vogue-haute-couture-baroque-empress',
    category: 'Portraits & People',
    categoryId: 'portrait',
    access: 'premium',
    isTrending: true,
    aspectRatio: '4:5',
    model: 'Flux.1 Pro / Midjourney',
    publishedLabel: 'Just now',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    tags: ['Fashion', 'Vogue', 'Baroque', 'Editorial', 'Portrait', 'Luxury'],
    description: 'High-fashion editorial portrait of an aristocratic model wearing an extravagant golden filigree gown inside a grand Versailles hall with soft window daylight.',
    promptText: `High-fashion editorial cover shot for Vogue Italia, an elegant high-fashion model posing in a grand Parisian baroque ballroom. Wearing a handcrafted gown made of heavy black silk velvet embroidered with 24k gold filigree lace, pearl headpiece, natural skin texture with subtle freckles, soft north-facing window light, chiaroscuro shadows, Hasselblad H6D-100c, 100mm f/2.2 portrait lens, master composition --ar 4:5 --v 6.1 --style raw`,
    negativePrompt: `smooth airbrushed skin, plastic doll look, cartoon, bad eyes, extra fingers, low resolution`,
    settings: {
      aspectRatio: '4:5',
      recommendedModel: 'Flux.1 Pro',
      guidanceScale: '3.2',
      sampler: 'DPM++ SDE'
    }
  },

  // 15. 1970s Monaco Rainy Formula 1 Vintage Grand Prix Pitstop (FREE IMAGE)
  {
    id: 2001024,
    numericId: 1024,
    type: 'image',
    title: '1970s Monaco Rainy Formula 1 Vintage Grand Prix Pitstop',
    slug: '1970s-monaco-rainy-formula-1-grand-prix',
    category: 'Cinematic & Film',
    categoryId: 'cinematic',
    access: 'free',
    isTrending: false,
    aspectRatio: '16:9',
    model: 'Midjourney v6.1',
    publishedLabel: 'Just now',
    coverImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
    tags: ['Motorsport', 'Vintage', '1970s', 'Formula 1', 'Cinematic', 'Rain'],
    description: 'Archival 1970s 35mm film photography of a classic scarlet red racecar making a frantic pitstop during a rainstorm at Monaco harbor.',
    promptText: `Archival 35mm Kodachrome documentary film still of a classic 1974 scarlet red Formula 1 racecar undergoing a pitstop in the pouring rain at Monaco harbor. Mechanics in vintage drenched racing overalls changing wet tires, tire smoke blending with rain spray, harbor yachts in misty bokeh background, authentic 1970s grain, rich warm analog colors, shot on Leica M3 with 50mm Summicron --ar 16:9 --v 6.1 --style raw`,
    negativePrompt: `modern digital look, 3d render, oversaturated, clean glossy cartoon, fake grain`,
    settings: {
      aspectRatio: '16:9',
      recommendedModel: 'Midjourney v6.1',
      guidanceScale: '4.5',
      sampler: 'Euler'
    }
  },

  // 16. Skeleton Tourbillon Watch Suspended in Liquid Gold Caustics (PREMIUM IMAGE)
  {
    id: 2001025,
    numericId: 1025,
    type: 'image',
    title: 'Skeleton Tourbillon Watch Suspended in Liquid Gold Caustics',
    slug: 'skeleton-tourbillon-watch-liquid-gold',
    category: 'Commercial & Ads',
    categoryId: 'commercial',
    access: 'premium',
    isTrending: true,
    aspectRatio: '1:1',
    model: 'Flux.1 Pro / Octane',
    publishedLabel: 'Just now',
    coverImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    tags: ['Luxury Watch', 'Product Photography', 'Commercial', 'Gold', 'Macro'],
    description: 'Exquisite commercial product studio photography of a titanium skeleton tourbillon timepiece suspended over dark water with ripples and liquid gold caustics.',
    promptText: `Luxury commercial product advertisement shot, an ultra-luxury open-worked skeleton tourbillon mechanical watch floating mid-air above dark reflective mineral water. Molten gold liquid splashes and caustic light patterns reflecting off polished bevelled sapphire crystal and ruby bearings, crystalline studio lighting, micro macro detail, 8k resolution, Hasselblad medium format commercial clarity --ar 1:1 --v 6.1 --style raw`,
    negativePrompt: `cheap look, blurry, fingerprints, scratches, distorted numbers, low contrast`,
    settings: {
      aspectRatio: '1:1',
      recommendedModel: 'Flux.1 Pro / Midjourney',
      guidanceScale: '3.0',
      sampler: 'DPM++ 2M'
    }
  },

  // 17. Studio Ghibli Meadow Castle & Giant Twilight Clouds (FREE IMAGE)
  {
    id: 2001026,
    numericId: 1026,
    type: 'image',
    title: 'Studio Ghibli Meadow Castle & Giant Twilight Clouds',
    slug: 'ghibli-meadow-castle-twilight-clouds',
    category: 'Anime & Stylized',
    categoryId: 'anime',
    access: 'free',
    isTrending: true,
    aspectRatio: '16:9',
    model: 'Midjourney v6.1 (Niji 6)',
    publishedLabel: 'Just now',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    tags: ['Anime', 'Ghibli', 'Miyazaki', 'Fantasy Castle', 'Meadow', 'Clouds'],
    description: 'Enchanting Studio Ghibli style painterly anime landscape of a quaint stone clocktower castle in rolling wildflower hills under towering cumulus sunset clouds.',
    promptText: `Hayao Miyazaki and Makoto Shinkai anime landscape masterpiece, an ancient stone clocktower castle nestled in vast rolling emerald green wildflower hills. Colossal fluffy cumulus clouds illuminated by pink and golden hour sunset light, a gentle breeze rustling fields of poppies, painterly gouache and watercolor texture, nostalgic emotional atmosphere, high aesthetic hand-drawn anime cel art --ar 16:9 --v 6.1 --style raw`,
    negativePrompt: `3d render, CGI plastic, photorealistic photo, dark, gloomy, messy lines`,
    settings: {
      aspectRatio: '16:9',
      recommendedModel: 'Midjourney v6.1 / Niji 6',
      guidanceScale: '5.0',
      sampler: 'Euler A'
    }
  },

  // 18. Glowing Neural Network Synapse 3D Biocellular Macro (FREE IMAGE)
  {
    id: 2001027,
    numericId: 1027,
    type: 'image',
    title: 'Glowing Neural Network Synapse 3D Biocellular Macro',
    slug: 'glowing-neural-network-synapse-3d',
    category: 'Science & 3D',
    categoryId: 'science',
    access: 'free',
    isTrending: false,
    aspectRatio: '1:1',
    model: 'Midjourney v6.1',
    publishedLabel: 'Just now',
    coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    tags: ['Science', 'Brain', 'Neurons', '3D Medical', 'Macro', 'Bioluminescent'],
    description: 'Ultra-high-definition 3D medical science visualization of human brain neurons firing electrical impulses across glowing blue and amber synaptic pathways.',
    promptText: `Medical scientific 3D illustration, extreme electron microscope macro shot of interconnected human brain neurons and synapses. Luminescent electrical neurotransmitter signals sparking in electric cyan and amber across microscopic dendritic trees, translucent cell membranes with subsurface scattering, dark depth of field background, Octane render 5.0, photorealistic science journal cover --ar 1:1 --v 6.1 --style raw`,
    negativePrompt: `cartoon, flat colors, low resolution, inaccurate anatomy, pixelated, noise`,
    settings: {
      aspectRatio: '1:1',
      recommendedModel: 'Midjourney v6.1 / Octane',
      guidanceScale: '4.2',
      sampler: 'DPM++ SDE'
    }
  },

  // 19. Golden Phoenix on Volcanic Obsidian Peak at Dawn (PREMIUM IMAGE)
  {
    id: 2001028,
    numericId: 1028,
    type: 'image',
    title: 'Golden Phoenix on Volcanic Obsidian Peak at Dawn',
    slug: 'golden-phoenix-volcanic-obsidian-peak',
    category: 'Fantasy & Myth',
    categoryId: 'fantasy',
    access: 'premium',
    isTrending: true,
    aspectRatio: '4:5',
    model: 'Flux.1 Pro / Midjourney',
    publishedLabel: 'Just now',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    tags: ['Phoenix', 'Fantasy', 'Mythology', 'Volcano', 'Fire', 'Feathers'],
    description: 'Majestic mythological phoenix bird with luminous ember-tipped golden feathers perched atop a jagged black volcanic obsidian ridge overlooking glowing lava canyons.',
    promptText: `Mythological dark fantasy photography, a magnificent immortal golden phoenix perched atop a sharp black volcanic glass obsidian mountain at sunrise. Intricate iridescent feathers glowing with embers and radiant heat trails, ruby red eyes, molten lava veins glowing in the deep foggy canyon below, cinematic volumetric sunrise rim light, shot on medium format 85mm lens, National Geographic fantasy edition --ar 4:5 --v 6.1 --style raw`,
    negativePrompt: `chicken, deformed wings, cartoon drawing, low detail, blurry feathers, low contrast`,
    settings: {
      aspectRatio: '4:5',
      recommendedModel: 'Flux.1 Pro / Midjourney v6.1',
      guidanceScale: '3.8',
      sampler: 'DPM++ 2M'
    }
  }
];

export const INITIAL_PRICING_PLANS = [
  {
    id: 'basic',
    name: 'BASIC',
    badge: '70% OFF',
    subtitle: 'Templates — Video Guides',
    audience: 'For short-form AI content creators',
    title: 'Super Viral Short-Form Niche Prompts',
    description: 'For creators making ready-to-use AI content for Facebook, TikTok and YouTube Shorts without building a system from scratch.',
    originalPrice: '$15',
    price: '$5',
    billing: 'For 1 Month',
    saveText: 'One-time 1-month access — no auto-renewal',
    features: [
      'Ready-to-use short-form AI prompts',
      'Facebook, TikTok & YouTube Shorts workflows',
      '15–30 second Reel/Short content systems',
      'Full prompt text and storyboard references',
      'One-click copy and members-only updates',
      'Access to 20+ Free & Premium Prompts'
    ],
    cta: 'Get Basic Plan',
    popular: false
  },
  {
    id: 'pro',
    name: 'BASIC PRO',
    badge: '60% OFF • MOST POPULAR',
    subtitle: 'Full System + Video Engine',
    audience: 'For short-form and long-form AI creators',
    title: 'Premium AI Prompts + Creator Workflows',
    description: 'Create short-form and long-form AI videos with premium prompts, storyboard-ready ideas and practical workflows for TikTok, YouTube, Reels and Shorts.',
    originalPrice: '$25',
    price: '$10',
    billing: 'For 1 Month',
    saveText: 'One-time 1-month access — no auto-renewal',
    features: [
      'All Basic features included',
      'Short form and long form premium AI prompts',
      '1-minute-plus AI video prompts for TikTok and YouTube',
      '15–30-second Reels and Shorts prompts',
      'Full prompt text and storyboard references',
      'One-click copy and members-only updates',
      'Creator workflows in the Social Corner',
      'Runway Gen-3, Kling AI & Midjourney master chains',
      'Priority WhatsApp Creator Support'
    ],
    cta: 'Choose BASIC Pro',
    popular: true
  },
  {
    id: 'lms',
    name: 'AI CONTENT MASTERY LMS',
    badge: 'NEW • LIFETIME ACCESS',
    subtitle: 'Comprehensive Course + Library',
    audience: 'For creators who want the full video course',
    title: 'Complete AI Filmmaking & Consistency Masterclass',
    description: 'The complete step-by-step course: prompt frameworks, storyboard replication, long-form voice-over videos, character consistency and AI filmmaking.',
    originalPrice: '$75',
    price: '$50',
    billing: 'One-time payment',
    saveText: 'Lifetime LMS access + 30 days Premium Prompts included',
    features: [
      'Lifetime access to the AI CONTENT MASTERY course',
      'All 7 comprehensive video modules + future lessons',
      'Premium Prompt Library access for 30 days',
      'Templates and prompt engineering resources',
      'Character consistency mastery for recurring storytelling',
      'Audio & voice cloning workflows (ElevenLabs)',
      'Direct mentor review & private Discord/WhatsApp group'
    ],
    cta: 'Get Lifetime LMS Access',
    popular: false
  },
  {
    id: 'custom',
    name: 'CUSTOM BESPOKE BUILD',
    badge: 'CUSTOM BUILD • ENTERPRISE',
    subtitle: 'Engineered for your brand',
    audience: 'For ambitious custom AI projects & agencies',
    title: 'Custom AI Project System',
    description: 'For clients who need a custom master prompt engineered around one specific content or production goal.',
    originalPrice: '',
    price: 'Custom Quote',
    billing: 'Scoped around project',
    saveText: '1-on-1 engineering & style lock guaranteed',
    features: [
      'Short-form or long-form master prompt system',
      'AI-generated or realistic-video workflow',
      'Custom niche logic, style locks and output format',
      'Project discovery and requirement mapping',
      'Delivery notes plus multiple refinement rounds',
      'Dedicated prompt engineer assignment'
    ],
    cta: 'Request a Custom Quote',
    popular: false
  }
];

export const INITIAL_SITE_CONFIG = {
  brandName: 'Skillora AI',
  tagline: 'LEARN. EARN. GROW.',
  ownerName: 'Adeel Murtaza',
  phone: '+92 316 1056008',
  email: 'skilloraai87@gmail.com',
  supportHours: 'Mon - Sun: 24/7 Creator Support',
  whatsAppNumber: '923161056008',
  whatsAppChannelUrl: 'https://whatsapp.com/channel/0029Vb3SkilloraAI',
  facebookUrl: 'https://www.facebook.com/share/1Ed2AnopHN/',
  instagramUrl: 'https://www.instagram.com/skilloraai1?vrfl=cDcyam42enlrMXN0',
  adminPin: '569646',
  heroSubtitle: 'WELCOME TO SKILLORA AI',
  heroTitle: 'QUALITY AI PROMPTS, BUILT FOR VIRAL CREATORS',
  heroDescription: 'OUR TEAM OF PROMPT ENGINEERS WILL HELP YOU TURN YOUR CREATIVE IDEAS INTO REALITY: PLANNED WITH CARE, TESTED FOR HIGH RETENTION AND FINISHED TO A VIRAL STANDARD.'
};

export const PRICING_PLANS = INITIAL_PRICING_PLANS;
export const PROMPTS = INITIAL_PROMPTS;

// Helper functions for persistent state
export function loadStoredPrompts() {
  try {
    const raw = localStorage.getItem('skillora_prompts_db');
    if (raw) {
      const parsed = JSON.parse(raw);
      // Auto-merge new prompts that are not yet in storage
      const existingIds = new Set(parsed.map(p => p.id));
      const missing = INITIAL_PROMPTS.filter(p => !existingIds.has(p.id));
      if (missing.length > 0) {
        const merged = [...parsed, ...missing];
        saveStoredPrompts(merged);
        return merged;
      }
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load prompts from storage', e);
  }
  return INITIAL_PROMPTS;
}

export function saveStoredPrompts(prompts) {
  try {
    localStorage.setItem('skillora_prompts_db', JSON.stringify(prompts));
  } catch (e) {
    console.error('Failed to save prompts to storage', e);
  }
}

export function loadStoredPricing() {
  try {
    const raw = localStorage.getItem('skillora_pricing_db');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load pricing from storage', e);
  }
  return INITIAL_PRICING_PLANS;
}

export function saveStoredPricing(pricing) {
  try {
    localStorage.setItem('skillora_pricing_db', JSON.stringify(pricing));
  } catch (e) {
    console.error('Failed to save pricing to storage', e);
  }
}

export function loadStoredSiteConfig() {
  try {
    const raw = localStorage.getItem('skillora_config_db');
    if (raw) {
      const parsed = JSON.parse(raw);
      let needsSave = false;
      // Auto-update to latest email
      if (!parsed.email || parsed.email.includes('support@skillora.ai')) {
        parsed.email = 'skilloraai87@gmail.com';
        needsSave = true;
      }
      // Auto-update socials
      if (!parsed.facebookUrl || parsed.facebookUrl.includes('hamza')) {
        parsed.facebookUrl = 'https://www.facebook.com/share/1Ed2AnopHN/';
        needsSave = true;
      }
      if (!parsed.instagramUrl || parsed.instagramUrl.includes('hamzi')) {
        parsed.instagramUrl = 'https://www.instagram.com/skilloraai1?vrfl=cDcyam42enlrMXN0';
        needsSave = true;
      }
      if (!parsed.whatsAppChannelUrl) {
        parsed.whatsAppChannelUrl = 'https://whatsapp.com/channel/0029Vb3SkilloraAI';
        needsSave = true;
      }
      if (!parsed.ownerName) {
        parsed.ownerName = 'Adeel Murtaza';
        needsSave = true;
      }
      // Auto-update to latest number
      if (!parsed.phone || parsed.phone.includes('312') || !parsed.whatsAppNumber || parsed.whatsAppNumber.includes('312')) {
        parsed.phone = '+92 316 1056008';
        parsed.whatsAppNumber = '923161056008';
        needsSave = true;
      }
      // Migrate old default pin to user's specified PIN (569646)
      if (!parsed.adminPin || parsed.adminPin === 'skillora2026') {
        parsed.adminPin = '569646';
        needsSave = true;
      }
      if (needsSave) {
        saveStoredSiteConfig(parsed);
      }
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load config from storage', e);
  }
  return INITIAL_SITE_CONFIG;
}

export function saveStoredSiteConfig(config) {
  try {
    localStorage.setItem('skillora_config_db', JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save config to storage', e);
  }
}
export const COMMUNITY_POSTS = [
  {
    id: 1,
    creator: 'Hamza Visuals',
    handle: '@hamzavfx',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    title: 'Used Eagle Reunion Engine for 1.2M view Reel',
    promptUsed: 'Eagle Reunion Engine (Prompt #1005060)',
    videoThumbnail: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80',
    views: '1.2M Views',
    likes: '84.2K',
    tools: ['Kling 1.5', 'CapCut'],
    comment: 'The lighting prompt parameters and camera motion guide generated the exact cinematic feel. Audience retention was 94%!'
  },
  {
    id: 2,
    creator: 'Sarah AI Studio',
    handle: '@sarahcreates',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    title: 'Luxury Perfume Commercial for client demo',
    promptUsed: 'Luxury Liquid Glass Perfume Commercial',
    videoThumbnail: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    views: '450K Views',
    likes: '31.5K',
    tools: ['Runway Gen-3', 'Premiere Pro'],
    comment: 'Landed a perfume client using this exact storyboard setup. The slow-mo water caustics look 100% photorealistic.'
  },
  {
    id: 3,
    creator: 'Bilal Tech',
    handle: '@bilal_content',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    title: 'Medical Explainer Short gained 15k subscribers',
    promptUsed: '3D Human Body Microscopic Cell Discovery',
    videoThumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
    views: '890K Views',
    likes: '62.1K',
    tools: ['Midjourney', 'Luma Dream Machine'],
    comment: 'The educational niche is huge right now. Skillora prompts make complex science visual animations effortless.'
  }
];
