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
    const key = (req.headers['x-gemini-key'] || process.env.VITE_GEMINI_API_KEY || '').trim();

    if (!key || !key.startsWith('AIzaSy')) {
      return res.status(400).json({ error: 'Valid Google Gemini API key required (starts with AIzaSy...)' });
    }

    if (!image) {
      return res.status(400).json({ error: 'No video frame provided for extraction' });
    }

    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, '');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${key.trim()}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an expert AI prompt engineer and extractor for video generators like Runway Gen-3 Alpha, Kling 1.5, Luma Dream Machine, Sora, and Midjourney v6.1.
Look at this video keyframe image carefully. Describe what is in this scene precisely and reverse-engineer the exact master AI video prompt to recreate it.
Be extremely detailed about the subject, clothing, environment, lighting, and camera movement.

Return ONLY a valid JSON object matching this schema (no markdown, no other text):
{
  "subject": "Detailed description of the subject, clothing, action and setting in this image",
  "camera": "Camera shot, movement (e.g. low-angle tracking shot, 35mm lens dolly in, orbital pan) and lens angle",
  "lighting": "Atmospheric lighting, contrast, god rays, neon reflections and color grade",
  "masterPrompt": "The complete, rich master prompt ready to generate this exact scene in Kling AI or Runway Gen-3, with 4K 60fps --ar 9:16 --v 6.1 --style raw",
  "negative": "blurry, low quality, deformed, extra limbs, bad face, artifacts, cartoon look"
}`
                },
                {
                  inline_data: {
                    mime_type: 'image/jpeg',
                    data: cleanBase64
                  }
                }
              ]
            }
          ]
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
