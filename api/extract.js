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
    const provider = body?.provider || (req.headers['x-deepseek-key'] ? 'deepseek' : 'gemini');

    // 1. DeepSeek API Provider
    if (provider === 'deepseek') {
      const deepseekKey = (req.headers['x-deepseek-key'] || process.env.VITE_DEEPSEEK_API_KEY || '').trim();
      if (!deepseekKey) {
        return res.status(400).json({ error: 'DeepSeek API key (sk-...) is required' });
      }

      const dsResponse = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${deepseekKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are an elite AI prompt engineer. Reverse-engineer video scenes into ultra-realistic master prompts. Return ONLY valid JSON.'
            },
            {
              role: 'user',
              content: `Reverse-engineer a master prompt for this scene: ${body.topic || 'cinematic video sequence'}, aspect: ${body.aspect || '16:9'}.
Return JSON:
{
  "subject": "Detailed description of subject, action and clothing",
  "camera": "Camera shot, movement, angle and lens",
  "lighting": "Volumetric lighting, contrast and atmospheric glow",
  "masterPrompt": "The complete rich master prompt ready for Kling 1.5 or Runway Gen-3 with 4K 60fps --ar ${body.aspect || '16:9'} --v 6.1 --style raw",
  "negative": "blurry, low quality, deformed, extra limbs, artifacts, cartoon look"
}`
            }
          ]
        })
      });

      const dsData = await dsResponse.json();
      if (!dsResponse.ok) {
        return res.status(dsResponse.status).json({ error: dsData.error?.message || 'DeepSeek API error' });
      }

      let rawText = dsData.choices?.[0]?.message?.content || '';
      rawText = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) rawText = jsonMatch[0];
      const parsed = JSON.parse(rawText);
      return res.status(200).json(parsed);
    }

    // 2. Google Gemini Vision Provider
    const image = body?.image;
    const key = (req.headers['x-gemini-key'] || process.env.VITE_GEMINI_API_KEY || 'AQ.Ab8RN6J0aR8hBkLQkUnrLe0TrNnHUjKo_5Xc9zzBZnitk8qlGg').trim();

    const cleanBase64 = (image || '').replace(/^data:image\/\w+;base64,/, '');

    const parts = [
      {
        text: `You are an elite AI prompt engineer and extractor for video generators like Runway Gen-3 Alpha, Kling 1.5, Luma Dream Machine, Sora, and Midjourney v6.1.
Look at this video scene carefully. Describe what is in this scene precisely and reverse-engineer the exact master AI video prompt to recreate it.
Be extremely detailed about the subject, clothing, environment, lighting, and camera movement.

Return ONLY a valid JSON object matching this schema (no markdown, no other text):
{
  "subject": "Detailed description of the subject, clothing, action and setting in this image",
  "camera": "Camera shot, movement (e.g. low-angle tracking shot, 35mm lens dolly in, orbital pan) and lens angle",
  "lighting": "Atmospheric lighting, contrast, god rays, neon reflections and color grade",
  "masterPrompt": "The complete, rich master prompt ready to generate this exact scene in Kling AI or Runway Gen-3, with 4K 60fps --ar ${body.aspect || '16:9'} --v 6.1 --style raw",
  "negative": "blurry, low quality, deformed, extra limbs, bad face, artifacts, cartoon look"
}`
      }
    ];

    if (cleanBase64) {
      parts.push({
        inline_data: {
          mime_type: 'image/jpeg',
          data: cleanBase64
        }
      });
    }
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
