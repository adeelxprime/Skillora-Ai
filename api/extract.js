export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-OpenRouter-Key, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const apiKey = (
      req.headers['x-openrouter-key'] ||
      req.headers['authorization']?.replace('Bearer ', '') ||
      body?.apiKey ||
      process.env.OPENROUTER_API_KEY ||
      process.env.VITE_OPENROUTER_API_KEY ||
      ''
    ).trim();

    if (!apiKey) {
      return res.status(400).json({ 
        needKey: true,
        error: 'OpenRouter API key required. Please connect your OpenRouter key.' 
      });
    }

    const topic = body?.topic || 'cinematic video sequence';
    const aspect = body?.aspect || '16:9';
    const videoName = body?.videoName || 'scene';
    const lightingHint = body?.lightingHint || 'Cinematic volumetric studio lighting';

    const systemPrompt = `You are an elite Hollywood & AI prompt engineer specializing in cinematic master prompts for Sora, Runway Gen-3 Alpha, Kling 1.5, Luma Dream Machine, and Midjourney v6.1.
Reverse-engineer the given video scene into an ultra-realistic, director-level master prompt.
Return ONLY a valid JSON object (no markdown, no backticks, no other text) with this exact schema:
{
  "subject": "Detailed description of the subject, character, attire, pose, action, and setting",
  "camera": "Shot type (e.g. low-angle tracking dolly, 35mm anamorphic push-in) and camera movement physics",
  "lighting": "Volumetric lighting, atmosphere, shadows, neon/golden reflections, and color grading",
  "masterPrompt": "The complete, rich master prompt ready for Kling 1.5 or Runway Gen-3 with 4K 60fps --ar ${aspect} --v 6.1 --style raw",
  "negative": "blurry, low quality, deformed, extra limbs, bad face, artifacts, cartoon look, low resolution, noise"
}`;

    const userPrompt = `Reverse-engineer a master prompt for this scene:
- Topic / Focus: ${topic}
- Video Name: ${videoName}
- Aspect Ratio: ${aspect}
- Lighting Profile: ${lightingHint}

Make the master prompt rich, hyper-realistic, photorealistic, cinematic with exact lens and motion physics.`;

    const candidateModels = [
      'nvidia/nemotron-3.5-super-vl:free',
      'liquid/lfm-2.5-2.6b:free',
      'google/gemma-4-26b-a4b-it:free'
    ];

    let lastError = null;
    let parsedResult = null;

    for (const model of candidateModels) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://skillora.ai',
            'X-Title': 'Skillora AI Video Prompt Extractor'
          },
          body: JSON.stringify({
            model,
            temperature: 0.6,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ]
          })
        });

        const data = await response.json();
        if (response.ok && data.choices?.[0]?.message?.content) {
          let rawText = data.choices[0].message.content;
          rawText = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (jsonMatch) rawText = jsonMatch[0];
          parsedResult = JSON.parse(rawText);
          parsedResult.modelUsed = model;
          break;
        } else {
          lastError = data.error?.message || `Model ${model} returned error`;
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    if (parsedResult) {
      return res.status(200).json(parsedResult);
    }

    return res.status(500).json({ error: lastError || 'OpenRouter extraction failed' });
  } catch (err) {
    console.error('API Extract Error:', err);
    return res.status(500).json({ error: err.message || 'Server extraction failed' });
  }
}
