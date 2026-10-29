import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const DEFAULT_GEMINI_KEY = env.VITE_GEMINI_API_KEY || '';

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'prompt-extractor-backend-api',
        configureServer(server) {
          server.middlewares.use('/api/extract', async (req, res) => {
            if (req.method === 'POST') {
              const chunks = [];
              req.on('data', (chunk) => chunks.push(chunk));
              req.on('end', async () => {
                try {
                  const body = JSON.parse(Buffer.concat(chunks).toString());
                  const provider = body.provider || 'gemini';

                  // 1. DeepSeek API Provider
                  if (provider === 'deepseek') {
                    const deepseekKey = (req.headers['x-deepseek-key'] || env.VITE_DEEPSEEK_API_KEY || process.env.VITE_DEEPSEEK_API_KEY || '').trim();
                    if (!deepseekKey) {
                      res.writeHead(400, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify({ error: 'DeepSeek API key (sk-...) is required' }));
                      return;
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
                            content: 'You are an elite AI prompt engineer. Reverse-engineer video and image scenes into ultra-realistic master AI prompts. Return ONLY a valid JSON object matching the schema with keys: subject, camera, lighting, masterPrompt, negative.'
                          },
                          {
                            role: 'user',
                            content: `Reverse-engineer a master prompt for this scene: ${body.topic || 'high-end cinematic visual'}. Aspect ratio: ${body.aspect || '16:9'}.
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
                      res.writeHead(dsResponse.status, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify({ error: dsData.error?.message || 'DeepSeek API error' }));
                      return;
                    }

                    let rawText = dsData.choices?.[0]?.message?.content || '';
                    rawText = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
                    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
                    if (jsonMatch) rawText = jsonMatch[0];
                    const parsed = JSON.parse(rawText);

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(parsed));
                    return;
                  }

                  // 2. Google Gemini Vision Provider (Default & Server-Managed)
                  const key = (req.headers['x-gemini-key'] || DEFAULT_GEMINI_KEY).trim();
                  const imageData = (body.image || '').replace(/^data:image\/\w+;base64,/, '');

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

                  if (imageData) {
                    parts.push({
                      inline_data: {
                        mime_type: 'image/jpeg',
                        data: imageData
                      }
                    });
                  }

                  if (!key) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Gemini API key is required' }));
                    return;
                  }

                  const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(key)}`,
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        contents: [
                          {
                            parts
                          }
                        ]
                      })
                    }
                  );

                  const data = await response.json();
                  if (!response.ok) {
                    res.writeHead(response.status, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: data.error?.message || 'Gemini Vision API error' }));
                    return;
                  }

                  let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
                  rawText = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
                  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
                  if (jsonMatch) rawText = jsonMatch[0];
                  const parsed = JSON.parse(rawText);

                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify(parsed));
                } catch (err) {
                  console.error('API Extract Error:', err);
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: err.message || 'Server extraction failed' }));
                }
              });
            } else {
              res.writeHead(405);
              res.end();
            }
          });
        }
      }
    ],
    server: {
      port: 3000,
      open: true
    }
  };
});
