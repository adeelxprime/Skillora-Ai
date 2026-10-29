export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Gemini-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const image = body?.image;
    const userApiKey = (req.headers['x-gemini-key'] || body?.apiKey || process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '').trim();

    if (!userApiKey) {
      return res.status(400).json({ 
        needKey: true,
        error: 'Google Gemini API key required. Please provide a valid Gemini key starting with AIzaSy...' 
      });
    }

    const cleanBase64 = (image || '').replace(/^data:image\/\w+;base64,/, '');

    const promptText = `You are an elite AI prompt reverse-engineer for video generators like Runway Gen-3 Alpha, Kling 1.5, Luma Dream Machine, Sora, and Midjourney v6.1.
Look at this video scene keyframe carefully. Describe what is in this scene with extreme precision and reverse-engineer the exact master AI video prompt to recreate it identically.
Be specific about:
1. Subject & Action: exact person/animal/object, clothing, posture, movement
2. Environment & Background: location, weather, depth of field
3. Lighting & Atmosphere: natural/neon/volumetric lighting, shadows, color tone
4. Camera & Lens: shot type, lens angle, camera motion (tracking, dolly, pan)

Return ONLY a valid JSON object matching this schema (no markdown, no backticks, no other text):
{
  "subject": "Detailed description of subject, attire, action and setting in this scene",
  "camera": "Shot type (e.g. low-angle tracking shot, 35mm lens dolly in) and camera motion",
  "lighting": "Volumetric lighting, atmosphere, shadows, color grade",
  "masterPrompt": "The complete, rich master prompt ready for Kling 1.5 or Runway Gen-3 with 4K 60fps --ar ${body?.aspect || '16:9'} --v 6.1 --style raw",
  "negative": "blurry, low quality, deformed, extra limbs, bad face, artifacts, cartoon look"
}`;

    const parts = [{ text: promptText }];
    if (cleanBase64) {
      parts.push({
        inline_data: {
          mime_type: 'image/jpeg',
          data: cleanBase64
        }
      });
    }

    // Call Google Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(userApiKey)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1000
          }
        })
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Gemini Vision API error' });
    }

    let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    rawText = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) rawText = jsonMatch[0];
    const parsed = JSON.parse(rawText);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error('API Extract Error:', err);
    return res.status(500).json({ error: err.message || 'Server extraction failed' });
  }
}
