import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
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
                const key = (req.headers['x-gemini-key'] || process.env.VITE_GEMINI_API_KEY || '').trim();
                const imageData = (body.image || '').replace(/^data:image\/\w+;base64,/, '');

                if (!key || !key.startsWith('AIzaSy')) {
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'Valid Google AI Studio Gemini API key (AIzaSy...) required' }));
                  return;
                }

                if (!imageData) {
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'No image frame provided for extraction' }));
                  return;
                }

                const response = await fetch(
                  `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${key}`,
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
                                data: imageData
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
});
